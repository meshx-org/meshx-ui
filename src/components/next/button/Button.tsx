import React, { useState } from 'react'
import { ControlState } from '../../../interfaces/control'
import ControlFill from '../control-fill/ControlFill'
import Elevation from '../elevation/Elevation'
import { ButtonProps } from './Button.types'

function Button({ apparance, loading, disabled, children }: ButtonProps) {
    const [pressed, setPressed] = useState(false)
    const [hovered, setHovered] = useState(false)

    let state: ControlState = ControlState.Rest
    if (hovered) state = ControlState.Hovered
    if (pressed && hovered) state = ControlState.Pressed
    if (disabled) state = ControlState.Disabled

    return (
        <button
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            type="button"
        >
            <Elevation>
                <ControlFill state={state}>
                    <div style={{ padding: 10 }}>{JSON.stringify({ pressed, hovered })}</div>
                </ControlFill>
            </Elevation>
        </button>
    )
}

export default Button
