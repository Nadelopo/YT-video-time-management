import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import solidPlugin from 'vite-plugin-solid'
import { fileURLToPath, URL } from 'node:url'
import { name, version, description } from './package.json'
import { copyFileSync, existsSync, mkdirSync, } from 'fs'
import { resolve } from 'path'

const sourcePath = resolve(__dirname, 'dist/yt-video-time-management.user.js')
if (existsSync(sourcePath)) {
  const destDir = resolve(__dirname, '')
  if (!existsSync(destDir)) {
    mkdirSync(destDir)
  }
  const destPath = resolve(destDir, 'yt-video-time-management.user.js')
  copyFileSync(sourcePath, destPath)
} else {
  console.error('Source file tsconfig.json does not exist.')
}

export default defineConfig({
  plugins: [
    solidPlugin(),
    Userscript({
      entry: 'src/main.tsx',
      header: {
        name,
        version,
        description,
        match: 'https://www.youtube.com/watch?*',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=youtube.com'
      },
      server: {
        port: 3000
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: [
          '@import "./src/assets/styles/variables.sass"'
        ]
      }
    }
  },


})
