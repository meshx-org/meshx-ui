/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { calculatePosition, PositionResult } from './calculatePosition'
import { RefObject, useCallback, useRef, useState } from 'react'
import { Placement, PlacementAxis, PositionProps } from './types'
import { useResizeObserver } from "./utils/useResizeObserver"
import { useLayoutEffect } from '@meshx-org/mxui-core'

type DOMAttributes = any

export interface AriaPositionProps extends PositionProps {
    /**
     * Element that that serves as the positioning boundary.
     * @default document.body
     */
    boundaryElement?: Element
    /**
     * The ref for the element which the overlay positions itself with respect to.
     */
    targetRef: RefObject<Element>
    /**
     * The ref for the overlay element.
     */
    overlayRef: RefObject<Element>
    /**
     * A ref for the scrollable region within the overlay.
     * @default overlayRef
     */
    scrollRef?: RefObject<Element>
    /**
     * Whether the overlay should update its position automatically.
     * @default true
     */
    shouldUpdatePosition?: boolean
    /** Handler that is called when the overlay should close. */
    onClose?: () => void
    /**
     * The maxHeight specified for the overlay element.
     * By default, it will take all space up to the current viewport height.
     */
    maxHeight?: number
}

export interface PositionAria {
    /** Props for the overlay container element. */
    overlayProps: DOMAttributes
    /** Props for the overlay tip arrow if any. */
    arrowProps: DOMAttributes
    /** Placement of the overlay with respect to the overlay trigger. */
    placement: PlacementAxis
    /** Updates the position of the overlay. */
    updatePosition(): void
}

let visualViewport = typeof window !== 'undefined' ? window.visualViewport : null

/**
 * Handles positioning overlays like popovers and menus relative to a trigger
 * element, and updating the position when the window resizes.
 */
export function useOverlayPosition(props: AriaPositionProps): PositionAria {
    const {
        targetRef,
        overlayRef,
        scrollRef = overlayRef,
        placement = 'bottom' as Placement,
        containerPadding = 12,
        shouldFlip = true,
        boundaryElement = typeof document !== 'undefined' ? document.body : null,
        offset = 0,
        crossOffset = 0,
        shouldUpdatePosition = true,
        isOpen = true,
        onClose,
        maxHeight
    } = props

    const { direction } = { direction: 'ltr' }
    const [position, setPosition] = useState<PositionResult>({
        position: {},
        arrowOffsetLeft: undefined,
        arrowOffsetTop: undefined,
        maxHeight: undefined,
        placement: undefined as any
    })

    let deps = [
        shouldUpdatePosition,
        placement,
        overlayRef.current,
        targetRef.current,
        scrollRef.current,
        containerPadding,
        shouldFlip,
        boundaryElement,
        offset,
        crossOffset,
        isOpen,
        direction,
        maxHeight
    ]

    let updatePosition = useCallback(() => {
        if (
            shouldUpdatePosition === false ||
            !isOpen ||
            !overlayRef.current ||
            !targetRef.current ||
            !scrollRef.current ||
            !boundaryElement
        ) {
            return
        }

        setPosition(
            calculatePosition({
                placement: translateRTL(placement, direction),
                overlayNode: overlayRef.current,
                targetNode: targetRef.current,
                scrollNode: scrollRef.current,
                padding: containerPadding,
                shouldFlip,
                boundaryElement,
                offset,
                crossOffset,
                maxHeight
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    // Update position when anything changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(updatePosition, deps)

    // Update position on window resize
    useResize(updatePosition)

    // Update position when the overlay changes size (might need to flip).
    useResizeObserver({
        ref: overlayRef,
        onResize: updatePosition
    })

    // Reposition the overlay and do not close on scroll while the visual viewport is resizing.
    // This will ensure that overlays adjust their positioning when the iOS virtual keyboard appears.
    let isResizing = useRef(false)
    useLayoutEffect(() => {
        let timeout: ReturnType<typeof setTimeout>
        let onResize = () => {
            isResizing.current = true
            clearTimeout(timeout)

            timeout = setTimeout(() => {
                isResizing.current = false
            }, 500)

            updatePosition()
        }

        visualViewport?.addEventListener('resize', onResize)

        return () => {
            visualViewport?.removeEventListener('resize', onResize)
        }
    }, [updatePosition])

    
    return {
        overlayProps: {
            style: {
                position: 'absolute',
                zIndex: 100000, // should match the z-index in ModalTrigger
                ...position.position,
                maxHeight: position.maxHeight
            }
        },
        placement: position.placement,
        arrowProps: {
            style: {
                left: position.arrowOffsetLeft,
                top: position.arrowOffsetTop
            }
        },
        updatePosition
    }
}

function useResize(onResize: any) {
    useLayoutEffect(() => {
        window.addEventListener('resize', onResize, false)
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [onResize])
}

function translateRTL(position: any, direction: any) {
    if (direction === 'rtl') {
        return position.replace('start', 'right').replace('end', 'left')
    }
    return position.replace('start', 'left').replace('end', 'right')
}
