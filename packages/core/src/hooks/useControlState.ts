import React, { useState } from 'react'
import { ControlState, getControlState } from '../utils'

interface EventHandlers<T = Element> {
    onMouseDownCapture: React.MouseEventHandler<T>
    // onClick: React.MouseEventHandler<T>

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

    const handleMouseUp = (e: any) => {
        setPressed(false)
        window.removeEventListener('mouseup', handleMouseUp, false)
    }

    const handlers = {
        onMouseDownCapture: () => {
            console.log('handleMouseDown - add Listeners')
            window.addEventListener('mouseup', handleMouseUp, false)
            setPressed(true)
        },
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false)
    }

    return { handlers, state: getControlState(pressed, hovered, disabled ?? false) }
}
