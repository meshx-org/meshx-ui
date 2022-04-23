import React, { ChangeEventHandler, useCallback, useState, useEffect } from 'react'
import { useTheme } from '../../../provider/ThemeProvider'
import { useControlState } from '../../../hooks/useControlState'
import styles from './ToggleSwitch.module.css'
import { ToggleSwitchProps } from './ToggleSwitch.types'

export function ToggleSwitch(props: ToggleSwitchProps) {
    const { defaultChecked, checked, onChange, disabled } = props

    const theme = useTheme()
    const { handlers, state } = useControlState<HTMLLabelElement>(disabled)
    const [checkedInternal, setCheckedInternal] = useState(defaultChecked)

    useEffect(() => {
        setCheckedInternal(checked)
        return () => {}
    }, [checked])

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
        <label className={styles.toggleSwitch} {...handlers}>
            <div data-theme={theme} data-state={state} className={styles.switch}>
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
