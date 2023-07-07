import { Component, onMount } from 'solid-js'
import { Inputs } from './Inputs'
import { TimeRef, InputRef } from './types'

type Props = {
  time: {
    start: number
    end: number
  }
  ref: (ref: TimeRef) => void
}

export const ContentTime: Component<Props> = (props: Props) => {
  let startTime: InputRef | undefined
  let endTime: InputRef | undefined

  const checkInputsValues = () => {
    if (!startTime) return
    if (!endTime) return
    if (endTime.allTime() < startTime.allTime()) {
      endTime.setSec(startTime.sec())
    }
    if (endTime.allTime() < startTime.allTime()) {
      endTime.setMin(startTime.min())
    }
  }

  onMount(() => {
    if (!startTime || !endTime) return
    props.ref({
      startTime: startTime.allTime,
      endTime: endTime.allTime,
      checkInputsValues
    })
  })

  return (
    <div class="content__wrapper__time">
      <Inputs
        title="start"
        time={props.time.start}
        ref={(e: InputRef) => (startTime = e)}
      />
      <Inputs
        title="end"
        time={props.time.end}
        ref={(e: InputRef) => (endTime = e)}
      />
    </div>
  )
}
