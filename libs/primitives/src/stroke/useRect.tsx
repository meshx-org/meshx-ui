import { useLayoutEffect } from '@meshx/mxui-core'
import { useCallback, useState } from 'react'

export const useRect = (ref: any) => {
    const [rect, setRect] = useState(getRect(ref ? ref.current : null))

    const handleResize = useCallback(() => {
        if (!ref.current) {
            return
        }

        // Update client rect
        setRect(getRect(ref.current))
    }, [ref])

    useLayoutEffect(() => {
        const element = ref.current
        if (!element) {
            return
        }

        handleResize()

        if (typeof ResizeObserver === 'function') {
            let resizeObserver: ResizeObserver | null = new ResizeObserver(() => handleResize())
            resizeObserver.observe(element)

            return () => {
                if (!resizeObserver) {
                    return
                }

                resizeObserver.disconnect()
                resizeObserver = null
            }
        } else {
            // Browser support, remove freely
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [ref.current])

    return rect
}

function getRect(element: HTMLElement): {
    bottom: number
    height: number
    left: number
    right: number
    top: number
    width: number
} {
    if (!element) {
        return {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0
        }
    }

    return element.getBoundingClientRect()
}
