import React, { ForwardedRef, useEffect, useRef } from 'react'
import { InfoBarProps, InfoBarVariant } from './InfoBar.types'
import { CardSurface, CardSurfaceVariant } from '@meshx/mxui-primitives'
import { Text } from '@meshx/mxui-text'
import { Badge } from '@meshx/mxui-badge'
import { FocusRing } from 'react-aria'
import styles from './InfoBar.module.scss'

const ICON_ALTS = {
    negative: 'Error',
    notice: 'Warning',
    info: 'Information',
    positive: 'Success'
} as const

const ICONS = {
    info: 'info',
    positive: 'success',
    notice: 'help',
    negative: 'danger'
} as const

const SURFACE_MAPPING: Record<InfoBarVariant, CardSurfaceVariant> = {
    info: 'well',
    help: 'well',
    default: 'well',
    success: 'success',
    danger: 'danger',
    warning: 'warning'
} as const

function useDOMRef(ref: any) {
    return ref
}

function InfoBar(props: InfoBarProps, ref: ForwardedRef<HTMLDivElement>) {
    const { children, autoFocus, variant = 'help' } = props
    const domRef = useDOMRef(ref)

    /*const test = (icon?: InfoBarProps['icon'], intent?: Intent): MaybeElement => {
        // 1. no icon
        if (icon === null || icon === false) {
            return undefined
        }

        const Icon = icon

        const iconProps = { 'aria-hidden': true, tabIndex: -1 }

        // 2. icon specified by name or as a custom SVG element
        if (icon !== undefined) {
            return <Icon icon={icon} {...iconProps} />
        }

        // 3. icon specified by intent prop
        switch (intent) {
            //case Intent.DANGER:
            //    return <Error {...iconProps} />
            //case Intent.PRIMARY:
            //    return <InfoSign {...iconProps} />
            //case Intent.WARNING:
            //    return <WarningSign {...iconProps} />
            //case Intent.SUCCESS:
            //    return <Tick {...iconProps} />
            default:
                return undefined
        }
    }*/

    const autoFocusRef = useRef(props.autoFocus)
    useEffect(() => {
        if (autoFocusRef.current && domRef.current) {
            domRef.current.focus()
        }
        autoFocusRef.current = false
    }, [domRef])

    return (
        <FocusRing>
            <CardSurface
                sx={{
                    borderRadius: 6,
                    px: '15px',
                    py: '13px'
                }}
                variant={SURFACE_MAPPING[variant]}
                as="div"
                className={styles.InfoBar}
            >
                <Badge variant={variant} />
                <Text fontWeight={500} variant="body.semibold">
                    {props.title}
                </Text>
                <Text fontWeight={500} variant="body">
                    {props.description}
                </Text>
            </CardSurface>
        </FocusRing>
    )
}

/**
 * A InfoBar is a content container that displays non-editable content separate from other content on the screen.
 * Often this is used to display preformatted text, such as code/markup examples on a documentation page.
 */
const _InfoBar = React.forwardRef(InfoBar)
export { _InfoBar as InfoBar }
