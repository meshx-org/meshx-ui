import { CalendarDate, createCalendar, DateValue, toCalendar } from '@internationalized/date'
import { NumberParser } from '@internationalized/number'
import React, { KeyboardEvent, RefObject, useEffect, useLayoutEffect, useMemo } from 'react'
import { useRef } from 'react'
import { DateBoxProps } from './DateBox.types'
import { DateFieldState, DateSegment, useDateFieldState } from './useDateBoxState'
import { useSpinButton } from './useSpinButton'
import styled from 'styled-components'
import clsx from 'clsx'
import { useDateFormatter } from './useDateFormater'
import { createFocusManager, FocusManager } from './FocusScope'
import { useEvent } from './useEvent'
import { ControlFillX, ControlStrokeX } from '@meshx-org/mxui-primitives'
import { ControlState } from '@meshx-org/mxui-core'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: fit-content;
`

const StyledField = styled.div`
    display: inline-flex;
    align-items: center;
    height: 32px;
    padding: 4px 8px;
    border-radius: 4px;
    position: relative;
    z-index: 2;

    &:focus-within {
    }
`

const StyledSegment = styled.div`
    padding: 0 2px;
    font-variant-numeric: tabular-nums;
    text-align: end;

    color: var(--theme-color-text-primary);

    &.placeholder {
        color: var(--theme-color-text-secondary);
    }

    &.literal {
        padding: 0 !important;
        color: var(--theme-color-text-secondary);
    }

    &.hour,
    &.timeZoneName {
        margin-left: 4px;
    }

    &:focus {
        color: black;
        background: var(--theme-accent-default);
        outline: none;
        border-radius: 4px;
    }
