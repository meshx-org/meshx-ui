import React from 'react'
import { DividerProps } from './Divider.types'
import styles from './Divider.module.scss'
import clsx from 'clsx'

export function Divider(props: DividerProps) {
    const { className, ...otherProps } = props
    return <div {...otherProps} className={clsx(styles.Divider)} />
}
