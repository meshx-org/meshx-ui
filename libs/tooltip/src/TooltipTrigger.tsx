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

import React, { JSX, ReactElement, useRef, useState } from 'react'

import { Overlay } from '@meshx/mxui-overlays'
import { TooltipTriggerProps } from './Tooltip.types'
import { TooltipContext } from './context'
import { useTooltipTriggerState } from '@react-stately/tooltip'

import { FocusableProvider } from '@react-aria/focus'
import { useLayoutEffect } from '@react-aria/utils'

import { useOverlayPosition, useTooltipTrigger } from 'react-aria'

const DEFAULT_OFFSET = -1 // Offset needed to reach 4px/5px (med/large) distance between tooltip and trigger button
const DEFAULT_CROSS_OFFSET = 0

function TooltipTrigger(props: TooltipTriggerProps) {
    const {
        children,
        crossOffset = DEFAULT_CROSS_OFFSET,
        isDisabled,
        offset = DEFAULT_OFFSET,
        trigger: triggerAction
    } = props

    const [trigger, tooltip] = React.Children.toArray(children) as [ReactElement, ReactElement]
    const state = useTooltipTriggerState(props)

    const tooltipTriggerRef = useRef<HTMLElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const { triggerProps, tooltipProps } = useTooltipTrigger(
        {
            isDisabled,
            trigger: triggerAction
        },
        state,
        tooltipTriggerRef
    )

    const [borderRadius, setBorderRadius] = useState(0)
    useLayoutEffect(() => {
        if (overlayRef.current && state.isOpen) {
            const spectrumBorderRadius = window.getComputedStyle(overlayRef.current).borderRadius
            if (spectrumBorderRadius !== '') {
                setBorderRadius(parseInt(spectrumBorderRadius, 10))
            }
        }
    }, [state.isOpen, overlayRef])

    const arrowRef = useRef<HTMLElement>(null)
    const [arrowWidth, setArrowWidth] = useState(0)

    useLayoutEffect(() => {
        if (arrowRef.current && state.isOpen) {
            setArrowWidth(arrowRef.current.getBoundingClientRect().width)
        }
    }, [state.isOpen, arrowRef])

    const { overlayProps, arrowProps, placement } = useOverlayPosition({
        placement: props.placement || 'top',
        targetRef: tooltipTriggerRef,
        overlayRef,
        offset,
        crossOffset,
        isOpen: state.isOpen,
        shouldFlip: props.shouldFlip,
        containerPadding: props.containerPadding,
        arrowSize: arrowWidth,
        arrowBoundaryOffset: borderRadius
    })

    console.log(triggerProps, tooltipTriggerRef, overlayRef, props.placement || 'top', offset)

    return (
        <FocusableProvider {...triggerProps} ref={tooltipTriggerRef}>
            {trigger}
            <TooltipContext.Provider
                value={{
                    state,
                    placement,
                    ref: overlayRef,
                    UNSAFE_style: overlayProps.style,
                    arrowProps,
                    arrowRef: arrowRef,
                    ...tooltipProps
                }}
            >
                <Overlay ref={overlayRef} isOpen={state.isOpen} nodeRef={overlayRef}>
                    {tooltip}
                </Overlay>
            </TooltipContext.Provider>
        </FocusableProvider>
    )
}

// Support TooltipTrigger inside components using CollectionBuilder.
TooltipTrigger.getCollectionNode = function* (props: TooltipTriggerProps) {
    // Replaced the use of React.Childern.toArray because it mutates the key prop.
    let childArray: ReactElement[] = []

    React.Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) {
            childArray.push(child)
        }
    })

    let [trigger, tooltip] = childArray
    yield {
        element: trigger,
        wrapper: (element: React.ReactElement) => (
            <TooltipTrigger key={element.key} {...props}>
                {element}
                {tooltip}
            </TooltipTrigger>
        )
    }
}

/**
 * TooltipTrigger wraps around a trigger element and a Tooltip. It handles opening and closing
 * the Tooltip when the user hovers over or focuses the trigger, and positioning the Tooltip
 * relative to the trigger.
 */
// We don't want getCollectionNode to show up in the type definition
let _TooltipTrigger = TooltipTrigger as (props: TooltipTriggerProps) => JSX.Element
export { _TooltipTrigger as TooltipTrigger }
