import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BrandingProps } from './Branding.types'
import styles from './Branding.module.css'
import { useTheme, useThemeValues } from '../../../provider/ThemeProvider'
import { TextBlock } from '../text-block/TextBlock'

export function Branding({ title, logo, subtitle, to }: BrandingProps) {
    const theme = useTheme()
    const { primaryTextColor } = useThemeValues()

    const wrappedContent = (
        <>
            <img className={styles.image} src={logo} alt={title} />
            <View style={{ flexDirection: 'row' }}>
                <TextBlock variant="body" children={title} />
                {subtitle && (
                    <View
                        style={{
                            borderLeftWidth: StyleSheet.hairlineWidth,
                            borderColor: primaryTextColor,
                            opacity: 0.5,
                            paddingLeft: 8,
                            marginLeft: 8
                        }}
                    >
                        <TextBlock children={subtitle} />
                    </View>
                )}
            </View>
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
