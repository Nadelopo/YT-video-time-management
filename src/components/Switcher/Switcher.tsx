import { Component } from 'solid-js'
import S from './Switcher.module.sass'
import GM_S from './Switcher.module.sass?inline'

GM_addStyle(GM_S)

type Props = {
  state: boolean
  setState: (state: boolean) => void
}

export const Switcher: Component<Props> = (props: Props) => {
  const id = crypto.randomUUID()
  return (
    <div class={S.switcher}>
      <input
        type="checkbox"
        id={id}
        style="display:none"
        onChange={() => props.setState(!props.state)}
        checked={!props.state}
      />
      <label
        for={id}
        class={S.toggle}
      >
        <span></span>
      </label>
    </div>
  )
}
