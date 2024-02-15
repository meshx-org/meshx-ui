import React, { ForwardedRef } from 'react'
import styled from 'styled-components'
import { layout, margin, padding, PaddingProps, MarginProps, LayoutProps } from 'styled-system'

import { TextBoxProps } from './TextBox.types'
import { ControlState, useTheme } from '@meshx/mxui-core'
import { TextControlFillX, TextControlStrokeX } from '@meshx/mxui-primitives'

import { useControlledState } from '@react-stately/utils'
import { mergeProps, useFocusRing, useHover, usePress } from 'react-aria'

const TextBoxInput = styled.input<PaddingProps & { width?: any; height?: any; size?: any }>`
    ${padding}

    margin: 0;
    height: 32px;
    flex: 1;

    font-size: 14px;

    position: relative;
    z-index: 3;

    border: none;
    background: none;

    color: var(--theme-text-primary);
    font-family: var(--theme-font-default);

    &[data-state='disabled'] {
        color: var(--theme-text-disabled);
    }

    &::-webkit-input-placeholder,
    &::placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder {
        color: var(--theme-text-secondary);
    }
`

const Content = styled.div`
    width: 100%;

    position: relative;
    display: flex;
    align-items: center;

    span {
        display: flex;
        align-items: center;
        padding: 0 8px;
        font-size: 14px;
        line-height: 32px;
        color: var(--theme-text-secondary);
        background: var(--theme-control-disabled);
    }

    span.right {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        border-left: 1px solid var(--theme-stroke-divider);
    }

    span.left {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        border-right: 1px solid var(--theme-stroke-divider);
    }
`

const TextBoxWrapper = styled.div<LayoutProps & MarginProps>`
    ${layout}
    ${margin}

    position: relative;
    //width: fit-content;
    //height: 32px;
`

function filterHoverProps(props: TextBoxProps) {
    const { onHoverStart, onHoverChange, onHoverEnd, ...otherProps } = props
    return otherProps
}

function toString(val: unknown | null) {
    if (val == null) {
        return
    }

    return val.toString()
}

function TextBox(props: TextBoxProps, ref: ForwardedRef<HTMLInputElement>) {
    const { placeholder, label, labelRight, isReadonly = false, isDisabled = false, ...otherProps } = props

    const theme = useTheme()
    const { hoverProps, isHovered } = useHover(props)

    const [value, setValue] = useControlledState(
        toString(props.value),
        toString(props.defaultValue) || '',
        props.onChange
    )

    const { isFocused, isFocusVisible, focusProps } = useFocusRing({
        isTextInput: true,
        autoFocus: props.autoFocus
    })

    //  const isInvalid = !!props['aria-invalid'] && props['aria-invalid'] !== 'false'

    return (
        <TextBoxWrapper
            data-focused={isFocused || undefined}
            data-disabled={props.isDisabled || undefined}
            data-hovered={isHovered || undefined}
            // data-pressed={isPressed || undefined}
            data-focus-visible={isFocusVisible || undefined}
            // data-invalid={isInvalid || undefined}
        >
            <Content>
                {label && <span className="left">{label}</span>}

                <TextBoxInput
                    ref={ref}
                    px="8px"
                    role="textbox"
                    type="text"
                    placeholder={placeholder}
                    disabled={isDisabled}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...mergeProps(filterHoverProps(props), focusProps, hoverProps)}
                />

                <TextControlFillX borderRadius={5} data-theme={theme} data-focused={isFocused} />

                {labelRight && <span className="right">{labelRight}</span>}
            </Content>

            <TextControlStrokeX data-state={ControlState.Rest} borderRadius={5} focused={isFocused} />
        </TextBoxWrapper>
    )
}

/**
 * An input allows a user to input text.
 */
const _TextBox = /*#__PURE__*/ React.forwardRef(TextBox)
export { _TextBox as TextBox }
