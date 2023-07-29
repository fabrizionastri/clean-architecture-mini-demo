import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), vue()],
  define: {
    'import.meta.vitest': 'undefined',
  },
  root: './src/adapters/frontend/vue', // Add this line
  resolve: {
    alias: {
      '@': '/src', // Also change this line to '/src'
    },
  },
})
