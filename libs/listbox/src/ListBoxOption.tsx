/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// import CheckmarkMedium from '@spectrum-icons/ui/CheckmarkMedium'
import { FocusRing } from '@react-aria/focus'
import { useOption } from '@react-aria/listbox'
import { isFocusVisible, useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'

import React, { useContext, useRef } from 'react'
import { ListBoxContext } from './ListBoxContext'
import { Node } from '@meshx/mxui-core'
import { Text } from '@meshx/mxui-text'
import { CheckmarkSmall } from '@meshx/mxui-icons'
import clsx from 'clsx'
import styles from './ListBoxOption.module.scss'

type OptionProps<T, C extends React.ElementType> = {
    item: Node<T>
    shouldSelectOnPressUp?: boolean
    shouldFocusOnHover?: boolean
    shouldUseVirtualFocus?: boolean
    as?: C
} & React.ComponentPropsWithoutRef<C>

/** @private */
export function ListBoxOption<T, C extends React.ElementType = 'div'>(props: OptionProps<T, C>) {
    const { item } = props

    const { rendered, key } = item
    const Component = item.props.href ? 'a' : ('div' as any)

    const { state, shouldFocusOnHover, shouldUseVirtualFocus } = useContext(ListBoxContext)!

    if (!state) {
        throw new Error('ListBoxOption must be under a ListBoxContext')
    }

    const ref = useRef<any>()
    const { optionProps, labelProps, descriptionProps, isSelected, isDisabled, isFocused } = useOption(
        {
            'aria-label': item['aria-label'],
            key,
            isVirtualized: true
        },
        state,
        ref
    )

    const { hoverProps, isHovered } = useHover({
        ...props,
        isDisabled
    })

    const contents = typeof rendered === 'string' ? <Text>{rendered}</Text> : rendered

    const isKeyboardModality = isFocusVisible()

    return (
        <FocusRing focusRingClass={clsx('focus-ring')}>
            <Component className={styles.Option}
                {...mergeProps(optionProps, shouldFocusOnHover ? {} : hoverProps)}
                ref={ref}
                data-focused={shouldUseVirtualFocus && isFocused && isKeyboardModality}
                data-disabled={isDisabled}
                data-selected={isSelected}
                data-selectable={state.selectionManager.selectionMode !== 'none'}
                data-hovered={(isHovered && !shouldFocusOnHover) || (isFocused && !isKeyboardModality)}
                //</FocusRing>className={classNames(styles, 'spectrum-Menu-item', {
                //    // If using virtual focus, apply focused styles to the item when the user is interacting with keyboard modality
                //    'is-focused': shouldUseVirtualFocus && isFocused && isKeyboardModality,
                //    'is-disabled': isDisabled,
                //    'is-selected': isSelected,
                //    'is-selectable': state.selectionManager.selectionMode !== 'none',
                //    // When shouldFocusOnHover is false, apply hover styles both when hovered with the mouse.
                //    // Otherwise, apply hover styles when focused using non-keyboard modality.
                //    'is-hovered': (isHovered && !shouldFocusOnHover) || (isFocused && !isKeyboardModality)
                //})}
            >
                <div className={styles.ItemGrid}>
                    <span style={{ gridArea: 'text' }}>{contents}</span>
                    {isSelected && (
                        <CheckmarkSmall
                            className={styles.CheckmarkSmall}
                            style={{ gridArea: 'checkmark' }}
                            //slot="checkmark"
                            // UNSAFE_className={classNames(styles, 'spectrum-Menu-checkmark')}
                        />
                    )}
                </div>
            </Component>
        </FocusRing>
    )
}
