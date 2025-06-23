import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"; // Import path module
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CodeCommerce/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Define alias for shadcn
    },
  },
})
