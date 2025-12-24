import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

const host = '192.168.43.245'

export default defineConfig({
  base: "/CepheidCalculation", 
  server: {
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    proxy: {
      '/api/v1': {
        target: `http://${host}:8080`,
        changeOrigin: true,
        secure: false
      },
      '/static': {
        target: `http://${host}:9000`,
        changeOrigin: true,
        secure: false
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Cepheid App",
        short_name: "Cepheid",
        start_url: "/CepheidCalculation",
        display: "standalone",
        background_color: "#fdfdfd",
        theme_color: "#db4938",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/logo192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/logo512.png",
            type: "image/png", 
            sizes: "512x512"
          }
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  optimizeDeps: {
    include: ['react-native-web'],
    exclude: ['react-native'],
  },
  define: {
    __DEV__: JSON.stringify(true),
    global: {},
  },
})