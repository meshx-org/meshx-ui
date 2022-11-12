import React from 'react'
import { ColorProps, SpaceProps, TypographyProps } from 'styled-system'
import { textVariants } from './variants'

export interface TextProps extends ColorProps, SpaceProps, TypographyProps {
    children?: React.ReactNode
    variant?: keyof typeof textVariants

    // ssTextSelectionEnabled?: string
    // selectionHighlightColor?: string
}
