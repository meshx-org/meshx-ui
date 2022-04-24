import React from 'react'
import { BrandingProps } from './Branding.types'
import styles from './Branding.module.css'
// import Link from 'next/link'

export function Branding({ title, logo, subtitle, to }: BrandingProps) {
    const wrappedBrand = (
        <div className={styles.branding}>
            <img className={styles.image} src={logo} alt={title} />
            <p className={styles.text}>
                <span>{title}</span> {subtitle && <div />} {subtitle && <span>{subtitle}</span>}
            </p>
        </div>
    )

    if (to) {
        return (
            <a className={styles.link} href={to}>
                {wrappedBrand}
            </a>
        )
    }

    return wrappedBrand
}
