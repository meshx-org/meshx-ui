import React from 'react'
import { SelectProps } from './Select.types'
import { ControlSurface } from '@meshx/mxui-primitives'
import { useControlState } from '@meshx/mxui-core'
import styles from './Select.module.scss'
import clsx from 'clsx'

const Icon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M14.9911 8.58117L12.7447 6.08166C12.3471 5.63921 11.6532 5.63911 11.2554 6.08143L9.0076 8.581"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M14.9911 15.418L12.7447 17.9175C12.3471 18.3599 11.6532 18.36 11.2554 17.9177L9.0076 15.4181"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

const defaultIcon = <Icon />

export function Select(props: SelectProps) {
    const {
        children,
        icon,
        iconRight = defaultIcon,
        apparance = 'default',
        disabled = false,
        as = 'div',
        ...otherProps
    } = props
    const { state, handlers } = useControlState<HTMLSelectElement>(disabled)

    return (
        <ControlSurface
            as={as}
            sx={{ borderRadius: 6 }}
            className={clsx(styles.Select, 'focusable')}
            state={state}
            {...otherProps}
            {...handlers}
        >
            <div className={styles.SelectContent}>
                {icon && <span className="left">{icon}</span>}
                <select
                    className={styles.SelectInput}
                    style={{ paddingLeft: icon ? 28 : undefined, paddingRight: iconRight ? 28 : undefined }}
                    //color={disabled ? 'text.disabled' : 'text.primary'}
                >
                    <option>System</option>
                    <option>Dark</option>
                    <option>Light</option>
                </select>
                {iconRight && <span className="right">{iconRight}</span>}
            </div>
        </ControlSurface>
    )
}
