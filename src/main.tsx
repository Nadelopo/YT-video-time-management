import { render } from 'solid-js/web'
import { App } from './components/App'
import { waitElement } from './utils/waitForElm'
import S from './styles.sass?inline'

GM_addStyle(S)

waitElement('#owner').then((parentContainer) => {
  render(() => <App />, parentContainer)
})
