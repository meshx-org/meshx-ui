import React from 'react'
import { system } from "styled-system"
import styled from "styled-components"
import { DividerProps } from "./Divider.types"

const dividerColor = system({
    dividerColor: {
        property: 'borderColor',
        scale: 'colors',
    },
})

const DividerBase = styled.div<DividerProps>`
    border-style: solid;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-top: 0px;
    border-left: 0px;;
    margin: 5px;

    ${dividerColor}
`

export function Divider(props: DividerProps) {
    return <DividerBase dividerColor="stroke.divider" {...props}/>
}