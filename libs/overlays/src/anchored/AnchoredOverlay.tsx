import React, { Children, useRef } from 'react'
import { AnchoredOverlayProps } from '../anchored/AnchoredOverlay.types'
import { Overlay } from '../overlay/Overlay'
import { useOverlayPosition } from 'react-aria'

const DEFAULT_CROSS_OFFSET = 0
const DEFAULT_OFFSET = 0

const AnchoredOverlayContext = React.createContext<any>({})

export function AnchoredOverlay(props: AnchoredOverlayProps) {
    const { children, crossOffset = DEFAULT_CROSS_OFFSET, offset = DEFAULT_OFFSET } = props
    const [trigger, overlay] = Children.toArray(children)

    const tooltipTriggerRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const tooltipProps = {}
    const triggerProps = {}

    const { overlayProps, arrowProps, placement } = useOverlayPosition({
        placement: props.placement || 'top',
        targetRef: tooltipTriggerRef,
        overlayRef,
        offset,
        crossOffset,
        isOpen: props.isOpen,
        shouldFlip: props.shouldFlip,
        containerPadding: props.containerPadding
    })

    return (
        <div data-ref ref={tooltipTriggerRef} style={{ width: 'fit-content', height: 'fit-content' }}>
            {trigger}
            <AnchoredOverlayContext.Provider
                value={{
                    placement,
                    ref: overlayRef,
                    ...tooltipProps
                }}
            >
                <Overlay ref={overlayRef} isOpen={props.isOpen} nodeRef={undefined as any}>
                    {overlay}
                </Overlay>
            </AnchoredOverlayContext.Provider>
        </div>
    )
}
