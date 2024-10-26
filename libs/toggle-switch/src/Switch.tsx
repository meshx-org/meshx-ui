import { useRef } from 'react'
import { Text } from '@meshx/mxui-text'
import type { SwitchProps } from './Switch.types'
import { useToggleState } from 'react-stately'
import { VisuallyHidden, useFocusRing, useSwitch, mergeProps, useHover } from 'react-aria'
import styles from './Switch.module.scss'
import { sx } from '@meshx/mxui-core'

export function Switch(props: SwitchProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const state = useToggleState(props)

    const { isFocused, isFocusVisible, focusProps } = useFocusRing()
    const { labelProps, inputProps, isSelected, isDisabled, isReadOnly, isPressed } = useSwitch(
        {
            ...props, // ...removeDataAttributes(props),
            // ReactNode type doesn't allow function children.
            children: typeof props.children === 'function' ? true : props.children
        },
        state,
        inputRef
    )

    const { hoverProps, isHovered } = useHover({
        ...props,
        isDisabled: props.isDisabled || props.isReadOnly
    })

    return (
        <label
            {...mergeProps(labelProps, hoverProps)}
            css={sx(props)}
            className={styles.SwitchWrapper}
            data-selected={isSelected || undefined}
            data-pressed={isPressed || undefined}
            data-hovered={isHovered || undefined}
            data-focused={isFocused || undefined}
            data-focus-visible={isFocusVisible || undefined}
            data-disabled={isDisabled || undefined}
            data-readonly={isReadOnly || undefined}
        >
            <div
                className={styles.Switch}
                data-disabled={isDisabled || undefined}
                data-pressed={isPressed || undefined}
            >
                <VisuallyHidden elementType="span">
                    <input {...inputProps} {...focusProps} ref={inputRef} />
                </VisuallyHidden>
                <div className={styles.Slider} data-selected={isSelected || undefined} />
                <div className={styles.SwitchStroke} data-selected={isSelected || undefined} />
                <div
                    className={styles.Thumb}
                    data-disabled={isDisabled}
                    data-hovered={isHovered || undefined}
                    data-pressed={isPressed || undefined}
                    data-selected={isSelected || undefined}
                />
            </div>
            <Text>{isSelected ? 'On' : 'Off'} </Text>
        </label>
    )
}
