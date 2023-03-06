import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { name, version, description } from './package.json'

export default defineConfig((config) => {
  return {
    plugins: [
      Userscript({
        entry: 'src/index.ts',
        header: {
          name,
          version,
          description,
          match: 'https://www.youtube.com/watch?v=rTbJ2qFd-Tc*',
          icon: 'https://www.google.com/s2/favicons?sz=64&domain=youtube.com'
        },
        server: {
          open: true,
          port: 3000
        }
      })
    ]
  }
})
