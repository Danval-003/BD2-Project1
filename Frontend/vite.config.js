import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@public',
        replacement: resolve(__dirname, './public'),
      },
      {
        find: '@assets',
        replacement: resolve(__dirname, './src/assets'),
      },
      {
        find: '@text',
        replacement: resolve(__dirname, './src/texts'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, './src/pages'),
      },
    ],
  },
})
