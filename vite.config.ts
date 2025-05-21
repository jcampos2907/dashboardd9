import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import Unfonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), Unfonts({
    typekit: {
      id: 'hmd5kzm'
    },
    custom: {
      families: [
        {
          name: 'HelveticaNeue',
          src: './src/assets/fonts/HelveticaNeueMedium.otf',
        }
      ]
    }
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
