import React from 'react'
import { ColorProps, SpaceProps, TypographyProps } from 'styled-system'
import { textVariants } from '../../common/constants'

export interface TextBlockProps extends ColorProps, SpaceProps, TypographyProps {
    children?: React.ReactNode
    variant?: keyof typeof textVariants

    // ssTextSelectionEnabled?: string
    // selectionHighlightColor?: string
}
