import { render } from 'solid-js/web'
import { App } from './components/App'
import { waitElement } from './utils/waitForElm'

waitElement('#owner').then((parentContainer) => {
  render(() => <App />, parentContainer)
})
