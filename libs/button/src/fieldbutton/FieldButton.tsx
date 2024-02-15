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

import React, { RefObject } from 'react'
import { useHover, mergeProps, FocusRing } from 'react-aria'
import { useButton } from '@react-aria/button'
import { FieldButtonProps } from './FieldButton.types'
import { useFocusableRef, FocusableRef } from '../focusableRef'
import { ControlFillX, ControlStrokeX } from '@meshx-org/mxui-primitives'
import { Text } from '@meshx-org/mxui-text'
import styled from 'styled-components'
import { ControlState } from '@meshx-org/mxui-core'

const Button = styled.button`
    position: relative;
    display: flex;
    align-items: center;

    border: none;
    background: transparent;

    cursor: pointer;
    width: 100%;
    height: 32px;

    &[data-state='disabled'] {
        pointer-events: none;
        cursor: not-allowed !important;
    }

    &[data-state='pressed'] .buttonContent {
        opacity: 0.5;
    }
`

const ButtonContent = styled.div`
    position: relative;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 12px;
    column-gap: 6px;

    &[data-icon-only='true'] {
        padding: 0px !important;
        width: 32px;
    }

    *[data-theme='light'] &[data-variant='accent'],
    *[data-theme='light'] &[data-variant='danger'],
    *[data-theme='light'] &[data-variant='warning'] {
        --theme-text-primary: white !important;
    }

    span {
        display: flex;
        color: var(--theme-text-primary);
    }

    *[data-theme='dark'] &[data-variant='accent'] {
        --theme-text-primary: rgb(142, 208, 255) !important;
    }

    *[data-theme='dark'] &[data-variant='danger'] {
        --theme-text-primary: rgb(238, 159, 159) !important;
    }

    *[data-theme='dark'] &[data-variant='warning'] {
        --theme-text-primary: rgb(237, 202, 146) !important;
    }
`

/** @private */
function FieldButton(props: FieldButtonProps, ref: FocusableRef<HTMLButtonElement>) {
    // props = useSlotProps(props, 'button')
    const { isQuiet, isDisabled, validationState, isInvalid, children, autoFocus, isActive, focusRingClass } = props

    const domRef = useFocusableRef(ref) as RefObject<HTMLButtonElement>
    const { buttonProps, isPressed } = useButton(props, domRef)
    const { hoverProps, isHovered } = useHover({ isDisabled })
    //const { styleProps } = useStyleProps(otherProps)

    return (
        <FocusRing /*focusRingClass={classNames(styles, 'focus-ring', focusRingClass)} */ autoFocus={autoFocus}>
            <Button
                {...mergeProps(buttonProps, hoverProps)}
                ref={domRef}
                data-active={isActive || isPressed}
                data-disabled={isDisabled}
                data-hovered={isHovered}
                data-invalid={isInvalid || validationState === 'invalid'}
                //className={classNames(
                //    styles,
                //    'spectrum-FieldButton',
                //    {
                //        'spectrum-FieldButton--quiet': isQuiet,
                //
                //        'is-disabled': isDisabled,
                //        'spectrum-FieldButton--invalid': isInvalid || validationState === 'invalid',
                //        'is-hovered': isHovered
                //    },
                //    styleProps.className
                //)}
            >
                <ButtonContent data-variant="default" data-icon-only="false">
                    {children && (
                        <Text
                            as="span"
                            variant="body"
                            selectable={false}
                            color={isDisabled ? 'text.disabled' : 'text.primary'}
                            children={children}
                        />
                    )}
                </ButtonContent>
                <ControlStrokeX borderRadius={5.5} data-state={ControlState.Rest} />
                <ControlFillX variant="default" borderRadius={6} data-state={ControlState.Rest} />
            </Button>
        </FocusRing>
    )
}

const _FieldButton = React.forwardRef(FieldButton)
export { _FieldButton as FieldButton }
