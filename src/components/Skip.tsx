import {
  Accessor,
  Component,
  Index,
  createEffect,
  createSignal
} from 'solid-js'
import { timeStore } from './App'
import { ContentTime } from './ContentTime'
import { TimeSkipRef, TimeRef, Player } from './types'

type Props = {
  ref: (ref: TimeSkipRef) => void
  player: Accessor<Player | null>
}

export const Skip: Component<Props> = (props: Props) => {
  const [skipRef, setSkipRef] = createSignal<TimeRef[]>([])
  createEffect(() => {
    if (skipRef().length) {
      const player = props.player()
      props.ref({
        checkInputsValues: () =>
          skipRef().forEach((e) => e.checkInputsValues()),
        startTime: skipRef().map((e) => e.startTime),
        endTime: skipRef().map((e) => e.endTime),
        apply: (time: { start: number; end: number }[]) => {
          if (!player) return
          const currentTime = player.getCurrentTime()
          time.forEach((t) => {
            if (t.end === 0) return
            if (currentTime >= t.start && currentTime < t.end) {
              player.seekTo(t.end)
            }
          })
        }
      })
    }
  })

  const addTimeSkip = () => {
    timeStore.skipTime.push({
      start: 0,
      end: 0
    })
  }

  const removeTimeSkip = () => {
    if (timeStore.skipTime.length === 1) return
    timeStore.skipTime.splice(-1)
    // setSkipRef(skipRef().toSpliced(-1))
    setSkipRef([...skipRef()].splice(-1))
  }

  const clear = () => {
    timeStore.skipTime = timeStore.skipTime.map(() => ({ start: 0, end: 0 }))
  }

  return (
    <>
      <div style={{ 'text-align': 'center' }}>skip</div>
      <Index each={timeStore.skipTime}>
        {(_, index) => (
          <ContentTime
            ref={(e) => setSkipRef([...skipRef(), e])}
            time={timeStore.skipTime[index]}
          />
        )}
      </Index>
      <button class="btn mt-8" onClick={addTimeSkip}>
        add
      </button>
      <button class="btn mt-8" onClick={removeTimeSkip}>
        remove
      </button>
      <button class="btn mt-8" onClick={clear}>
        clear
      </button>
    </>
  )
}
