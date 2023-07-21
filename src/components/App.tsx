import { createSignal, Show, type Component, createEffect } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { watchUrl } from '../utils/watchUrl'
import { Menu } from './Menu'
import { StorageTime } from './types'

export const [interval, setVideoInterval] = createSignal(0)
const [isMenuOpen, setIsMenuOpen] = createSignal(false)
const [stateClass, setStateClass] = createSignal('open')
let menuRef: HTMLDivElement | null = null

export const timeStore = createMutable({
  loopTime: {
    start: 0,
    end: 0
  },
  skipTime: [
    {
      start: 0,
      end: 0
    }
  ]
})

watchUrl(({ url }) => {
  clearInterval(interval())
  setVideoInterval(0)
  timeStore.loopTime = {
    start: 0,
    end: 0
  }
  timeStore.skipTime = [
    {
      start: 0,
      end: 0
    }
  ]
  setIsMenuOpen(false)
  const search = url.split('?')[1]
  const searchParams = new URLSearchParams(search)
  const videoId = searchParams.get('v')
  const storageData = localStorage.getItem('yt-time')

  if (storageData) {
    const parsed: StorageTime[] = JSON.parse(storageData)
    const findedStore = parsed.find((e) => e.id === videoId)
    if (findedStore) {
      const { loopTime, skipTime } = findedStore.time
      timeStore.loopTime = loopTime
      timeStore.skipTime = skipTime
    }
  }
})

export const App: Component = () => {
  const onSettingsClick = () => {
    setStateClass('close')
    setTimeout(() => {
      setIsMenuOpen(!isMenuOpen())
      setStateClass('open')
    }, 100)
  }

  const onClickOutside = (e: Event) => {
    if (menuRef && !e.composedPath().includes(menuRef)) {
      onSettingsClick()
    }
  }

  createEffect(() => {
    if (isMenuOpen()) {
      window.addEventListener('click', onClickOutside)
    } else {
      window.removeEventListener('click', onClickOutside)
    }
  })

  return (
    <div class="menu__root" ref={menuRef!}>
      <svg
        class="settings"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
        onClick={onSettingsClick}
      >
        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
      </svg>
      <Show when={isMenuOpen()}>
        <div class={`content ${stateClass()}`}>
          <Menu />
        </div>
      </Show>
    </div>
  )
}
