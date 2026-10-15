import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // Unity usa AAC: abrir el navegador del sistema, no el visor de VS Code.
  server: { open: true },
  preview: { open: true },
});
