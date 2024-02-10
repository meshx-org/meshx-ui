import { RefObject, useEffect, useRef } from 'react'

export function useEvent<K extends keyof GlobalEventHandlersEventMap>(
    ref: RefObject<EventTarget>,
    event: K,
    handler: (this: Document, ev: GlobalEventHandlersEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
) {
    let handlerRef = useRef(handler)
    handlerRef.current = handler

    let isDisabled = handler == null

    useEffect(() => {
        if (isDisabled) {
            return
        }

        let element = ref.current!
        let handler = (e: GlobalEventHandlersEventMap[K]) => handlerRef.current.call(this, e)

        element.addEventListener(event, handler, options)
        return () => {
            element.removeEventListener(event, handler, options)
        }
    }, [ref, event, options, isDisabled])
}
