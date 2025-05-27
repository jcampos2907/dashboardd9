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
        name: 'Helvetica Neue',
        src: './src/assets/fonts/helveticaNeue/*.otf',
        transform(font) {
          if (font.basename.includes('BoldItalic')) {
            font.weight = 700;
            font.style = 'italic';
          } else if (font.basename.includes('Bold')) {
            font.weight = 700;
          } else if (font.basename.includes('Black')) {
            font.weight = 900;
          } else if (font.basename.includes('Medium')) {
            font.weight = 500;
          } else if (font.basename.includes('Light')) {
            font.weight = 300;
          } else if (font.basename.includes('Thin')) {
            font.weight = 200;
          } else if (font.basename.includes('UltraLight')) {
            font.weight = 100;
          } else if (font.basename.includes('Italic')) {
            font.style = 'italic';
          } else if (font.basename.includes('Roman')) {
            font.weight = 400; // Default regular
          } else {
            return null; // Skip anything unexpected
          }
          return font;
        }
      }
    ],
    // display: 'swap',
    preload: true,
    injectTo: 'head-prepend',
  },
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
