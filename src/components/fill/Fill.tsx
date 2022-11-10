import React from 'react'
import { useTheme } from '../../context/ThemeProvider'
import { ControlFillProps, AcrilicFillProps } from './Fill.types'
import styles from './Fill.module.css'

export function TextControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return (
        <div data-state={state} data-theme={theme} className={`${styles.fill} ${styles.textControlFill}`}>
            {children}
        </div>
    )
}

export function ControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return (
        <div data-state={state} data-theme={theme} className={`${styles.fill} ${styles.controlFill}`}>
            {children}
        </div>
    )
}

export function AcrilicFill({ children }: AcrilicFillProps) {
    const theme = useTheme()

    return (
        <div data-theme={theme} className={`${styles.fill} ${styles.acrilicFill}`}>
            {children}
        </div>
    )
}
