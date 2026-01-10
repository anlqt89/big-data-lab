import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; 

export default defineConfig(() => {

  return {
    plugins: [react()], 
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: `http://backend:5001`,
          changeOrigin: true,
        },
      },
    },
  };
});