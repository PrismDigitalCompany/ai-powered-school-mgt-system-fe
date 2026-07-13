import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  test:{
    global: true,
    environment: "jsdom",
    setupFile: "./src/setupTest.js"
  }
})
