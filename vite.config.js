import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite'

export default defineConfig({
    base: '',
    root: '',
    publicDir: './public',
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: false
    },
    preview: {
        host: '0.0.0.0',
        port: 4173
    },
    build:
    {
        outDir: './dist',
        emptyOutDir: true,
        sourcemap: true,
        chunkSizeWarningLimit: 900
    },
    plugins: [glsl()]
})
