import { render } from 'solid-js/web'
import { App } from './components/App'
import { waitElement } from '@zero-dependency/dom'
import S from './assets/styles/styles.sass?inline'

GM_addStyle(S)
;(
  window as unknown as Window & { trustedTypes: any }
).trustedTypes.createPolicy('default', {
  createHTML: (string: string) => string
})
waitElement({ selector: '#owner' }).then((parentContainer) => {
  render(() => <App />, parentContainer)
})
