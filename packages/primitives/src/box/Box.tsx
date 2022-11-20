import React from "react"
import styled from 'styled-components'
import { space, color, layout, flexbox, border, position, background } from 'styled-system'
import { BoxProps } from './Box.types'

const BoxBase = styled.div`
    ${space}
    ${color}
    ${layout}
    ${flexbox}
    ${border}
    ${position}
    ${background}
`

export function Box({ children, ...props}: BoxProps) {
    return <BoxBase {...props as any} >{children}</BoxBase>
}