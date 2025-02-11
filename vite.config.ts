import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { assetpackPlugin } from './scripts/assetpack-vite-plugin';

// https://vite.dev/config/
export default defineConfig({
    plugins: [assetpackPlugin(), react()],
    server: {
        port: 8080,
        open: true,
        proxy: {
            '/socket.io': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                ws: true,
            },
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                rewrite: p => p.replace(/^\/api/, ''),
            },
        },
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
