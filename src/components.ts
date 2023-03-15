import { el, setChildren, RedomElementOfElQuery } from 'redom'

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

export class contentLoop {
  el: RedomElementOfElQuery<HTMLElement>
  constructor(
    title: string,
    inputStart: HTMLInputElement,
    inputEnd: HTMLInputElement
  ) {
    this.el = el('div', { className: 'content__loop' })
    setChildren(this.el, [
      el('div', title + ':'),
      el('div', 'min.'),
      inputStart,
      el('div', 'sec.'),
      inputEnd
    ])
  }
}
