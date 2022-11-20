export enum ControlState {
    Rest = "rest",
    Hovered = "hovered",
    Pressed = "pressed",
    Disabled = "disabled",
}

export function getControlState(pressed: boolean, hovered: boolean, disabled: boolean): ControlState {
    let state: ControlState = ControlState.Rest
    if (hovered) state = ControlState.Hovered
    if (pressed && hovered) state = ControlState.Pressed
    if (disabled) state = ControlState.Disabled

    return state
}

export enum CardState {
    Rest = "rest",
    Hovered = "hovered",
    Pressed = "pressed",
}