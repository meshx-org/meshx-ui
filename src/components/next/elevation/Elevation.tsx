import React, { useMemo } from 'react'
import { useTheme } from '../../../provider/ThemeProvider'
import { ControlState } from '../../../interfaces/control'
import { ElevationProps } from './Elevation.types'
import styles from './Elevation.module.css'

let lastId = 0

function createId(prefix = 'elevation') {
    lastId += 1
    return `${prefix}${lastId}`
}

function Elevation({ children, state }: ElevationProps) {
    const theme = useTheme()
    const uniqueId = useMemo(createId, [])
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

    return (
        <>
            <svg overflow="visible" className={styles.elevation} fill="transparent" aria-hidden="true" tabIndex={-1}>
                <rect
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    x="0.5px"
                    y="0.5px"
                    stroke={stroke}
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

export default Elevation
