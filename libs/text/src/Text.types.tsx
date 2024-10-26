import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { SxProp } from '@meshx/mxui-core'
import { textVariants, headingVariants } from './variants'

type BaseProps<C extends ElementType> = {
    children?: ReactNode

    /**
     * Lets the user select text, to use the native copy and paste functionality.
     * @default false
     */
    selectable?: boolean

    as?: C
} & ComponentPropsWithoutRef<C> &
    SxProp

export type TextProps<C extends React.ElementType> = {
    variant?: keyof typeof textVariants
} & BaseProps<C>

export type HeadingProps<C extends React.ElementType> = {
    variant?: keyof typeof headingVariants
} & BaseProps<C>
