import React, { useState } from 'react'
import { ControlState } from '../interfaces/control'
import { getControlState } from '../util/getControlState'

interface EventHandlers<T = Element> {
   

    onMouseDown: React.MouseEventHandler<T>
    onMouseUp: React.MouseEventHandler<T>

    onMouseEnter: React.MouseEventHandler<T>
    onMouseLeave: React.MouseEventHandler<T>
}

interface UseControlState<T = Element> {
    handlers: EventHandlers<T>
    state: ControlState
}

export function useControlState<T = Element>(disabled?: boolean): UseControlState<T> {
    const [pressed, setPressed] = useState(false)
    const [hovered, setHovered] = useState(false)

    const handlers = {
      
        onMouseDown: () => setPressed(true),
        onMouseUp: () => setPressed(false),
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false)
    }

    return { handlers, state: getControlState(pressed, hovered, disabled ?? false) }
}
