import { Component, createSignal, onMount } from 'solid-js'
import { Switcher } from './Switcher'
import { timeStore } from './App'
import { Loop } from './Loop'
import { Skip } from './Skip'
import { TimeLoopRef, Player, TimeSkipRef } from './types'

type SkipTime = { start: number; end: number }

let interval = 0
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

    localStorage.setItem('yt-time', JSON.stringify(timeStore))
    return { loopTimeStart, loopTimeEnd, skipTime }
  }

  const apply = () => {
    if (!player()) return
    const isVideoLoopingActiveValue = isVideoLoopingActive()

    const { loopTimeStart, loopTimeEnd, skipTime } = setTimeInStore()

    clearInterval(interval)
    interval = setInterval(() => {
      if (isVideoLoopingActiveValue) {
        loopRef?.apply(loopTimeStart, loopTimeEnd)
      } else {
        skipRef?.apply(skipTime)
      }
    }, 1000)
  }

  const cancel = () => {
    clearInterval(interval)
    interval = 0
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
