export enum State {
  Ended,
  Playing,
  Paused,
  Buffering,
  VideoCued
}

export interface InputsSkipTime {
  inputSkipStartMin: HTMLInputElement
  inputSkipStartSec: HTMLInputElement
  inputSkipEndMin: HTMLInputElement
  inputSkipEndSec: HTMLInputElement
}

export interface TimeSkip {
  timeSkipStart: number
  timeSkipEnd: number
}
