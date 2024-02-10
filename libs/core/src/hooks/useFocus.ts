import React, { useState } from 'react'

interface EventHandlers<T = Element> {
    onFocus: React.FocusEventHandler<T>
    onBlur: React.FocusEventHandler<T>
}

interface UseFocus<T = Element> {
    handlers: EventHandlers<T>
    focused: boolean
}

export function useFocus<T = Element>(onFocus?: React.FocusEventHandler<T>, onBlur?: React.FocusEventHandler<T>): UseFocus<T> {
    const [focused, setFocused] = useState(false)

    const handlers = {
        onFocus: (e: React.FocusEvent<T>) => {
            setFocused(true)
            onFocus && onFocus(e)
        },
        onBlur: (e: React.FocusEvent<T>) => {
            setFocused(false)
            onBlur && onBlur(e)
        }
    }

    return { handlers, focused }
}
