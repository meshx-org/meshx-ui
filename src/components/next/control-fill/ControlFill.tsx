import React from 'react'
import { ControlState } from '../../../interfaces/control'
import { ControlFillProps } from './ControlFill.types'

function getStateFill(state: ControlState): string {
    switch (state) {
        case ControlState.Hovered:
            return 'red'
        case ControlState.Pressed:
            return 'green'
        case ControlState.Disabled:
            return 'blue'
        case ControlState.Rest:
        default:
            return 'white'
    }
}

function ControlFill({ children, state }: ControlFillProps) {
    return <div className='control-fill' style={{ backgroundColor: getStateFill(state), borderRadius: 4.5 }}>{children}</div>
}

export default ControlFill
