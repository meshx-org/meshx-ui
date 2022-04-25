import React from 'react'
import { BrandingProps } from './Branding.types'
import styles from './Branding.module.css'
import { useTheme } from '../../../provider/ThemeProvider'
// import Link from 'next/link'

export function Branding({ title, logo, subtitle, to }: BrandingProps) {
    const theme = useTheme()

    const wrappedContent = (
        <>
            <img className={styles.image} src={logo} alt={title} />
            <p className={styles.text}>
                <span className={styles.title}>{title}</span> {subtitle && <div />} {subtitle && <span>{subtitle}</span>}
            </p>
        </>
    )

    if (to) {
        return (
            <a data-theme={theme} className={`${styles.branding} ${styles.link}`} href={to}>
                {wrappedContent}
            </a>
        )
    }

    return (
        <div data-theme={theme} className={styles.branding}>
            {wrappedContent}
        </div>
    )
}
