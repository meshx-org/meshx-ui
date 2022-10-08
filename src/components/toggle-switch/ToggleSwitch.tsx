import React, { ChangeEventHandler, useCallback, useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeProvider'
import { useControlState } from '../../hooks/useControlState'
import styles from './ToggleSwitch.module.css'
import { ToggleSwitchProps } from './ToggleSwitch.types'

export function ToggleSwitch(props: ToggleSwitchProps) {
    const { defaultValue, value, onChange, disabled } = props

    const theme = useTheme()
    const { handlers, state } = useControlState<HTMLLabelElement>(disabled)
    const [checkedInternal, setCheckedInternal] = useState(defaultValue)

    useEffect(() => {
        setCheckedInternal(value)
        return () => {}
    }, [value])

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            setCheckedInternal(event.target.checked)
            if (onChange) {
                onChange(event.target.checked)
            }
        },
        [onChange]
    )

    return (
        <label data-theme={theme} data-state={state} className={styles.toggleSwitch} {...handlers}>
            <div className={styles.switch}>
                <input
                    autoFocus
                    disabled={disabled}
                    checked={checkedInternal}
                    onChange={handleChange}
                    title="Toggle Switch"
                    type="checkbox"
                />
                <div className={styles.slider} />
                <div className={styles.sliderBorder} />
                <div className={styles.thumb} />
            </div>
            {checkedInternal ? 'On' : 'Off'}
        </label>
    )
}
