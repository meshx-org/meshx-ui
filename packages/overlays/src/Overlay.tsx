import React, { useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { OverlayProps, OverlayAriaProps } from './Overlay.types'
import { Ref } from 'react'
import { config, animated, useSpring } from 'react-spring'

function useIsSSR() {
    const isDOM = typeof window !== 'undefined' && window.document && window.document.documentElement

    return {
        isBrowser: isDOM,
        isServer: !isDOM
    }
}

export const OverlayAriaContext = React.createContext<{ contain: boolean; setContain: any } | null>(null)

/**const
 * A container which renders an overlay such as a popover or modal in a portal,
 * and provides a focus scope for the child elements.
 */
export function OverlayAria(props: OverlayAriaProps) {
    const { isServer } = useIsSSR()
    const { portalContainer = isServer ? null : document.body } = props
    const [contain, setContain] = useState(false)
    const contextValue = useMemo(() => ({ contain, setContain }), [contain, setContain])

    if (!portalContainer) {
        return null
    }

    const contents = <OverlayAriaContext.Provider value={contextValue}>{props.children}</OverlayAriaContext.Provider>

    return ReactDOM.createPortal(contents, portalContainer)
}

function Overlay(props: OverlayProps, ref: Ref<HTMLDivElement>) {
    const { children, isOpen, container, overlayStyles } = props

    const styles = useSpring({
        to: {
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0px)' : 'translateY(6px)'
        },
        config: {duration: 100, ...config.default}
    })

    // Don't un-render the overlay while it's transitioning out.
    //const mountOverlay = isOpen
    //if (!mountOverlay) {
    //    // Don't bother showing anything if we don't have to.
    //    return null
    //}

    return (
        <OverlayAria portalContainer={container}>
            <div style={{ position: 'relative', background: 'transparent', isolation: 'isolate' }}>
                <div ref={ref} style={overlayStyles}>
                    <animated.div style={styles}>{children}</animated.div>
                </div>
            </div>
        </OverlayAria>
    )
}

const _Overlay = React.forwardRef(Overlay)
export { _Overlay as Overlay }
