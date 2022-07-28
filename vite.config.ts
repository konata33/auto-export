import {defineConfig} from 'vite';
import autoExport from './src/index'

export default defineConfig({
  plugins:[autoExport({fileName:"index",filePath:'src'})]
})
