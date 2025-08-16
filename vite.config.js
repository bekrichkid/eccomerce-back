import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // ✅ React plugin qo'shing
    tailwindcss(),
  ],
  // ✅ historyApiFallback server ichida emas, alohida
  // Vite da bu avtomatik ishlaydi, lekin qo'shimcha sozlash:
  base: "/",
})

// ✅ Agar yuqoridagi ishlamasa, bu versiyani sinab ko'ring:
/*
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
  },
  base: "/",
})
*/