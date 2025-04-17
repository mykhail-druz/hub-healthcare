// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    base: '/wp-content/uploads/dist/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
            },
        },
    },
    server: {
        open: true,
        port: 3000,
    },
})
