import { Accessor, Setter } from 'solid-js'

export type InputRef = {
  allTime: () => number
  min: Accessor<number>
  sec: Accessor<number>
  setMin: Setter<number>
  setSec: Setter<number>
}

export type Player = {
  seekTo: (time: number) => void
  getCurrentTime: () => number
}

export type TimeRef = {
  startTime: () => number
  endTime: () => number
  checkInputsValues: () => void
}

export type TimeLoopRef = {
  startTime: () => number
  endTime: () => number
  checkInputsValues: () => void
  apply: (startTime: number, endTime: number) => void
}

export type TimeSkipRef = {
  checkInputsValues: () => void
  startTime: (() => number)[]
  endTime: (() => number)[]
  apply: (
    time: {
      start: number
      end: number
    }[]
  ) => void
}
