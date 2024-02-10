import { KeyboardEvent } from 'react'

export interface DateBoxPropsBase<T> {
    value?: T
    defaultValue?: T
    /** Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale.*/
    hourCycle?: 12 | 24
    /** The minimum allowed date that a user may select. */
    minValue: DateValue
    /** The maximum allowed date that a user may select.*/
    maxValue: DateValue
    granularity: Granularity
    /** Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.*/
    isDateUnavailable: (date: DateValue) => boolean
    label?: string
    /** Whether the element should receive focus on render. */
    autoFocus?: boolean
    'aria-label'?: string
    'aria-labelledby'?: string
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
    onKeyUp?: (e: KeyboardEvent<HTMLDivElement>) => void
}

// Allows this hook to also be used with TimeField
export interface DateBoxProps<T extends DateValue>
    extends Omit<
        DateBoxPropsBase<T>,
        'value' | 'defaultValue' | 'onChange' | 'minValue' | 'maxValue' | 'placeholderValue'
    > {}

export type DatePickerProps<T> = any
export type DateValue = any
export type Granularity = 'day' | 'month' | 'year' | 'second' | 'minute' | 'hour'
export type TimeValue = any
