import { CSSProperties, HTMLAttributes } from 'react'

export type StyleProps = {
    UNSAFE_className?: string
    UNSAFE_style?: CSSProperties
}

function convertStyleProps(props: any) {
    const style: CSSProperties = {
        width: props.width
    }

    return style
}

export function useStyleProps<T extends StyleProps>(
    props: T
    //handlers: StyleHandlers = baseStyleProps,
    //options: StylePropsOptions = {}
) {
    const { UNSAFE_className, UNSAFE_style, ...otherProps } = props

    const styles = convertStyleProps(props)
    const style = { ...UNSAFE_style, ...styles }

    const styleProps: HTMLAttributes<HTMLElement> = {
        style,
        className: UNSAFE_className
    }

    return {
        styleProps
    }
}
