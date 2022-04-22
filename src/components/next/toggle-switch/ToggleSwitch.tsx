import React from 'react'
import styles from './ToggleSwitch.module.css'
import { ToggleSwitchProps } from './ToggleSwitch.types'

export function ToggleSwitch(props: ToggleSwitchProps) {
    const { checked, onChange, defaultChecked } = props

    return (
        <label className={styles.toggleSwitch}>
            <input
                onChange={onChange && ((e) => onChange(e.target.checked))}
                defaultChecked={defaultChecked}
                type="checkbox"
            />
            <span className={styles.slider}>
                <div className={styles.sliderBorder}></div>
            </span>
            <div className={styles.thumb}></div>
        </label>
    )
}
