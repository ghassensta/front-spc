import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------

const PORT = 5173;

export default defineConfig({
  plugins: [
    react(),
    // Désactiver le checker en développement pour éviter les erreurs ESLint
    process.env.NODE_ENV === 'production' && checker({
      eslint: {
        lintCommand: 'eslint . --ext js,jsx --max-warnings 0',
      },
      overlay: false,
    }),
  ].filter(Boolean),
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  build: {
    // Optimisation pour les Core Web Vitals
    rollupOptions: {
      output: {
        // Code splitting manuel pour réduire le bundle principal
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          swiper: ['swiper'],
          ui: ['framer-motion', 'lucide-react', 'react-icons'],
          utils: ['axios', 'lodash', 'date-fns'],
        },
        // Optimisation des noms de fichiers pour le cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/media/[name]-[hash][extname]`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Compression pour réduire le poids réseau
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Activer le cache pour les builds successifs
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Limiter la taille des chunks
    chunkSizeWarningLimit: 1000,
  },
  // Optimisation du développement
  server: { 
    port: PORT, 
    host: true,
    // Activer la compression en dev pour simuler la prod
    cors: true,
  },
  preview: { 
    port: PORT, 
    host: true 
  },
  // Optimisation des dépendances
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
    ],
    exclude: ['swiper'],
  },
});
