import React, { useState } from 'react'
import { ControlState } from '../interfaces/control'
import { getControlState } from './getControlState'

interface EventHandlers<T = Element> {
    onFocus: React.FocusEventHandler<T>
    onBlur: React.FocusEventHandler<T>

    onMouseDown: React.MouseEventHandler<T>
    onMouseUp: React.MouseEventHandler<T>

    onMouseEnter: React.MouseEventHandler<T>
    onMouseLeave: React.MouseEventHandler<T>
}

interface UseControlState<T = Element> {
    handlers: EventHandlers<T>
    state: ControlState
    focused: boolean
}

export function useControlState<T = Element>(disabled?: boolean): UseControlState<T> {
    const [pressed, setPressed] = useState(false)
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)

    const handlers = {
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        onMouseDown: () => setPressed(true),
        onMouseUp: () => setPressed(false),
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false)
    }

    return { handlers, focused, state: getControlState(pressed, hovered, disabled ?? false) }
}
