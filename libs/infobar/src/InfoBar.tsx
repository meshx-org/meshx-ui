import React, { ForwardedRef, useEffect, useRef } from 'react'
import { InfoBarProps } from './InfoBar.types'
import styled from 'styled-components'
import { CardSurface } from '@meshx-org/mxui-primitives'
import { Text } from '@meshx-org/mxui-text'
import { Badge } from '@meshx-org/mxui-badge'
import { FocusRing } from 'react-aria'

const BadgeStyled = styled.div``

const StyledCardSurface = styled(CardSurface)`
    width: fit-content;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    [data-theme='dark'] & {
        color: rgb(0, 0, 0);
    }

    [data-theme='light'] & {
        color: rgb(255, 255, 255);
    }

    // ---

    [data-theme='dark'] &[data-variant='info'] {
        border: 1px solid #8a8a8a;
        background: #8a8a8a;
    }

    [data-theme='dark'] &[data-variant='default'] {
        border: solid 1px #60cdff;
        background: #60cdff;
    }

    [data-theme='dark'] &[data-variant='help'] {
        border: 1px solid #8a8a8a;
        background: #8a8a8a;
    }

    [data-theme='dark'] &[data-variant='warning'] {
        border: 1px solid #fce100;
        background: #fce100;
    }

    [data-theme='dark'] &[data-variant='danger'] {
        border: 1px solid #ff99a4;
        background: #ff99a4;
    }

    [data-theme='dark'] &[data-variant='success'] {
        border: 1px solid #6ccb5f;
        background: #6ccb5f;
    }

    // ----

    [data-theme='light'] &[data-variant='info'] {
        border: 1px solid #8a8a8a;
        background: #8a8a8a;
    }

    [data-theme='light'] &[data-variant='default'] {
        border: solid 1px #005fb7;
        background: #005fb7;
    }

    [data-theme='light'] &[data-variant='help'] {
        border: 1px solid #8a8a8a;
        background: #8a8a8a;
    }

    [data-theme='light'] &[data-variant='warning'] {
        border: 1px solid #9d5d00;
        background: #9d5d00;
    }

    [data-theme='light'] &[data-variant='danger'] {
        border: 1px solid #c42b1c;
        background: #c42b1c;
    }

    [data-theme='light'] &[data-variant='success'] {
        border: 1px solid #0f7b0f;
        background: #0f7b0f;
    }
`

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


function useDOMRef(ref: any) {
    return ref
}

function InfoBar(props: InfoBarProps, ref: ForwardedRef<HTMLDivElement>) {
    const { children, autoFocus, variant = 'default' } = props
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
                borderRadius={6}
                variant="well"
                px="15px"
                py="13px"
                as="div"
                style={{ display: 'flex', alignItems: 'center', width: 'fit-content', gap: '13px' }}
            >
                <Badge variant="info" />
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
 * A Well is a content container that displays non-editable content separate from other content on the screen.
 * Often this is used to display preformatted text, such as code/markup examples on a documentation page.
 */
const _InfoBar = React.forwardRef(InfoBar)
export { _InfoBar as InfoBar }
