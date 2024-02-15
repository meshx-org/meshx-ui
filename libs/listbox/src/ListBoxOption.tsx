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
import { FocusRing, useOption, useHover, mergeProps, AriaOptionProps } from 'react-aria'
import { isFocusVisible } from '@react-aria/interactions'

import React, { useContext, useRef } from 'react'
import { ListBoxContext } from './ListBoxContext'
import { Node } from '@meshx/mxui-core'
import { Text } from '@meshx/mxui-text'
import { CheckmarkSmall } from '@meshx/mxui-icons'
import styled from 'styled-components'
// import { Grid } from '@react-spectrum/layout'

type OptionProps<T, C extends React.ElementType> = {
    item: Node<T>
    shouldSelectOnPressUp?: boolean
    shouldFocusOnHover?: boolean
    shouldUseVirtualFocus?: boolean
    as?: C
} & React.ComponentPropsWithoutRef<C>

const StyledCheckmarkSmall = styled(CheckmarkSmall)`
    display: none;
    align-self: flex-start;
    justify-self: end;
    grid-area: checkmark;
`

const StyledOption = styled.div`
    &:focus {
        outline: none;
    }

    cursor: default;
    position: relative;
    display: block;

    box-sizing: border-box;

    margin: 0;

    &[data-disabled='true'] {
        cursor: not-allowed;
    }

    &[href] {
        cursor: pointer;
    }

    &:focus {
        background: var(--theme-subtle-default);
    }

    &[data-selected='true'] {
        background: var(--theme-accent-default);
        color: var(--theme-text-inverted);
    }

    display: grid;
    grid-template-columns: 2px auto 1fr auto auto auto auto 2px;
    /*
        Renamed from padding-y to padding-height to fix docs issue where fallback var replaced this value
        (due to old spectrum-css postcss-custom-properties-custom-mapping plugin).
        */
    grid-template-rows: 2px 1fr auto 2px;

    grid-template-areas:
        '. .    .            .         .     .         .        .'
        '. icon text         checkmark end   keyboard  chevron  .'
        '. icon description  checkmark end   keyboard  chevron  .'
        '. .    .            .         .     .         .        .';
`

/** @private */
export function ListBoxOption<T, C extends React.ElementType = 'div'>(props: OptionProps<T, C>) {
    const { item, shouldSelectOnPressUp, shouldFocusOnHover, shouldUseVirtualFocus } = props

    const { rendered, key } = item
    const state = useContext(ListBoxContext)

    if (!state) {
        throw new Error('ListBoxOption must be under a ListBoxContext')
    }

    const ref = useRef<any>()
    const { optionProps, labelProps, descriptionProps, isSelected, isDisabled, isFocused } = useOption(
        {
            'aria-label': item['aria-label'],
            key,
            shouldSelectOnPressUp,
            shouldFocusOnHover,
            isVirtualized: true,
            shouldUseVirtualFocus
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
        <FocusRing /*focusRingClass={classNames(styles, 'focus-ring')} */>
            <StyledOption
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
                <span style={{ gridArea: 'text' }}>{contents}</span>
                {isSelected && (
                    <StyledCheckmarkSmall
                    //slot="checkmark"
                    // UNSAFE_className={classNames(styles, 'spectrum-Menu-checkmark')}
                    />
                )}
            </StyledOption>
        </FocusRing>
    )
}
