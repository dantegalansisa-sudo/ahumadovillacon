import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
  },
  ssr: {
    // Bundle the dependencies into the prerender entry instead of leaving them
    // external: react-helmet-async is CommonJS and Node's ESM loader cannot
    // take named imports from it.
    noExternal: true,
  },
});
