import { FlyoutShadowProps, CardShadowProps } from "./Shadow.types"
import { ControlState } from "@meshx-org/mxui-core"
import { opacity, borderRadius } from "styled-system"
import styled, { css, DefaultTheme } from "styled-components"

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

export function cardShadowState(theme: DefaultTheme, state: ControlState) {
    if(theme.name == "light") {
        switch (state) {
            case ControlState.Hovered: return "0 2px 4px 0 rgba(0 0 0 / 10%), 0 12px 24px rgb(0 0 0 / 10%)"
            case ControlState.Pressed: return "0 2px 4px 0 rgba(0 0 0 / 0%), 0 12px 24px rgb(0 0 0 / 0%)"
            default: return "0 2px 4px 0 rgba(0 0 0 / 4%), 0 12px 24px rgb(0 0 0 / 4%)"
        }
    }
    else {
        switch (state) {
            case ControlState.Hovered: return "0 2px 4px 0 rgba(0 0 0 / 20%), 0 12px 24px rgb(0 0 0 / 20%)"
            case ControlState.Pressed: return "0 2px 4px 0 rgba(0 0 0 / 0%), 0 12px 24px rgb(0 0 0 / 0%)"
            default: return "0 2px 4px 0 rgba(0 0 0 / 10%), 0 12px 24px rgb(0 0 0 / 10%)"
        }
    } 
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
    box-shadow: ${({ theme, state }) => cardShadowState(theme, state)};
`