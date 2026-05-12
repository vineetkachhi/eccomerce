
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',   // 👈 ye add karo
                'resources/js/app.jsx',    // React entry
            ],
            refresh: true,
        }),
        react(),
    ],
});
