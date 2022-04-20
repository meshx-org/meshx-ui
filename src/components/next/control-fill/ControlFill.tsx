import React from 'react'
import { useTheme } from '../../../provider/ThemeProvider'
import { ControlFillProps } from './ControlFill.types'
import styles from './ControlFill.module.css'

function ControlFill({ children, disabled }: ControlFillProps) {
    const theme = useTheme()

    return <div data-disabled={disabled} data-theme={theme} className={styles.controlFill}>{children}</div>
}

export default ControlFill
