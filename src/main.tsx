import { render } from 'solid-js/web'
import { App } from './components/App'
import { waitElement } from '@zero-dependency/dom'
import S from './styles.sass?inline'

GM_addStyle(S)

waitElement({ selector: '#owner' }).then((parentContainer) => {
  render(() => <App />, parentContainer)
})
