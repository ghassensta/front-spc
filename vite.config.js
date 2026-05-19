import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";

// ----------------------------------------------------------------------

const PORT = 5173;

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const API_URL =
    env.VITE_API_URL ||
    env.SERVER_URL ||
    "https://admin.spa-prestige-collection.com";

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
        const safe = async (url) => {
          try {
            const r = await fetch(url);
            if (!r.ok) return { data: [] };
            const j = await r.json();
            return { data: j?.data || j?.etablissements || j?.products || j };
          } catch (e) {
            console.warn(`[prerender] échec fetch ${url}: ${e.message}`);
            return { data: [] };
          }
        };

        const [spas, produits, seoPages, categories, actualites] =
          await Promise.all([
            safe(`${API_URL}/api/etablissements`),
            safe(`${API_URL}/api/produit`),
            safe(`${API_URL}/api/pages`),
            safe(`${API_URL}/api/categories`),
            safe(`${API_URL}/api/actualites`),
          ]);

        const dyn = (arr, fn) =>
          Array.isArray(arr) ? arr.map(fn).filter(Boolean) : [];

        return [
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
          ...dyn(spas.data, (s) => s && `/spa/${s.slug || s.id}`),
          ...dyn(produits.data, (p) => p?.slug && `/produit/${p.slug}`),
          ...dyn(categories.data, (c) => c?.slug && `/categories/${c.slug}`),
          ...dyn(actualites.data, (a) => a?.slug && `/actualites/${a.slug}`),
          ...dyn(seoPages.data, (s) => s?.slug && `/${s.slug}`),
        ];
      };

      prerenderPlugin = prerender({
        routes: await fetchRoutes(),
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterDocumentEvent: "render-event",
          maxConcurrentRoutes: 4,
          headless: "new",
          timeout: 20000,
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
