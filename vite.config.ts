import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoExport from './src/plugin/autoExport'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),autoExport()]
})
