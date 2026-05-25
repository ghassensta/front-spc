import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";

// ----------------------------------------------------------------------

const PORT = 5173;

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // ───────────────────────────────────────────────────────────────
  //  Prérendu : activé uniquement quand on a explicitement demandé
  //  un build prérendu (PRERENDER=1 npm run build) afin que les
  //  builds classiques ne dépendent pas de Puppeteer.
  // ───────────────────────────────────────────────────────────────
  let prerenderPlugin = null;
  if (mode === "production" && env.PRERENDER === "1") {
    try {
      const { default: prerender } = await import(
        "@prerenderer/rollup-plugin"
      );

      const fetchRoutes = async () => {
        const FRONT_URL = (
          env.VITE_FRONT_URL || "https://spa-prestige-collection.com"
        ).replace(/\/$/, "");

        // Récupère toutes les URLs depuis les sitemaps Laravel
        // (source de vérité — contient TOUS les spas, produits, etc.)
        const fetchSitemap = async (url) => {
          try {
            const r = await fetch(url);
            if (!r.ok) {
              console.warn(`[prerender] HTTP ${r.status} ${url}`);
              return [];
            }
            const xml = await r.text();
            const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
              (m) => m[1]
            );
            return locs;
          } catch (e) {
            console.warn(`[prerender] échec fetch ${url} : ${e.message}`);
            return [];
          }
        };

        const sitemaps = [
          "sitemap-static.xml",
          "sitemap-etablissements.xml",
          "sitemap-produits.xml",
          "sitemap-categories.xml",
          "sitemap-blogs.xml",
          "sitemap-blog-categories.xml",
          "sitemap-landing-pages.xml",
        ];

        const allUrls = (
          await Promise.all(
            sitemaps.map((s) => fetchSitemap(`${FRONT_URL}/${s}`))
          )
        ).flat();

        // Convertit les URLs absolues en chemins relatifs et déduplique
        const seen = new Set();
        const paths = [];
        for (const u of allUrls) {
          let p;
          try {
            p = new URL(u).pathname;
          } catch {
            p = u;
          }
          if (!seen.has(p)) {
            seen.add(p);
            paths.push(p);
          }
        }

        // Pages internes garanties (au cas où elles ne sont pas dans le sitemap)
        const guaranteed = [
          "/",
          "/liste-des-spas",
          "/carte-cadeau",
          "/qui-sommes-nous",
          "/actualites",
          "/categories",
          "/glossaire",
          "/assistance-contact",
          "/recompense",
          "/programme-de-parrainage",
          "/collection-prestige",
          "/solutions-ce",
          "/devenir-partenaire",
          "/marque-partenaire",
          "/mentions-legales",
          "/conditions",
          "/zones-dactivites",
          "/referentiel-de-candidature",
        ];
        for (const g of guaranteed) {
          if (!seen.has(g)) {
            seen.add(g);
            paths.push(g);
          }
        }

        console.log(`[prerender] ${paths.length} routes à prérender`);
        return paths;
      };

      prerenderPlugin = prerender({
        routes: await fetchRoutes(),
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterDocumentEvent: "render-event",
          maxConcurrentRoutes: 2,
          headless: true,
          timeout: 120000,
        },
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html
            .replace(/<script[^>]*googletagmanager[^>]*><\/script>/gi, "")
            .replace(/<script[^>]*gtranslate[^>]*><\/script>/gi, "");
          return renderedRoute;
        },
      });

      console.log("[prerender] Plugin activé");
    } catch (err) {
      console.warn(
        `[prerender] Plugin désactivé : ${err.message}\n` +
          "→ Installez : npm i -D @prerenderer/rollup-plugin @prerenderer/renderer-puppeteer puppeteer"
      );
    }
  }

  return {
    plugins: [
      react(),
      process.env.NODE_ENV === "production" &&
        checker({
          eslint: {
            lintCommand: "eslint . --ext js,jsx --max-warnings 0",
          },
          overlay: false,
        }),
      prerenderPlugin,
    ].filter(Boolean),

    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), "node_modules/$1"),
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), "src/$1"),
        },
      ],
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-router": ["react-router-dom"],
            "vendor-swiper": ["swiper"],
            "vendor-ui": ["lucide-react", "react-icons", "@tabler/icons-react"],
            "vendor-motion": ["framer-motion"],
            "vendor-i18n": [
              "react-i18next",
              "i18next",
              "i18next-browser-languagedetector",
            ],
            "vendor-query": ["@tanstack/react-query", "swr"],
            "vendor-utils": ["axios", "lodash", "date-fns"],
            "vendor-stripe": ["@stripe/stripe-js"],
            "vendor-seo": ["react-helmet-async"],
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || "";
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(name)) {
              return "assets/media/[name]-[hash][extname]";
            }
            if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(name)) {
              return "assets/img/[name]-[hash][extname]";
            }
            if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(name)) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      commonjsOptions: { include: [/node_modules/] },
      chunkSizeWarningLimit: 1000,
    },

    server: { port: PORT, host: true, cors: true },
    preview: { port: PORT, host: true },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "react-helmet-async",
        "axios",
      ],
      exclude: ["swiper"],
    },
  };
});
