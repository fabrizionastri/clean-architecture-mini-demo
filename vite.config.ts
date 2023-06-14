import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), vue()],
  define: {
    'import.meta.vitest': 'undefined',
  },
  root: './src/adapters/front/vue', // Add this line
  test: {
    includeSource: ['src/**/*.{js,ts}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    globals: true,
  },
  resolve: {
    alias: {
      '@': '/src', // Also change this line to '/src'
    },
  },
})
