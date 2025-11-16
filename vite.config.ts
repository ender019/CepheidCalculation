import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

const host = '192.168.1.216'

export default defineConfig({
  base: "/", 
  server: {
    // https:{
    //   key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    // },
    host: '0.0.0.0',
    port: 3000,
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
        start_url: "/Gilyazetdinov-RIP2025F",
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
})