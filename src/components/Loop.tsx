import { Accessor, Component, createEffect, createSignal } from 'solid-js'
import { ContentTime } from './ContentTime'
import { timeStore } from './App'
import { Player, TimeLoopRef, TimeRef } from './types'

type Props = {
  ref: (ref: TimeLoopRef) => void
  player: Accessor<Player | null>
}

export const Loop: Component<Props> = (props: Props) => {
  const [loopRef, setLoopRef] = createSignal<TimeRef>()

  createEffect(() => {
    const loopRefValue = loopRef()
    if (loopRefValue) {
      const player = props.player()
      props.ref({
        checkInputsValues: loopRefValue.checkInputsValues,
        startTime: loopRefValue.startTime,
        endTime: loopRefValue.endTime,
        apply: (startTime: number, endTime: number) => {
          if (!player) return
          const currentTime = player.getCurrentTime()
          if (endTime !== 0) {
            if (currentTime >= endTime) {
              player.seekTo(startTime)
            } else if (currentTime < startTime) {
              player.seekTo(startTime)
            }
          }
        }
      })
      return
    }
  })
  return (
    <>
      <div style={{ 'text-align': 'center' }}>loop</div>
      <ContentTime ref={setLoopRef} time={timeStore.loopTime} />
    </>
  )
}
