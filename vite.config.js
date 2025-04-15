import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server:{
      proxy:{
        'api':{
          target:"http://127.0.0.1:8080",
          changeOrigin:true,
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          }
        }
      }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
