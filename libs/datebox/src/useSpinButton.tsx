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

import { KeyboardEvent, MouseEvent, useCallback, useEffect, useRef } from 'react'
import { useGlobalListeners } from './useGlobalListeners'

function announce(textValue: string, type: 'assertive') {}

interface AriaButtonProps {}

type DOMAttributes = any
type InputBase = any
type RangeInputBase<T> = any
type Validation = any
type ValueBase<T> = any

export interface SpinButtonProps extends InputBase, Validation, ValueBase<number>, RangeInputBase<number> {
    textValue?: string
    onIncrement?: () => void
    onIncrementPage?: () => void
    onDecrement?: () => void
    onDecrementPage?: () => void
    onDecrementToMin?: () => void
    onIncrementToMax?: () => void
}

export interface SpinbuttonAria {
    spinButtonProps: DOMAttributes
    incrementButtonProps: AriaButtonProps
    decrementButtonProps: AriaButtonProps
}

export function useSpinButton(props: SpinButtonProps): SpinbuttonAria {
    const _async = useRef<number>()
    let {
        value,
        textValue,
        minValue,
        maxValue,
        isDisabled,
        isReadOnly,
        isRequired,
        onIncrement,
        onIncrementPage,
        onDecrement,
        onDecrementPage,
        onDecrementToMin,
        onIncrementToMax
    } = props

    const propsRef = useRef<SpinButtonProps>(props)
    propsRef.current = props

    const clearAsync = () => clearTimeout(_async.current)

    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
        return () => clearAsync()
    }, [])

    let onKeyDown = (e: KeyboardEvent<Element>) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || isReadOnly) {
            return
        }

        switch (e.key) {
            case 'PageUp':
                if (onIncrementPage) {
                    e.preventDefault()
                    onIncrementPage()
                    break
                }
            // fallthrough!
            case 'ArrowUp':
            case 'Up':
                if (onIncrement) {
                    e.preventDefault()
                    onIncrement()
                }
                break
            case 'PageDown':
                if (onDecrementPage) {
                    e.preventDefault()
                    onDecrementPage()
                    break
                }
            // fallthrough
            case 'ArrowDown':
            case 'Down':
                if (onDecrement) {
                    e.preventDefault()
                    onDecrement()
                }
                break
            case 'Home':
                if (onDecrementToMin) {
                    e.preventDefault()
                    onDecrementToMin()
                }
                break
            case 'End':
                if (onIncrementToMax) {
                    e.preventDefault()
                    onIncrementToMax()
                }
                break
        }
    }

    let isFocused = useRef(false)
    let onFocus = () => {
        isFocused.current = true
    }

    let onBlur = () => {
        isFocused.current = false
    }

    // Replace Unicode hyphen-minus (U+002D) with minus sign (U+2212).
    // This ensures that macOS VoiceOver announces it as "minus" even with other characters between the minus sign
    // and the number (e.g. currency symbol). Otherwise it announces nothing because it assumes the character is a hyphen.
    // In addition, replace the empty string with the word "Empty" so that iOS VoiceOver does not read "50%" for an empty field.
    textValue = textValue === '' ? 'Empty' : (textValue || `${value}`).replace('-', '\u2212')

    useEffect(() => {
        if (isFocused.current) {
            announce(textValue!, 'assertive')
        }
    }, [textValue])

    const onIncrementPressStart = useCallback(
        (initialStepDelay: number) => {
            clearAsync()
            propsRef.current.onIncrement!()

            // Start spinning after initial delay
            _async.current = window.setTimeout(() => {
                if (isNaN(maxValue) || isNaN(value) || value < maxValue) {
                    onIncrementPressStart(60)
                }
            }, initialStepDelay)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onIncrement, maxValue, value]
    )

    const onDecrementPressStart = useCallback(
        (initialStepDelay: number) => {
            clearAsync()
            propsRef.current.onDecrement!()

            // Start spinning after initial delay
            _async.current = window.setTimeout(() => {
                if (isNaN(minValue) || isNaN(value) || value > minValue) {
                    onDecrementPressStart(60)
                }
            }, initialStepDelay)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onDecrement, minValue, value]
    )

    let cancelContextMenu = (e: globalThis.MouseEvent) => {
        e.preventDefault()
    }

    let { addGlobalListener, removeAllGlobalListeners } = useGlobalListeners()

    return {
        spinButtonProps: {
            role: 'spinbutton',
            'aria-valuenow': !isNaN(value) ? value : null,
            'aria-valuetext': textValue,
            'aria-valuemin': minValue,
            'aria-valuemax': maxValue,
            'aria-disabled': isDisabled || null,
            'aria-readonly': isReadOnly || null,
            'aria-required': isRequired || null,
            onKeyDown,
            onFocus,
            onBlur
        },
        incrementButtonProps: {
            onPressStart: () => {
                onIncrementPressStart(400)
                addGlobalListener(window, 'contextmenu', cancelContextMenu)
            },
            onPressEnd: () => {
                clearAsync()
                removeAllGlobalListeners()
            },
            onFocus,
            onBlur
        },
        decrementButtonProps: {
            onPressStart: () => {
                onDecrementPressStart(400)
                addGlobalListener(window, 'contextmenu', cancelContextMenu)
            },
            onPressEnd: () => {
                clearAsync()
                removeAllGlobalListeners()
            },
            onFocus,
            onBlur
        }
    }
}
