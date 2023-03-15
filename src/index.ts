import { waitForElm } from './utils/waitForElm'
import { el, mount, RedomElementOfElQuery, setChildren, unmount } from 'redom'
import settingsSVG from './icons/settings.svg'
import { createSvg } from './utils/createSvg'
import S from './styles.sass?inline'
import { contentLoop, menuInput } from './components'
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

const inputLoopStartSec = new menuInput().el
const inputLoopStartMin = new menuInput().el
const inputLoopEndSec = new menuInput().el
const inputLoopEndMin = new menuInput().el
const menu = el('div', {
  className: 'content'
})

const contentLoopStart = new contentLoop(
  'start',
  inputLoopStartMin,
  inputLoopStartSec
)
const contentLoopEnd = new contentLoop('end', inputLoopEndMin, inputLoopEndSec)

const applyBtn = el('button', 'apply', {
  className: 'btn mt-8'
})

const cancelBtn = el('button', 'cancel', {
  className: 'btn mt-8'
})

setChildren(menu, [
  el('div', 'loop video time', {
    className: 'mb-6'
  }),
  contentLoopStart,
  contentLoopEnd,
  applyBtn,
  cancelBtn
])

let showMenu = true
const settings = createSvg(settingsSVG, 'settings')

const closeMenu = () => {
  menu.classList.add('close')
  setTimeout(() => {
    unmount(main, menu)
    menu.classList.remove('close')
  }, 100)
}

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
  let timeStart = 0 //200
  let timeEnd = 0 //396
  let currentTime = 0
  let interval = 0
  let initial = false

  let player: any = await waitForElm('#ytd-player')
  const menuElement = await waitForElm('.item.style-scope.ytd-watch-metadata')

  mount(menuElement, main)

  function onStateChange(state: number) {
    console.log('change')
    if (state == State.Playing) {
      interval = setInterval(() => {
        if (currentTime >= timeEnd || currentTime < timeStart) {
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

  applyBtn.onclick = () => {
    timeStart =
      Number(inputLoopStartMin.value) * 60 + Number(inputLoopStartSec.value)
    timeEnd = Number(inputLoopEndMin.value) * 60 + Number(inputLoopEndSec.value)
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
