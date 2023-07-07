import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import solidPlugin from 'vite-plugin-solid'
import { name, version, description } from './package.json'

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
  ]
})
