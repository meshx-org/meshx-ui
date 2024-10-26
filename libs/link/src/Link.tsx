import React from 'react'
import { LinkProps } from './Link.types'
import { sx } from '@meshx/mxui-core'
import styles from './Link.module.scss'

export function Link<C extends React.ElementType = 'a'>(props: LinkProps<C>) {
    const { children, as: Component = 'a', variant = 'primary', onClick, ...restProps } = props

    return (
        <Component className={styles.Link} css={sx(props)} role="link" {...restProps} data-variant={variant}>
            {children}
        </Component>
    )
}

Link.displayName = 'Link'
