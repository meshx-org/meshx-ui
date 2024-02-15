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

import AlertSmall from '@spectrum-icons/ui/AlertSmall'
import InfoSmall from '@spectrum-icons/ui/InfoSmall'
import SuccessSmall from '@spectrum-icons/ui/SuccessSmall'

import React, { RefObject, useContext, useImperativeHandle, useRef } from 'react'
import { StyleProps, TooltipContext } from './context'

import { TooltipProps } from './Tooltip.types'
import styled from 'styled-components'
import clsx from 'clsx'

import {
    mergeProps,
    OverlayContainer,
    PlacementAxis,
    PositionProps,
    useOverlayPosition,
    useTooltip,
    useTooltipTrigger
} from 'react-aria'

let iconMap = {
    neutral: () => null,
    info: InfoSmall,
    positive: SuccessSmall,
    negative: AlertSmall
}

const StyledTooltip = styled.div`
    --spectrum-global-animation-duration-100: 130ms;
    --spectrum-tooltip-background-color: var(--theme-acrylic-default);
    --spectrum-tooltip-padding-top: 3px;
    --spectrum-tooltip-padding-x: 8px;
    --spectrum-border-radius: 4px;
    --spectrum-tooltip-text-size: 12px;
    --spectrum-border-color: var(--theme-stroke-card);

    --spectrum-tooltip-negative-background-color: var(--spectrum-negative-background-color-default);
    --spectrum-tooltip-positive-background-color: var(--spectrum-positive-background-color-default);
    --spectrum-tooltip-info-background-color: var(--spectrum-informative-background-color-default);

    visibility: hidden;
    backdrop-filter: blur(10px);

    opacity: 0;

    transition: transform var(--spectrum-global-animation-duration-100) ease-in-out,
        opacity var(--spectrum-global-animation-duration-100) ease-in-out,
        visibility 0ms linear var(--spectrum-global-animation-duration-100);

    pointer-events: none;

    &.is-open {
        visibility: visible;
        /* In Edge (pre chromium), a stacking context is formed for opacity less then 1, and then its removed for 1.
     It causes a rendering flicker that is visible when css transition is applied. */
        opacity: 0.9999;
        transition-delay: 0ms;
        pointer-events: auto;
    }

    background-color: var(--spectrum-tooltip-background-color);
    color: var(--spectrum-tooltip-text-color);
    box-shadow: 0 0 0 1px var(--spectrum-border-color) inset;

    /* use drop-shadow instead of box-shadow so it follows the arrow shape */
    filter: var(--spectrum-tooltip-dropshadow);
    will-change: filter;

    display: inline-flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    vertical-align: top;

    inline-size: auto;
    padding: var(--spectrum-tooltip-padding-top) var(--spectrum-tooltip-padding-x);
    border-radius: var(--spectrum-border-radius);
    min-block-size: var(--spectrum-tooltip-min-height);

    font-size: var(--spectrum-tooltip-text-size);
    font-weight: var(--spectrum-tooltip-text-font-weight);
    line-height: var(--spectrum-tooltip-text-line-height);
    word-break: break-word;
    -webkit-font-smoothing: antialiased;

    & {
        cursor: default;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    p {
        margin: 0;
    }

    &[data-placement='right'],
    &[data-placement='left'] {
        top: 50%;
        .spectrum-Tooltip-tip {
            top: 50%;
        }
    }

    &[data-placement='right'] {
        left: 100%;
        transform: translate(0, -50%);
    }

    &[data-placement='left'] {
        transform: translate(-100%, -50%);
    }

    &[data-placement='bottom'],
    &[data-placement='top'] {
        left: 50%;
        .spectrum-Tooltip-tip {
            left: 50%;
        }
    }

    &[data-placement='bottom'] {
        top: 100%;
        transform: translate(-50%, calc(var(--spectrum-tooltip-tip-margin) * -1));
    }

    &[data-placement='top'] {
        transform: translate(-50%, var(--spectrum-tooltip-tip-margin));
    }

    --spectrum-overlay-positive-transform-distance: 8px;
    --spectrum-overlay-negative-transform-distance: -8px;

    &.is-open--right {
        transform: translateX(var(--spectrum-overlay-positive-transform-distance));
    }

    &.is-open--left {
        transform: translateX(var(--spectrum-overlay-negative-transform-distance));
    }

    &.is-open--top {
        /*
        Edge does not support combination of translate, calc and var.
        New var equal to negative calculation result is added instead.
        TODO: for Chromium Edge return to
        transform: translateX(calc(var(--spectrum-global-dimension-size-75) * -1));
        */
        transform: translateY(var(--spectrum-overlay-negative-transform-distance));
    }

    &.is-open--bottom {
        transform: translateY(var(--spectrum-overlay-positive-transform-distance));
    }
`

function useStyleProps<T extends StyleProps>(props: T) {
    return {
        styleProps: { style: props.UNSAFE_style }
    }
}

export function createDOMRef<T extends HTMLElement = HTMLElement>(ref: RefObject<T>): any {
    return {
        UNSAFE_getDOMNode() {
            return ref.current
        }
    }
}

function Tooltip(props: TooltipProps, ref: any) {
    let { ref: overlayRef, arrowProps, state, arrowRef, ...tooltipProviderProps } = useContext(TooltipContext)
    const defaultRef = useRef<HTMLDivElement>(null)
    overlayRef = overlayRef || defaultRef

    props = mergeProps(props, tooltipProviderProps)
    const { variant = 'neutral', placement = 'top', isOpen, showIcon, ...otherProps } = props

    const { styleProps } = { styleProps: { style: (otherProps as any).UNSAFE_style } }
    const { tooltipProps } = useTooltip(props, state)

    // Sync ref with overlayRef from context.
    useImperativeHandle(ref, () => createDOMRef<HTMLDivElement>(overlayRef!))

    const Icon = iconMap[variant]

    return (
        <StyledTooltip
            {...styleProps}
            {...tooltipProps}
            data-placement={placement}
            data-is-open={isOpen}
            className={clsx({
                'is-open': isOpen,
                [`is-open--${placement}`]: isOpen
            })}
            ref={overlayRef}
        >
            {showIcon && variant !== 'neutral' && (
                <Icon /*UNSAFE_className={classNames(styles, 'spectrum-Tooltip-typeIcon')}*/ aria-hidden />
            )}
            {props.children && (
                <span /*className={classNames(styles, 'spectrum-Tooltip-label')}*/>{props.children}</span>
            )}
            <span {...arrowProps} ref={arrowRef} /*className={classNames(styles, 'spectrum-Tooltip-tip')}*/ />
        </StyledTooltip>
    )
}

/**
 * Display container for Tooltip content. Has a directional arrow dependent on its placement.
 */
const _Tooltip = React.forwardRef(Tooltip)
export { _Tooltip as Tooltip }