`

interface Props {
    [key: string]: any
}

/**
 * Calls all functions in the order they were chained with the same arguments.
 */
export function chain(...callbacks: any[]): (...args: any[]) => void {
    return (...args: any[]) => {
        for (let callback of callbacks) {
            if (typeof callback === 'function') {
                callback(...args)
            }
        }
    }
}

function mergeIds(a: string, b: string): string {
    return a
}

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V : never

// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
export function mergeProps<T extends Props[]>(...args: T): UnionToIntersection<TupleTypes<T>> {
    // Start with a base clone of the first argument. This is a lot faster than starting
    // with an empty object and adding properties as we go.
    let result: Props = { ...args[0] }
    for (let i = 1; i < args.length; i++) {
        let props = args[i]
        for (let key in props) {
            let a = result[key]
            let b = props[key]

            // Chain events
            if (
                typeof a === 'function' &&
                typeof b === 'function' &&
                // This is a lot faster than a regex.
                key[0] === 'o' &&
                key[1] === 'n' &&
                key.charCodeAt(2) >= /* 'A' */ 65 &&
                key.charCodeAt(2) <= /* 'Z' */ 90
            ) {
                result[key] = chain(a, b)

                // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
            } else if (
                (key === 'className' || key === 'UNSAFE_className') &&
                typeof a === 'string' &&
                typeof b === 'string'
            ) {
                result[key] = clsx(a, b)
            } else if (key === 'id' && a && b) {
                result.id = mergeIds(a, b)
                // Override others
            } else {
                result[key] = b !== undefined ? b : a
            }
        }
    }

    return result as UnionToIntersection<TupleTypes<T>>
}

function useDateField<T extends DateValue>(props: DateBoxProps<T>, state: DateFieldState, ref: RefObject<Element>) {
    let focusManager = useMemo(() => createFocusManager(ref), [ref])
    let autoFocusRef = useRef(props.autoFocus)

    // Pass labels and other information to segments.
    hookData.set(state, {
        ariaLabel: props['aria-label'],
        // ariaLabelledBy: [props['aria-labelledby'], labelProps.id].filter(Boolean).join(' ') || undefined,
        // ariaDescribedBy: describedBy,
        focusManager
    })

    useEffect(() => {
        if (autoFocusRef.current) {
            focusManager.focusFirst()
        }
        autoFocusRef.current = false
    }, [focusManager])

    return {
        labelProps: {},
        fieldProps: mergeProps(
            {},
            {
                onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
                    if (props.onKeyDown) {
                        props.onKeyDown(e)
                    }
                },
                onKeyUp(e: KeyboardEvent<HTMLDivElement>) {
                    if (props.onKeyUp) {
                        props.onKeyUp(e)
                    }
                }
            }
        ),
        descriptionProps: {},
        errorMessageProps: {}
    }
}

/** @experimental */
export function DateBox(props: DateBoxProps<DateValue>) {
    const state = useDateFieldState({
        ...props,
        locale: 'en-EN', // TODO: get from context
        createCalendar
    })

    const ref = useRef(null)
    const { labelProps, fieldProps } = useDateField(props, state, ref)

    return (
        <StyledWrapper className="wrapper">
            <span {...labelProps}>{props.label}</span>
            
            <StyledField {...fieldProps} ref={ref} className="field">
                {state.segments.map((segment, i) => (
                    <DS key={i} segment={segment} state={state} />
                ))}
                {state.validationState === 'invalid' && <span aria-hidden="true">🚫</span>}
            </StyledField>

            <ControlStrokeX borderRadius={5.5} state={ControlState.Rest} focused={false} />
            <ControlFillX borderRadius={5} state={ControlState.Rest} />
        </StyledWrapper>
    )
}

interface DateSegmentProps {
    state: DateFieldState
    segment: DateSegment
}

export interface UseDateSegment {
    /** Props for the segment element. */
    segmentProps: any
}

// Data that is passed between useDateField and useDateSegment.
interface HookData {
    ariaLabel?: string
    ariaLabelledBy?: string
    ariaDescribedBy?: string
    focusManager: FocusManager
}

export const hookData = new WeakMap<DateFieldState, HookData>()

function isMac() {
    return navigator.platform.indexOf('Mac') > -1
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

function useId() {
    let id = useRef('0')
    return id.current
}

/**
 * Provides the behavior and accessibility implementation for a segment in a date field.
 * A date segment displays an individual unit of a date and time, and allows users to edit
 * the value by typing or using the arrow keys to increment and decrement.
 */
function useDateSegment(segment: DateSegment, state: DateFieldState, ref: any): UseDateSegment {
    let enteredKeys = useRef('')
    let { locale } = { locale: 'en-EN' } // TODO: get from context

    let { ariaLabel, ariaLabelledBy, ariaDescribedBy, focusManager } = hookData.get(state)!

    let textValue = segment.isPlaceholder ? '' : segment.text
    let options = useMemo(() => state.dateFormatter.resolvedOptions(), [state.dateFormatter])
    let monthDateFormatter = useDateFormatter({ month: 'long', timeZone: options.timeZone })
    let hourDateFormatter = useDateFormatter({
        hour: 'numeric',
        hour12: options.hour12,
        timeZone: options.timeZone
    })

    if (segment.type === 'month' && !segment.isPlaceholder) {
        let monthTextValue = monthDateFormatter.format(state.dateValue)
        textValue = monthTextValue !== textValue ? `${textValue} – ${monthTextValue}` : monthTextValue
    } else if (segment.type === 'hour' && !segment.isPlaceholder) {
        textValue = hourDateFormatter.format(state.dateValue)
    }

    let parser = useMemo(() => new NumberParser(locale, { maximumFractionDigits: 0 }), [locale])

    let backspace = () => {
        if (parser.isValidPartialNumber(segment.text) && !state.isReadOnly && !segment.isPlaceholder) {
            let newValue = segment.text.slice(0, -1)
            let parsed = parser.parse(newValue)
            if (newValue.length === 0 || parsed === 0) {
                state.clearSegment(segment.type)
            } else {
                state.setSegment(segment.type, parsed)
            }
            enteredKeys.current = newValue
        } else if (segment.type === 'dayPeriod') {
            state.clearSegment(segment.type)
        }
    }

    let direction = 'ltr'
    let onKeyDown = (e: any) => {
        // Firefox does not fire selectstart for Ctrl/Cmd + A
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1742153
        if (e.key === 'a' && (isMac() ? e.metaKey : e.ctrlKey)) {
            e.preventDefault()
        }

        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
            return
        }

        switch (e.key) {
            case 'Backspace':
            case 'Delete': {
                // Safari on iOS does not fire beforeinput for the backspace key because the cursor is at the start.
                e.preventDefault()
                e.stopPropagation()
                backspace()
                break
            }
        }

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault()
                e.stopPropagation()
                if (direction === 'rtl') {
                    focusManager.focusNext()
                } else {
                    focusManager.focusPrevious()
                }
                break
            case 'ArrowRight':
                e.preventDefault()
                e.stopPropagation()
                if (direction === 'rtl') {
                    focusManager.focusPrevious()
                } else {
                    focusManager.focusNext()
                }
                break
        }
    }

    // Safari dayPeriod option doesn't work...
    let startsWith = String.prototype.startsWith

    let amPmFormatter = useDateFormatter({ hour: 'numeric', hour12: true })
    let am = useMemo(() => {
        let date = new Date()
        date.setHours(0)
        return amPmFormatter.formatToParts(date).find((part) => part.type === 'dayPeriod')!.value
    }, [amPmFormatter])

    let pm = useMemo(() => {
        let date = new Date()
        date.setHours(12)
        return amPmFormatter.formatToParts(date).find((part) => part.type === 'dayPeriod')!.value
    }, [amPmFormatter])

    // Get a list of formatted era names so users can type the first character to choose one.
    let eraFormatter = useDateFormatter({ year: 'numeric', era: 'narrow', timeZone: 'UTC' })
    let eras = useMemo(() => {
        if (segment.type !== 'era') {
            return []
        }

        let date = toCalendar(new CalendarDate(1, 1, 1), state.calendar)
        let eras = state.calendar.getEras().map((era) => {
            let eraDate = date.set({ year: 1, month: 1, day: 1, era }).toDate('UTC')
            let parts = eraFormatter.formatToParts(eraDate)
            let formatted = parts.find((p) => p.type === 'era')!.value
            return { era, formatted }
        })

        // Remove the common prefix from formatted values. This is so that in calendars with eras like
        // ERA0 and ERA1 (e.g. Ethiopic), users can press "0" and "1" to select an era. In other cases,
        // the first letter is used.
        let prefixLength = commonPrefixLength(eras.map((era) => era.formatted))
        if (prefixLength) {
            for (let era of eras) {
                era.formatted = era.formatted.slice(prefixLength)
            }
        }

        return eras
    }, [eraFormatter, state.calendar, segment.type])

    let onInput = (key: string) => {
        if (state.isDisabled || state.isReadOnly) {
            return
        }

        let newValue = enteredKeys.current + key

        switch (segment.type) {
            case 'dayPeriod':
                if (am.startsWith(key)) {
                    state.setSegment('dayPeriod', 0)
                } else if (pm.startsWith(key)) {
                    state.setSegment('dayPeriod', 12)
                } else {
                    break
                }

                state.setSegment('dayPeriod', 12)
                focusManager.focusNext()
                break
            case 'era': {
                let matched = eras.find((e) => startsWith(e.formatted, key))
                if (matched) {
                    state.setSegment('era', matched.era)
                    focusManager.focusNext()
                }
                break
            }
            case 'day':
            case 'hour':
            case 'minute':
            case 'second':
            case 'month':
            case 'year': {
                if (!parser.isValidPartialNumber(newValue)) {
                    return
                }

                let numberValue = parser.parse(newValue)
                let segmentValue = numberValue
                let allowsZero = segment.minValue === 0
                if (segment.type === 'hour' && state.dateFormatter.resolvedOptions().hour12) {
                    switch (state.dateFormatter.resolvedOptions().hourCycle) {
                        case 'h11':
                            if (numberValue > 11) {
                                segmentValue = parser.parse(key)
                            }
                            break
                        case 'h12':
                            allowsZero = false
                            if (numberValue > 12) {
                                segmentValue = parser.parse(key)
                            }
                            break
                    }

                    if (segment.value >= 12 && numberValue > 1) {
                        numberValue += 12
                    }
                } else if (numberValue > segment.maxValue) {
                    segmentValue = parser.parse(key)
                }

                if (isNaN(numberValue)) {
                    return
                }

                let shouldSetValue = segmentValue !== 0 || allowsZero
                if (shouldSetValue) {
                    state.setSegment(segment.type, segmentValue)
                }

                if (
                    Number(numberValue + '0') > segment.maxValue ||
                    newValue.length >= String(segment.maxValue).length
                ) {
                    enteredKeys.current = ''
                    if (shouldSetValue) {
                        focusManager.focusNext()
                    }
                } else {
                    enteredKeys.current = newValue
                }
                break
            }
        }
    }

    let onFocus = () => {
        enteredKeys.current = ''
        // TODO: scrollIntoViewport(ref.current, { containingElement: getScrollParent(ref.current) })

        // Collapse selection to start or Chrome won't fire input events.
        let selection = window.getSelection()
        selection?.collapse(ref.current)
    }

    let compositionRef = useRef('')

    useEvent(ref, 'beforeinput', (e) => {
        e.preventDefault()

        switch (e.inputType) {
            case 'deleteContentBackward':
            case 'deleteContentForward':
                if (parser.isValidPartialNumber(segment.text) && !state.isReadOnly) {
                    backspace()
                }
                break
            case 'insertCompositionText':
                // insertCompositionText cannot be canceled.
                // Record the current state of the element so we can restore it in the `input` event below.
                compositionRef.current = ref.current.textContent

                // Safari gets stuck in a composition state unless we also assign to the value here.
                // eslint-disable-next-line no-self-assign
                ref.current.textContent = ref.current.textContent
                break
            default:
                if (e.data != null) {
                    onInput(e.data)
                }
                break
        }
    })

    useEvent(ref, 'input', (e: InputEvent) => {
        let { inputType, data } = e
        switch (inputType) {
            case 'insertCompositionText':
                // Reset the DOM to how it was in the beforeinput event.
                ref.current.textContent = compositionRef.current

                // Android sometimes fires key presses of letters as composition events. Need to handle am/pm keys here too.
                // Can also happen e.g. with Pinyin keyboard on iOS.
                if (startsWith(am, data) || startsWith(pm, data)) {
                    onInput(data)
                }
                break
        }
    })

    useLayoutEffect(() => {
        let element = ref.current
        return () => {
            // If the focused segment is removed, focus the previous one, or the next one if there was no previous one.
            if (document.activeElement === element) {
                let prev = focusManager.focusPrevious()
                if (!prev) {
                    focusManager.focusNext()
                }
            }
        }
    }, [ref, focusManager])

    let { spinButtonProps } = useSpinButton({
        // The ARIA spec says aria-valuenow is optional if there's no value, but aXe seems to require it.
        // This doesn't seem to have any negative effects with real AT since we also use aria-valuetext.
        // https://github.com/dequelabs/axe-core/issues/3505
        value: segment.value,
        textValue,
        minValue: segment.minValue,
        maxValue: segment.maxValue,
        isDisabled: state.isDisabled,
        isReadOnly: state.isReadOnly || !segment.isEditable,
        isRequired: state.isRequired,
        onIncrement: () => {
            enteredKeys.current = ''
            state.increment(segment.type)
        },
        onDecrement: () => {
            enteredKeys.current = ''
            state.decrement(segment.type)
        },
        onIncrementPage: () => {
            enteredKeys.current = ''
            state.incrementPage(segment.type)
        },
        onDecrementPage: () => {
            enteredKeys.current = ''
            state.decrementPage(segment.type)
        },
        onIncrementToMax: () => {
            enteredKeys.current = ''
            state.setSegment(segment.type, segment.maxValue)
        },
        onDecrementToMin: () => {
            enteredKeys.current = ''
            state.setSegment(segment.type, segment.minValue)
        }
    })

    // spinbuttons cannot be focused with VoiceOver on iOS.
    let touchPropOverrides =
        isIOS() || segment.type === 'timeZoneName'
            ? {
                  role: 'textbox',
                  'aria-valuemax': null,
                  'aria-valuemin': null,
                  'aria-valuetext': null,
                  'aria-valuenow': null
              }
            : {}

    // Only apply aria-describedby to the first segment, unless the field is invalid. This avoids it being
    // read every time the user navigates to a new segment.
    let firstSegment = useMemo(() => state.segments.find((s) => s.isEditable), [state.segments])
    if (segment !== firstSegment && state.validationState !== 'invalid') {
        ariaDescribedBy = undefined
    }

    let id = useId()
    let isEditable = !state.isDisabled && !state.isReadOnly && segment.isEditable

    // Literal segments should not be visible to screen readers. We don't really need any of the above,
    // but the rules of hooks mean hooks cannot be conditional so we have to put this condition here.
    if (segment.type === 'literal') {
        return {
            segmentProps: {
                'aria-hidden': true
            }
        }
    }

    return {
        segmentProps: mergeProps(spinButtonProps, {
            id,
            ...touchPropOverrides,
            'aria-invalid': state.validationState === 'invalid' ? 'true' : undefined,
            'aria-describedby': ariaDescribedBy,
            'aria-readonly': state.isReadOnly || !segment.isEditable ? 'true' : undefined,
            'data-placeholder': segment.isPlaceholder || undefined,
            contentEditable: isEditable,
            suppressContentEditableWarning: isEditable,
            spellCheck: isEditable ? 'false' : undefined,
            autoCapitalize: isEditable ? 'off' : undefined,
            autoCorrect: isEditable ? 'off' : undefined,
            enterKeyHint: isEditable ? 'next' : undefined,
            inputMode:
                state.isDisabled || segment.type === 'dayPeriod' || segment.type === 'era' || !isEditable
                    ? undefined
                    : 'numeric',
            tabIndex: state.isDisabled ? undefined : 0,
            onKeyDown,
            onFocus,
            style: {
                caretColor: 'transparent'
            },
            // Prevent pointer events from reaching useDatePickerGroup, and allow native browser behavior to focus the segment.
            onPointerDown(e: any) {
                e.stopPropagation()
            },
            onMouseDown(e: any) {
                e.stopPropagation()
            }
        })
    }
}

function DS({ segment, state }: DateSegmentProps) {
    const ref = useRef(null)
    const { segmentProps } = useDateSegment(segment, state, ref)

    return (
        <StyledSegment
            {...segmentProps}
            ref={ref}
            className={`${segment.type === 'timeZoneName' ? 'timeZoneName' : ''} ${
                segment.type === 'hour' ? 'hour' : ''
            }  ${segment.type === 'literal' ? 'literal' : ''} ${segment.isPlaceholder ? 'placeholder' : ''}`}
        >
            {segment.text}
        </StyledSegment>
    )
}
