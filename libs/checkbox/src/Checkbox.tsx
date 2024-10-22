import React, { forwardRef, useContext, useRef } from 'react'
import { FocusableRef, useTheme } from '@meshx/mxui-core'
import type { CheckboxProps } from './Checkbox.types'
import { useToggleState } from 'react-stately'
import { useCheckbox, useCheckboxGroupItem, useHover, FocusRing } from 'react-aria'
import { CheckboxGroupContext } from './context'
import { CheckmarkSmall } from '@meshx/mxui-icons'
import styles from './Checkbox.module.scss'
import clsx from 'clsx'

function Checkbox(props: CheckboxProps, ref: FocusableRef<HTMLLabelElement>) {
    const originalProps = props
    const { isIndeterminate = false, autoFocus, children, ...otherProps } = props

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
                  isInvalid: originalProps.isInvalid
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
            className={clsx(
                // styles,
                styles.Checkbox,
                {
                    'is-checked': inputProps.checked,
                    'is-indeterminate': isIndeterminate,
                    //'spectrum-Checkbox--quiet': !isEmphasized,
                    'is-invalid': isInvalid,
                    'is-disabled': isDisabled,
                    'is-hovered': isHovered
                },
                //styleProps.className
            )}
        >
            <FocusRing /*</label>focusRingClass={classNames(styles, 'focus-ring')}*/ autoFocus={autoFocus}>
                <input
                    className={styles.CheckboxInput}
                    {...inputProps}
                    ref={inputRef} /*className={classNames(styles, 'spectrum-Checkbox-input')}*/
                />
            </FocusRing>
            <div
                className={styles.Checkbox}
                data-hovered={isHovered}
                data-pressed={isPressed}
                data-checked={inputProps.checked} /*className={classNames(styles, 'spectrum-Checkbox-box')}*/
            >
                {markIcon}
            </div>
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
