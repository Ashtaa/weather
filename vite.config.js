import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace '/weather/' with your GitHub repo name
export default defineConfig({
  base: '/weather/', 
  plugins: [react()],
});
