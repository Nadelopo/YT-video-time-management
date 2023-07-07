import { Component, createEffect, createSignal, onMount } from 'solid-js'
import { InputRef } from './types'

type Props = {
  title: 'start' | 'end'
  ref: (ref: InputRef) => void
  time: number
}

export const Inputs: Component<Props> = (props: Props) => {
  const [min, setMin] = createSignal(Math.floor(props.time / 60))
  const [sec, setSec] = createSignal(props.time % 60)

  props.ref({
    allTime: () => min() * 60 + sec(),
    min,
    sec,
    setMin,
    setSec
  })

  onMount(() => {
    setMin(Math.floor(props.time / 60))
    setSec(props.time % 60)
  })

  return (
    <div class="content__time">
      <div>{props.title} </div>
      <div>min</div>
      <input
        type="number"
        min="0"
        max="60"
        maxlength="2"
        value={min()}
        onInput={(e) => setMin(Number(e.target.value))}
      />
      <div>sec</div>
      <input
        type="number"
        min="0"
        max="60"
        maxlength="2"
        value={sec()}
        onInput={(e) => setSec(Number(e.target.value))}
      />
    </div>
  )
}
