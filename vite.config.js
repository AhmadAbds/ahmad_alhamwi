import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
         react(),  
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.tsx'],
            refresh : true,
            
        }),  
    ],css : {
        postcss : './postcss.config.js'
    }, 
    resolve: {
        alias :{
       '@/components': path.resolve(__dirname, 'resources/js/components'),
      '@/lib': path.resolve(__dirname, 'resources/js/lib'), 
        },
    } ,
    optimizeDeps : {
        include :['tailwindcss' , 'autoprefixer']
    }  ,
    server : {
        proxy : { '/storage' :{
            target : 'http://localhost:8000',
            changeOrigin :true },
        },
    },
});
