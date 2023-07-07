import { Component } from 'solid-js'

type Props = {
  state: boolean
  setState: (state: boolean) => void
}

export const Switcher: Component<Props> = (props: Props) => {
  return (
    <div class="switcher">
      <input
        type="checkbox"
        id="cbx"
        style="display:none"
        onChange={() => props.setState(!props.state)}
        checked={!props.state}
      />
      <label for="cbx" class="toggle">
        <span></span>
      </label>
    </div>
  )
}
