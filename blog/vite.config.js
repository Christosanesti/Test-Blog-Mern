import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false,  // Allows making requests to the backend server from the frontend.
                
            },
        },
    }, 
    plugins: [react()]
})
