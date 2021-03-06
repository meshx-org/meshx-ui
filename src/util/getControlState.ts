import { ControlState } from '../interfaces/control'

export function getControlState(pressed: boolean, hovered: boolean, disabled: boolean): ControlState {
    let state: ControlState = ControlState.Rest
    if (hovered) state = ControlState.Hovered
    if (pressed && hovered) state = ControlState.Pressed
    if (disabled) state = ControlState.Disabled

    return state
}
