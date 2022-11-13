import React from 'react'
import { Text as RNText } from 'react-native'
import { variant, compose, space, color, typography } from 'styled-system'
import { HeadingProps } from './Text.types'
import { headingVariants as variants } from './variants'

const propStyles = compose(color, space, typography)

export function Heading(props: HeadingProps) {
    const { selectable = false, children, variant = "heading1", ...restProps } = props

    return <RNText selectable={selectable}>{children}</RNText>
}
