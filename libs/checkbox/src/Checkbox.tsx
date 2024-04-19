import React, { forwardRef, useContext, useRef } from 'react'
import { FocusableRef, useTheme } from '@meshx/mxui-core'
import type { CheckboxProps } from './Checkbox.types'
import { useToggleState } from 'react-stately'
import { useCheckbox, useCheckboxGroupItem, useHover, FocusRing } from 'react-aria'
import { CheckboxGroupContext } from './context'
import styled from 'styled-components'
import { CheckmarkSmall } from "@meshx/mxui-icons"

const StyledCheckbox = styled.span`
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.02);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6);
    width: 1.143rem;
    height: 1.143rem;
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &[data-hovered='true'] {
        background: rgba(0, 0, 0, 0.06);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6);
    }

    &[data-pressed='true'] {
        background: rgba(0, 0, 0, 0.09) !important;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2) !important;
    }

    &[data-checked='true'] {
        background: var(--theme-accent-default);
        box-shadow: 0 0 0 1px var(--theme-accent-default);
    }
`

const StyledInput = styled.input`
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    width: 1px;
    white-space: nowrap;
`

function Checkbox(props: CheckboxProps, ref: FocusableRef<HTMLLabelElement>) {
    const originalProps = props
    const { isIndeterminate = false, autoFocus, children, ...otherProps } = props

    const state = useToggleState(props)
    const theme = useTheme()

    const inputRef = useRef<HTMLInputElement>(null)
    // const domRef = useFocusableRef(ref, inputRef);

    // Swap hooks depending on whether this checkbox is inside a CheckboxGroup.
    // This is a bit unorthodox. Typically, hooks cannot be called in a conditional,
    // but since the checkbox won't move in and out of a group, it should be safe.
    const groupState = useContext(CheckboxGroupContext)

    const { inputProps, isInvalid, isDisabled, isPressed } = groupState
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useCheckboxGroupItem(
              {
                  ...props,
                  // Value is optional for standalone checkboxes, but required for CheckboxGroup items;
                  // it's passed explicitly here to avoid typescript error (requires ignore).
                  // @ts-ignore
                  value: props.value,
                  // Only pass isRequired and validationState to react-aria if they came from
                  // the props for this individual checkbox, and not from the group via context.
                  isRequired: originalProps.isRequired,
                  // FIXME: remove validationState: originalProps.validationState,
                  isInvalid: originalProps.isInvalid,
              },
              groupState,
              inputRef
          )
        : // eslint-disable-next-line react-hooks/rules-of-hooks
          useCheckbox(props, useToggleState(props), inputRef)

    const { hoverProps, isHovered } = useHover({ isDisabled })

    if (groupState) {
        for (let key of ['isSelected', 'defaultSelected', 'isEmphasized']) {
            if ((originalProps as any)[key] != null) {
                console.warn(
                    `${key} is unsupported on individual <Checkbox> elements within a <CheckboxGroup>. Please apply these props to the group instead.`
                )
            }
        }

        if (props.value == null) {
            console.warn('A <Checkbox> element within a <CheckboxGroup> requires a `value` property.')
        }
    }

    const markIcon = isIndeterminate ? (
        <span>i</span> //<DashSmall UNSAFE_className={classNames(styles, 'spectrum-Checkbox-partialCheckmark')} />
    ) : (
        <CheckmarkSmall /> ///<CheckmarkSmall UNSAFE_className={classNames(styles, 'spectrum-Checkbox-checkmark')} />
    )

    return (
        <label
            //{...styleProps}
            {...hoverProps}
            data-disabled={isDisabled}
            data-hovered={isHovered}
            data-pressed={isPressed}
            data-invalid={isInvalid}
            data-checked={inputProps.checked}
            //ref={domRef}
            /*className={clsx(
                // styles,
                'spectrum-Checkbox',
                {
                    'is-checked': inputProps.checked,
                    'is-indeterminate': isIndeterminate,
                    'spectrum-Checkbox--quiet': !isEmphasized,
                    'is-invalid': isInvalid,
                    'is-disabled': isDisabled,
                    'is-hovered': isHovered
                },
                styleProps.className
            )}*/
        >
            <FocusRing /*</label>focusRingClass={classNames(styles, 'focus-ring')}*/ autoFocus={autoFocus}>
                <StyledInput
                    {...inputProps}
                    ref={inputRef} /*className={classNames(styles, 'spectrum-Checkbox-input')}*/
                />
            </FocusRing>
            <StyledCheckbox
                data-hovered={isHovered}
                data-pressed={isPressed}
                data-checked={inputProps.checked} /*className={classNames(styles, 'spectrum-Checkbox-box')}*/
            >
                {markIcon}
            </StyledCheckbox>
            {children && <span /*className={classNames(styles, 'spectrum-Checkbox-label')}*/>{children}</span>}
        </label>
    )
}

/**
 * Checkboxes allow users to select multiple items from a list of individual items,
 * or to mark one individual item as selected.
 */
const _Checkbox = forwardRef(Checkbox)
export { _Checkbox as Checkbox }
