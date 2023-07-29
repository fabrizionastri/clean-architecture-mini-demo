// import { defineWorkspace } from 'vite/config'

// // defineWorkspace provides a nice type hinting DX
// export default defineWorkspace([
//   {
//     // add "extends" to merge two configs together
//     extends: '../../../../vite.config.js',
//   },
// ])

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), vue()],
  define: {
    'import.meta.vitest': 'undefined',
  },
  root: '.', // Add this line
  resolve: {
    alias: {
      '@': '/src', // Also change this line to '/src'
    },
  },
})
