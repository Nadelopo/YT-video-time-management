import { el, mount, RedomElementOfElQuery, setChildren, unmount } from 'redom'
import { contentLoop, menuInput } from './components'
import { waitForElm } from './utils/waitForElm'
import { createSvg } from './utils/createSvg'
import settingsSVG from './icons/settings.svg'
import S from './styles.sass?inline'
GM_addStyle(S)

enum State {
  Ended,
  Playing,
  Paused,
  Buffering,
  VideoCued
}

const main = el('div', {
  className: 'menu__root'
})

const inputLoopStartMin = new menuInput().el
const inputLoopStartSec = new menuInput().el
const inputLoopEndMin = new menuInput().el
const inputLoopEndSec = new menuInput().el
const menu = el('div', {
  className: 'content'
})

const contentLoopStart = new contentLoop(
  'start',
  inputLoopStartMin,
  inputLoopStartSec
)
const contentLoopEnd = new contentLoop('end', inputLoopEndMin, inputLoopEndSec)

const inputSkipStartMin = new menuInput().el
const inputSkipStartSec = new menuInput().el
const inputSkipEndMin = new menuInput().el
const inputSkipEndSec = new menuInput().el

const contentSkipStart = new contentLoop(
  'start',
  inputSkipStartMin,
  inputSkipStartSec
)
const contentSkipEnd = new contentLoop('end', inputSkipEndMin, inputSkipEndSec)

const applyBtn = el('button', 'apply', {
  className: 'btn mt-8'
})

const cancelBtn = el('button', 'cancel', {
  className: 'btn mt-8'
})

setChildren(menu, [
  el('div', 'loop time video', {
    className: 'mb-6'
  }),
  contentLoopStart,
  contentLoopEnd,
  el('hr'),
  el('div', 'skip time video', {
    className: 'mb-6'
  }),
  contentSkipStart,
  contentSkipEnd,
  applyBtn,
  cancelBtn
])

const closeMenu = () => {
  menu.classList.add('close')
  setTimeout(() => {
    unmount(main, menu)
    menu.classList.remove('close')
  }, 100)
}

mount(main, menu)

let showMenu = true
const settings = createSvg(settingsSVG, 'settings')

settings.onclick = () => {
  if (showMenu) {
    mount(main, menu)
  } else {
    closeMenu()
  }
  showMenu = !showMenu
}

mount(main, settings)
;(async () => {
  let timeLoopStart = 0
  let timeLoopEnd = 0
  let timeSkipStart = 0
  let timeSkipEnd = 0
  let currentTime = 0
  let interval = 0
  let initial = false

  let player: any = await waitForElm('#ytd-player')
  const menuElement = await waitForElm('.item.style-scope.ytd-watch-metadata')

  mount(menuElement, main)

  function onStateChange(state: number) {
    if (state === State.Playing) {
      interval = setInterval(() => {
        console.log('interval')
        if (
          (timeLoopEnd && currentTime >= timeLoopEnd) ||
          currentTime < timeLoopStart
        ) {
          clearInterval(interval)
          player.player_.seekTo(timeLoopStart)
        }
        if (
          timeSkipEnd &&
          currentTime >= timeSkipStart &&
          currentTime < timeSkipEnd
        ) {
          clearInterval(interval)
          player.player_.seekTo(timeSkipEnd)
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

  applyBtn.onclick = () => {
    timeLoopStart =
      Number(inputLoopStartMin.value) * 60 + Number(inputLoopStartSec.value)
    timeLoopEnd =
      Number(inputLoopEndMin.value) * 60 + Number(inputLoopEndSec.value)
    timeSkipStart =
      Number(inputSkipStartMin.value) * 60 + Number(inputSkipStartSec.value)
    timeSkipEnd =
      Number(inputSkipEndMin.value) * 60 + Number(inputSkipEndSec.value)

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
})()
