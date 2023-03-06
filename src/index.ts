import { el, mount, setChildren } from 'redom'
import { waitForElm } from './waitForElm'
import S from './styles.css?inline'
GM_addStyle(S)

enum State {
  Ended,
  Playing,
  Paused,
  Buffering,
  VideoCued
}

const menu = el('div', '', { class: 'repeat__control__menu' })
const inputStart = el('input', 'Hello RE:DOM!', {
  class: 'repeat__control__menu__start ',
  type: 'string',
  value: '00 00',
  maxlength: 5
})
const inputEnd = el('input', 'Hello RE:DOM!', {
  class: 'repeat__control__menu__end ',
  type: 'string',
  value: '00 00',
  maxlength: 5
})

const confirmBtn = el('button', 'apply')
const cancelBtn = el('button', 'cancel')

const slash = el('div', '/')

;(async () => {
  let timeStart = 0 //200
  let timeEnd = 0 //396
  let currentTime = 0
  let interval = 0
  let initial = false

  let player: any = await waitForElm('#ytd-player')
  const menuElement = await waitForElm('.item.style-scope.ytd-watch-metadata')

  mount(menuElement, menu)
  setChildren(menu, [inputStart, slash, inputEnd, confirmBtn, cancelBtn])

  function onStateChange(state: number) {
    if (state == State.Playing) {
      interval = setInterval(() => {
        if (currentTime >= timeEnd) {
          clearInterval(interval)
          player.player_.seekTo(timeStart)
        }
        currentTime = player.player_.getCurrentTime()
      }, 1000)
    }
    if (
      state == State.Paused ||
      state == State.Buffering ||
      state == State.Ended
    ) {
      clearInterval(interval)
    }
  }

  confirmBtn.onclick = () => {
    const startSeconds = inputStart.value.split(' ')
    timeStart = Number(startSeconds[0]) * 60 + Number(startSeconds[1])
    const endSeconds = inputEnd.value.split(' ')
    timeEnd = Number(endSeconds[0]) * 60 + Number(endSeconds[1])

    if (!initial) {
      onStateChange(State.Playing)
      setTimeout(() => {
        player.player_.addEventListener('onStateChange', onStateChange)
      }, 1000)
      initial = true
    }
  }

  cancelBtn.onclick = () => {
    clearInterval(interval)
    player.player_.removeEventListener('onStateChange', onStateChange)
    initial = false
  }

  let previousStartValue = inputStart.value
  const setPreviousStartValue = (value: string) => (previousStartValue = value)
  let previousEndValue = inputEnd.value
  const setPreviousEndValue = (value: string) => (previousEndValue = value)

  function editInputValue(
    e: Event,
    newValue: string,
    func: (...args: any) => void
  ) {
    if (e.target instanceof HTMLInputElement) {
      const value = e.target.value
      if (value[2] != ' ') {
        e.target.value = newValue
      } else {
        func(e.target.value)
      }
    }
  }

  inputStart.oninput = (e) =>
    editInputValue(e, previousStartValue, setPreviousStartValue)
  inputEnd.oninput = (e) =>
    editInputValue(e, previousEndValue, setPreviousEndValue)
})()
