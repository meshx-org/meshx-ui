import React, { useMemo } from 'react'
import styles from './Stroke.module.css'
import { useTheme } from '../../context/ThemeProvider'
import { ControlState } from '../../common/control'
import { ControlStrokeProps } from './Stroke.types'

let lastId = 0

function createId() {
    lastId += 1
    return lastId
}

function url(id: string) {
    return `url(#${id})`
}

function TextControlStroke({ children, state, focused = false }: ControlStrokeProps) {
    const theme = useTheme()
    const uniqueId = useMemo(createId, [])
    const clipId = `clip-${uniqueId}`
    const lightGradId = `stroke-${uniqueId}-light`
    const darkGradId = `stroke-${uniqueId}-dark`

    const definitions = useMemo(
        () => (
            <defs>
                <clipPath id={clipId}>
                    <rect
                        width="calc(100% - 0px)"
                        height="100%"
                        x="0px"
                        y="0px"
                        fill="black"
                        strokeWidth={2}
                        rx="4.5px"
                    />
                </clipPath>
                <linearGradient id={lightGradId} gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="rgba(0, 0, 0, 0.06)" />
                    <stop offset="1" stopColor="rgba(0, 0, 0, 0.06)" />
                </linearGradient>
                <linearGradient id={darkGradId} gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="#FFF" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#FFF" stopOpacity="0.08" />
                </linearGradient>
            </defs>
        ),
        []
    )

    const restFill: string = theme === 'dark' ? ' rgba(255, 255, 255, 0.5442)' : 'rgba(0, 0, 0, 0.45)'
    const lineHeight: number = focused ? 2 : 1
    const lineFill: string = focused ? '#0396FF' : restFill

    return (
        <div className={styles.stroke}>
            <svg overflow="visible" fill="transparent" aria-hidden="true" tabIndex={-1}>
                {definitions}
                <rect
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    x="0.5px"
                    y="0.5px"
                    stroke={url(theme === 'dark' ? darkGradId : lightGradId)}
                    rx="4.5px"
                />
                <rect
                    className={styles.line}
                    clipPath={url(clipId)}
                    width="100%"
                    height={`${lineHeight}px`}
                    x="0px"
                    y={`calc(100% - ${lineHeight}px)`}
                    fill={lineFill}
                />
            </svg>
            {children}
        </div>
    )
}

function ControlStroke({ children, state, focused = false }: ControlStrokeProps) {
    const theme = useTheme()
    const uniqueId = useMemo(createId, [])
    const lightGradId = `stroke-${uniqueId}-light`
    const darkGradId = `stroke-${uniqueId}-dark`

    const definitions = useMemo(
        () => (
            <defs>
                <linearGradient id={lightGradId} gradientTransform="rotate(90)">
                    <stop offset="0.85" stopColor="rgba(0, 0, 0, 0.06)" />
                    <stop offset="1" stopColor="rgba(0, 0, 0, 0.16)" />
                </linearGradient>
                <linearGradient id={darkGradId} gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="#FFF" stopOpacity="0.093" />
                    <stop offset="0.15" stopColor="#FFF" stopOpacity="0.0698" />
                </linearGradient>
            </defs>
        ),
        []
    )

    let stroke = url(theme === 'dark' ? darkGradId : lightGradId)

    if (theme === 'dark') {
        if (state === ControlState.Disabled || state === ControlState.Pressed) {
            stroke = 'rgba(255, 255, 255, 0.07)'
        }
    } else if (theme === 'light') {
        if (state === ControlState.Disabled || state === ControlState.Pressed) {
            stroke = 'rgba(0, 0, 0, 0.06)'
        }
    }

    return (
        <div className={styles.stroke}>
            <svg overflow="visible" fill="transparent" aria-hidden="true" tabIndex={-1}>
                {definitions}
                <rect
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    x="0.5px"
                    y="0.5px"
                    stroke={stroke}
                    rx="4.5px"
                />
            </svg>
            {children}
        </div>
    )
}

function CircleControlStroke({ children, state, focused = false }: ControlStrokeProps) {
    const theme = useTheme()
    const uniqueId = useMemo(createId, [])
    const lightGradId = `stroke-${uniqueId}-light`
    const darkGradId = `stroke-${uniqueId}-dark`

    const definitions = useMemo(
        () => (
            <defs>
                <linearGradient id={lightGradId} gradientTransform="rotate(90)">
                    <stop offset="0.5" stopColor="rgba(0, 0, 0, 0.06)" />
                    <stop offset="1" stopColor="rgba(0, 0, 0, 0.16)" />
                </linearGradient>
                <linearGradient id={darkGradId} gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="rgba(255, 255, 255, 0.09)" />
                    <stop offset="0.5" stopColor="rgba(255, 255, 255, 0.07)" />
                </linearGradient>
            </defs>
        ),
        []
    )

    let stroke = url(theme === 'dark' ? darkGradId : lightGradId)

    if (theme === 'dark') {
        if (state === ControlState.Disabled || state === ControlState.Pressed) {
            stroke = 'rgba(255, 255, 255, 0.07)'
        }
    } else if (theme === 'light') {
        if (state === ControlState.Disabled || state === ControlState.Pressed) {
            stroke = 'rgba(0, 0, 0, 0.06)'
        }
    }

    return (
        <div className={styles.stroke}>
            <svg overflow="visible" fill="transparent" aria-hidden="true" tabIndex={-1}>
                {definitions}
                <rect width="calc(100% - 1px)" height="calc(100% - 1px)" x="0.5px" y="0.5px" stroke={stroke} rx="50%" />
            </svg>
            {children}
        </div>
    )
}

export { ControlStroke, CircleControlStroke, TextControlStroke }