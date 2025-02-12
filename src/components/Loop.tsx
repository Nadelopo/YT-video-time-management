import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Index
} from 'solid-js'
import { ContentTime } from './ContentTime'
import { timeStore } from './App'
import { Player, TimeLoopRef, TimeRef } from './types'
import { convertToSeconds } from '../utils/convertToSeconds'
import { Switcher } from './Switcher'

type Props = {
  ref: (ref: TimeLoopRef) => void
  player: Accessor<Player | null>
  chapters: Accessor<string[]>
}

export const Loop: Component<Props> = (props: Props) => {
  const [loopRef, setLoopRef] = createSignal<TimeRef>()
  const [isInputMode, setIsInputMode] = createSignal(false)

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

  const [activeChapter, setActiveChapter] = createSignal<number | null>(null)
  const onChapter = (chapter: string, i: number) => {
    const start = convertToSeconds(chapter)
    const end = convertToSeconds(props.chapters()[i + 1])
    timeStore.loopTime = { start, end }
    setActiveChapter(i)
  }
  return (
    <>
      <div style={{ 'text-align': 'center' }}>
        <div>loop</div>
        <Switcher
          state={isInputMode()}
          setState={setIsInputMode}
        />
        <div>mode {isInputMode() ? 'input' : 'select'}</div>
        <div class="chapters">
          {isInputMode() ? (
            <ContentTime
              ref={setLoopRef}
              time={timeStore.loopTime}
            />
          ) : (
            <Index each={props.chapters()}>
              {(chapter, i) => (
                <div class="chapter">
                  <span
                    classList={{ active: activeChapter() === i }}
                    onClick={() => onChapter(chapter(), i)}
                  >
                    {chapter()}
                  </span>
                </div>
              )}
            </Index>
          )}
        </div>
      </div>
    </>
  )
}
