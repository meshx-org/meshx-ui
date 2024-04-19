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

import React, { ForwardedRef, Ref, RefObject, forwardRef, useRef, useState } from 'react'
import { Overlay } from '../overlay/Overlay'
import { PopoverProps, PopoverWrapperProps } from './Popover.types'
import { mergeProps, useFocusWithin, usePopover } from 'react-aria'
import { useDOMRef } from '@react-spectrum/utils'
import { useLayoutEffect } from '@meshx/mxui-core'
import { DOMRef } from '../types'
import { FlyoutSurface, FlyoutShadow, SurfaceStroke, AcrylicFill } from '@meshx/mxui-primitives'

function Popover(props: PopoverProps, ref: DOMRef<HTMLElement>) {
    const { children, state, ...otherProps } = props
    const domRef = useDOMRef(ref)
    const wrapperRef = useRef<HTMLDivElement>(null)

    return (
        <Overlay {...otherProps} isOpen={state.isOpen} nodeRef={wrapperRef}>
            <PopoverWrapper ref={domRef} {...props} wrapperRef={wrapperRef}>
                {children}
            </PopoverWrapper>
        </Overlay>
    )
}

const PopoverWrapper = forwardRef((props: PopoverWrapperProps, ref: ForwardedRef<HTMLElement>) => {
    const {
        children,
        isOpen,
        hideArrow,
        isNonModal,
        enableBothDismissButtons,
        state,
        wrapperRef,
        onDismissButtonPress = () => state.close()
    } = props

    const { size, borderWidth, arrowRef } = useArrowSize()
    const borderRadius = 5 // usePopoverBorderRadius(ref as any)
    const borderDiagonal = borderWidth * Math.SQRT2
    const primary = size + borderDiagonal
    const secondary = primary * 2

    const { focusWithinProps } = useFocusWithin(props)
    const { popoverProps, arrowProps, underlayProps, placement } = usePopover(
        {
            ...props,
            popoverRef: ref as any,
            maxHeight: undefined,
            arrowSize: hideArrow ? 0 : secondary,
            arrowBoundaryOffset: borderRadius
        },
        state
    )

    // Attach Transition's nodeRef to outermost wrapper for node.reflow: https://github.com/reactjs/react-transition-group/blob/c89f807067b32eea6f68fd6c622190d88ced82e2/src/Transition.js#L231
    return (
        <div ref={wrapperRef}>
            {/*!isNonModal && <Underlay isTransparent {...mergeProps(underlayProps)} isOpen={isOpen} />*/}
            <div
                // {...styleProps}
                {...mergeProps(popoverProps, focusWithinProps)}
                style={{
                    position: 'relative',
                    height: 'fit-content',
                    ...props.UNSAFE_style,
                    ...popoverProps.style
                }}
                ref={ref as any}
                //className={classNames(
                //    styles,
                //    'spectrum-Popover',
                //     `spectrum-Popover--${placement}`,
                //    {
                //        'spectrum-Popover--withTip': !hideArrow,
                //        'is-open': isOpen,
                //        [`is-open--${placement}`]: isOpen
                //    },
                //    classNames(overrideStyles, 'spectrum-Popover', 'react-spectrum-Popover'),
                //    styleProps.className
                //)}
                role="presentation"
                data-testid="popover"
            >
                <FlyoutSurface borderRadius={borderRadius}>{children}</FlyoutSurface>
            </div>
        </div>
    )
})

function usePopoverBorderRadius(popoverRef: RefObject<HTMLDivElement>) {
    const [borderRadius, setBorderRadius] = useState(0)

    useLayoutEffect(() => {
        if (popoverRef.current) {
            const spectrumBorderRadius = window.getComputedStyle(popoverRef.current).borderRadius
            if (spectrumBorderRadius !== '') {
                setBorderRadius(parseInt(spectrumBorderRadius, 10))
            }
        }
    }, [popoverRef])

    return borderRadius
}

function useArrowSize() {
    const [size, setSize] = useState(20)
    const [borderWidth, setBorderWidth] = useState(1)
    const arrowRef = useRef<SVGSVGElement>(null)

    // get the css value for the tip size and divide it by 2 for this arrow implementation
    useLayoutEffect(() => {
        if (arrowRef.current) {
            let spectrumTipWidth = window
                .getComputedStyle(arrowRef.current)
                .getPropertyValue('--spectrum-popover-tip-size')
            if (spectrumTipWidth !== '') {
                setSize(parseInt(spectrumTipWidth, 10) / 2)
            }

            let spectrumBorderWidth = window
                .getComputedStyle(arrowRef.current)
                .getPropertyValue('--spectrum-popover-tip-borderWidth')
            if (spectrumBorderWidth !== '') {
                setBorderWidth(parseInt(spectrumBorderWidth, 10))
            }
        }
    }, [])

    return { size, borderWidth, arrowRef }
}

/*{(!isNonModal || enableBothDismissButtons) && <DismissButton onDismiss={onDismissButtonPress} />}
{children}
{hideArrow ? null : (
    <Arrow
        arrowProps={arrowProps}
        isLandscape={arrowPlacement[placement] === 'bottom'}
        arrowRef={arrowRef}
        primary={primary}
        secondary={secondary}
        borderDiagonal={borderDiagonal}
    />
)}
<DismissButton onDismiss={onDismissButtonPress} />
*/

const _Popover = forwardRef(Popover)
export { _Popover as Popover }
