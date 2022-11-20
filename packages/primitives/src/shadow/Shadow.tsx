import { FlyoutShadowProps, CardShadowProps } from "./Shadow.types"
import { opacity, borderRadius } from "styled-system"
import styled, { css } from "styled-components"

const shadowBase = css`
    position: absolute;
    background: transparent;
    top: 1px;
    bottom: 1px;
    right: 1px;
    left: 1px;
    z-index: 1;
`

function ariaHidden(props: any) {
    return { ...props, "aria-hidden": true }
}

export const FlyoutShadow = styled.div.attrs(ariaHidden)<FlyoutShadowProps>`
    ${shadowBase}
    ${opacity}
    ${borderRadius}
    box-shadow: 0 8px 16px 0 ${props =>props.theme.name === 'light' ? "rgba(0 0 0 / 14%)" : "rgba(0 0 0 / 26%)"};
`

export const CardShadow = styled.div.attrs(ariaHidden)<CardShadowProps>`
    ${shadowBase}
    ${opacity}
    ${borderRadius}
    box-shadow: 0 2px 4px 0 ${props =>props.theme.name === 'light' ? "rgba(0 0 0 / 4%)" : "rgba(0 0 0 / 13%)"};
`