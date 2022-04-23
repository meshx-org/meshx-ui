import React, { useState } from 'react'

interface EventHandlers<T = Element> {
    onFocus: React.FocusEventHandler<T>
    onBlur: React.FocusEventHandler<T>
}

interface UseFocus<T = Element> {
    handlers: EventHandlers<T>
    focused: boolean
}

export function useFocus<T = Element>(): UseFocus<T> {
    const [focused, setFocused] = useState(false)

    const handlers = {
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false)
    }

    return { handlers, focused }
}
