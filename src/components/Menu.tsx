import { Component, createSignal, onMount } from 'solid-js'
import { Switcher } from './Switcher'
import { timeStore, setVideoInterval, interval } from './App'
import { Loop } from './Loop'
import { Skip } from './Skip'
import { TimeLoopRef, Player, TimeSkipRef, StorageTime } from './types'

type SkipTime = { start: number; end: number }

export const Menu: Component = () => {
  const [isVideoLoopingActive, setIsVideoLoopingActive] = createSignal(true)

  const playerElement = document.querySelector('#ytd-player')
  let [player, setPlayer] = createSignal<Player | null>(null)

  let loopRef: TimeLoopRef | undefined
  let skipRef: TimeSkipRef | undefined

  onMount(() => {
    setTimeout(() => {
      if (playerElement) {
        //@ts-ignore
        setPlayer(playerElement.player_)
      }
    }, 500)
  })

  const setTimeInLocalStorage = () => {
    const storageData = localStorage.getItem('yt-time')
    let storageTime: StorageTime[] = JSON.parse(storageData || '[]')

    const searchParams = new URLSearchParams(window.location.search)
    const videoId = searchParams.get('v')
    if (videoId) {
      if (storageTime.some((e) => e.id === videoId)) {
        storageTime = storageTime.map((e) =>
          e.id === videoId ? { ...e, time: timeStore } : e
        )
      } else {
        storageTime = [
          ...storageTime,
          {
            id: videoId,
            time: timeStore
          }
        ]
      }
      localStorage.setItem('yt-time', JSON.stringify(storageTime))
    }
  }

  const setTimeInStore = () => {
    const loopTimeStart = loopRef?.startTime() || 0
    const loopTimeEnd = loopRef?.endTime() || 0
    const skipTime: SkipTime[] = []
    if (loopRef) {
      loopRef.checkInputsValues()

      timeStore.loopTime = {
        start: loopTimeStart,
        end: loopTimeEnd
      }
    }

    if (skipRef) {
      skipRef.checkInputsValues()
      skipRef.startTime.forEach((e, i) => {
        const end = skipRef?.endTime[i]()
        if (end !== undefined) {
          skipTime.push({ start: e(), end })
        }
      })

      timeStore.skipTime = skipTime
    }
    setTimeInLocalStorage()
    return { loopTimeStart, loopTimeEnd, skipTime }
  }

  const apply = () => {
    if (!player()) return
    const isVideoLoopingActiveValue = isVideoLoopingActive()

    const { loopTimeStart, loopTimeEnd, skipTime } = setTimeInStore()

    clearInterval(interval())
    setVideoInterval(
      setInterval(() => {
        if (isVideoLoopingActiveValue) {
          loopRef?.apply(loopTimeStart, loopTimeEnd)
        } else {
          skipRef?.apply(skipTime)
        }
      }, 1000)
    )
  }

  const cancel = () => {
    clearInterval(interval())
    setVideoInterval(0)
  }

  const switchComponent = (state: boolean) => {
    setTimeInStore()
    setIsVideoLoopingActive(state)
  }

  return (
    <>
      <Switcher state={isVideoLoopingActive()} setState={switchComponent} />
      {isVideoLoopingActive() ? (
        <Loop ref={(e: TimeLoopRef) => (loopRef = e)} player={player} />
      ) : (
        <Skip ref={(e: TimeSkipRef) => (skipRef = e)} player={player} />
      )}
      <button class="btn mt-8" onclick={apply}>
        apply
      </button>
      <button class="btn mt-8" onClick={cancel}>
        cancel
      </button>
    </>
  )
}
