import React from 'react'
import { ColorProps, SpaceProps, TypographyProps } from 'styled-system'
import { textVariants, headingVariants } from './variants'

interface BaseProps extends ColorProps, SpaceProps, TypographyProps {
    children?: React.ReactNode

    /** 
     * Lets the user select text, to use the native copy and paste functionality. 
     * @default false
     */
    selectable?: boolean

    // selectionHighlightColor?: string
}

export interface TextProps extends BaseProps {
    variant?: keyof typeof textVariants
}

export interface HeadingProps extends BaseProps { 
    variant?: keyof typeof headingVariants
}