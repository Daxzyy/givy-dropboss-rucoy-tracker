import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

const dropsRaw = fs.readFileSync('./drops.json', 'utf-8')
const dropsBase64 = Buffer.from(dropsRaw).toString('base64')

export default defineConfig({
  plugins: [react()],
  define: {
    '__SECRET_DATA__': JSON.stringify(dropsBase64)
  }
})
