import { el, mount, RedomElementOfElQuery, setChildren, unmount } from 'redom'
import { contentWrapperTime, menuInput } from './components'
import { waitForElm } from './utils/waitForElm'
import { createSvg } from './utils/createSvg'
import settingsSVG from './icons/settings.svg'
import { InputsSkipTime, TimeSkip, State } from './types'
import S from './styles.sass?inline'
GM_addStyle(S)

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

const skipTimeInputs: InputsSkipTime[] = [
  {
    inputSkipStartMin: new menuInput().el,
    inputSkipStartSec: new menuInput().el,
    inputSkipEndMin: new menuInput().el,
    inputSkipEndSec: new menuInput().el
  }
]

const contentSkip = el('div', { className: 'content__skip' })
mount(
  contentSkip,
  new contentWrapperTime({ inputsSkipTime: skipTimeInputs[0] })
)

const addTimeSkipBtn = el('button', 'add time skip', {
  className: 'btn mt-8',
  onclick: () => {
    skipTimeInputs.push({
      inputSkipStartMin: new menuInput().el,
      inputSkipStartSec: new menuInput().el,
      inputSkipEndMin: new menuInput().el,
      inputSkipEndSec: new menuInput().el
    })

    mount(
      contentSkip,
      new contentWrapperTime({ inputsSkipTime: skipTimeInputs.at(-1) })
    )
  }
})

const applyBtn = el('button', 'apply', {
  className: 'btn mt-8'
})

const cancelBtn = el('button', 'cancel', {
  className: 'btn mt-8'
})

const contentLoopTime = new contentWrapperTime({
  inputsLoopTime: {
    inputLoopStartMin,
    inputLoopStartSec,
    inputLoopEndMin,
    inputLoopEndSec
  }
})

setChildren(menu, [
  el('div', 'loop time video', {
    className: 'mb-6'
  }),
  contentLoopTime,
  el('hr'),
  el('div', 'skip time video', {
    className: 'mb-6'
  }),
  contentSkip,
  addTimeSkipBtn,
  applyBtn,
  cancelBtn
])

let showMenu = true

const closeMenu = () => {
  menu.classList.add('close')
  setTimeout(() => {
    unmount(main, menu)
    menu.classList.remove('close')
  }, 100)
  showMenu = true
}

let showMenu = true
const settings = createSvg(settingsSVG, 'settings')

settings.onclick = () => {
  if (showMenu) {
    mount(main, menu)
    showMenu = false
  } else {
    closeMenu()
  }
  showMenu = !showMenu
}

mount(main, settings)
;(async () => {
  let timeLoopStart = 0
  let timeLoopEnd = 0
  const timeSkip: TimeSkip[] = []
  let currentTime = 0
  let interval = 0
  let initial = false

  let player: any = await waitForElm('#ytd-player')
  const menuElement = await waitForElm('.item.style-scope.ytd-watch-metadata')

  mount(menuElement, main)

  function onStateChange(state: number) {
    if (state === State.Playing) {
      interval = setInterval(() => {
        if (
          (timeLoopEnd && currentTime >= timeLoopEnd) ||
          currentTime < timeLoopStart
        ) {
          clearInterval(interval)
          player.player_.seekTo(timeLoopStart)
        }
        timeSkip.forEach((time) => {
          if (
            time.timeSkipEnd &&
            currentTime >= time.timeSkipStart &&
            currentTime < time.timeSkipEnd
          ) {
            clearInterval(interval)
            player.player_.seekTo(time.timeSkipEnd)
          }
        })

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

    skipTimeInputs.forEach((time) => {
      timeSkip.push({
        timeSkipStart:
          Number(time.inputSkipStartMin.value) * 60 +
          Number(time.inputSkipStartSec.value),
        timeSkipEnd:
          Number(time.inputSkipEndMin.value) * 60 +
          Number(time.inputSkipEndSec.value)
      })
    })

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
