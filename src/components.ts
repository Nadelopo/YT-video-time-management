import { el, setChildren, RedomElementOfElQuery, mount } from 'redom'
import { InputsSkipTime } from './types'

interface ContentWrapperTime {
  inputsSkipTime?: InputsSkipTime
  inputsLoopTime?: {
    inputLoopStartMin: HTMLInputElement
    inputLoopStartSec: HTMLInputElement
    inputLoopEndMin: HTMLInputElement
    inputLoopEndSec: HTMLInputElement
  }
}

export class menuInput {
  el: RedomElementOfElQuery<HTMLInputElement>
  constructor(classname?: string) {
    this.el = el('input', {
      className: classname ?? '',
      type: 'number',
      value: '00',
      min: 0,
      max: 60,
      maxlength: 2
    })
  }
}

export class contentTime {
  el: RedomElementOfElQuery<HTMLElement>
  constructor(
    title: string,
    inputStart: HTMLInputElement,
    inputEnd: HTMLInputElement
  ) {
    this.el = el('div', { className: 'content__time' })
    setChildren(this.el, [
      el('div', title + ':'),
      el('div', 'min.'),
      inputStart,
      el('div', 'sec.'),
      inputEnd
    ])
  }
}

export class contentWrapperTime {
  el: RedomElementOfElQuery<HTMLElement>
  constructor({ inputsSkipTime, inputsLoopTime }: ContentWrapperTime) {
    this.el = el('div', { className: 'content__wrapper__time' })
    let contentStart: contentTime, contentEnd: contentTime
    if (inputsSkipTime) {
      contentStart = new contentTime(
        'start',
        inputsSkipTime.inputSkipStartMin,
        inputsSkipTime.inputSkipStartSec
      )
      contentEnd = new contentTime(
        'end',
        inputsSkipTime.inputSkipEndMin,
        inputsSkipTime.inputSkipEndSec
      )
    }
    if (inputsLoopTime) {
      contentStart = new contentTime(
        'start',
        inputsLoopTime.inputLoopStartMin,
        inputsLoopTime.inputLoopStartSec
      )
      contentEnd = new contentTime(
        'end',
        inputsLoopTime.inputLoopEndMin,
        inputsLoopTime.inputLoopEndSec
      )
    }
    setChildren(this.el, [contentStart, contentEnd])
  }
}
