import React, { useMemo } from 'react'
import styles from './Elevation.module.css'
import { useTheme } from '../../../provider/ThemeProvider'
import { ControlState } from '../../../interfaces/control'
import { ElevationProps } from './Elevation.types'

let lastId = 0

function createId(prefix = 'elevation') {
    lastId += 1
    return `${prefix}${lastId}`
}

function TextControlElevation({ children, state, focused }: ElevationProps) {
    const theme = useTheme()
    const uniqueId = useMemo(createId, [])

    const lineHeight = focused ? '2' : '1'
    const restFill = theme === 'dark' ? ' rgba(255, 255, 255, 0.5442)' : 'rgba(0, 0, 0, 0.45)'
    const lineFill = focused ? '#0396FF' : restFill

    return (
        <>
            <svg overflow="visible" className={styles.elevation} fill="transparent" aria-hidden="true" tabIndex={-1}>
                <rect
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    x="0.5px"
                    y="0.5px"
                    stroke={`url(#${theme}-${uniqueId})`}
                    rx="4.5px"
                />
                <rect
                    className={styles.line}
                    clipPath={`url(#clip-${uniqueId})`}
                    width="100%"
                    height={`${lineHeight}px`}
                    x="0px"
                    y={`calc(100% - ${lineHeight}px)`}
                    fill={lineFill}
                />
                <defs>
                    <clipPath id={`clip-${uniqueId}`}>
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
                    <linearGradient id={`light-${uniqueId}`} gradientTransform="rotate(90)">
                        <stop offset="0" stopColor="rgba(0, 0, 0, 0.06)" />
                        <stop offset="1" stopColor="rgba(0, 0, 0, 0.06)" />
                    </linearGradient>
                    <linearGradient id={`dark-${uniqueId}`} gradientTransform="rotate(90)">
                        <stop offset="0" stopColor="#FFF" stopOpacity="0.08" />
                        <stop offset="1" stopColor="#FFF" stopOpacity="0.08" />
                    </linearGradient>
                </defs>
            </svg>
            {children}
        </>
    )
}

function ControlElevation({ children, state }: ElevationProps) {
    const theme = useTheme()
    const uniqueId = useMemo(createId, [])

    const strokeMemoized = useMemo(() => {
        let stroke = `url(#${theme}-${uniqueId})`

        if (theme === 'dark') {
            if (state === ControlState.Disabled || state === ControlState.Pressed) {
                stroke = 'rgba(255, 255, 255, 0.07)'
            }
        } else if (theme === 'light') {
            if (state === ControlState.Disabled || state === ControlState.Pressed) {
                stroke = 'rgba(0, 0, 0, 0.06)'
            }
        }

        return stroke
    }, [state, theme])

    return (
        <>
            <svg overflow="visible" className={styles.elevation} fill="transparent" aria-hidden="true" tabIndex={-1}>
                <rect
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    x="0.5px"
                    y="0.5px"
                    stroke={strokeMemoized}
                    rx="4.3px"
                />
                <defs>
                    <linearGradient id={`light-${uniqueId}`} gradientTransform="rotate(90)">
                        <stop offset="0.85" stopColor="rgba(0, 0, 0, 0.06)" />
                        <stop offset="1" stopColor="rgba(0, 0, 0, 0.16)" />
                    </linearGradient>
                    <linearGradient id={`dark-${uniqueId}`} gradientTransform="rotate(90)">
                        <stop offset="0" stopColor="#FFF" stopOpacity="0.093" />
                        <stop offset="0.15" stopColor="#FFF" stopOpacity="0.0698" />
                    </linearGradient>
                </defs>
            </svg>
            {children}
        </>
    )
}

export { ControlElevation, TextControlElevation }
