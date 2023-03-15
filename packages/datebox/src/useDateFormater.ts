import { DateFormatter } from '@internationalized/date'
import { useMemo, useRef } from 'react'

export interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
    calendar?: string
}

function isEqual(a: DateFormatterOptions, b: DateFormatterOptions) {
    if (a === b) {
        return true
    }

    let aKeys = Object.keys(a) as (keyof DateFormatterOptions)[]
    let bKeys = Object.keys(b) as (keyof DateFormatterOptions)[]
    if (aKeys.length !== bKeys.length) {
        return false
    }

    for (let key of aKeys) {
        if (b[key] !== a[key]) {
            return false
        }
    }

    return true
}

/**
 * Provides localized date formatting for the current locale. Automatically updates when the locale changes,
 * and handles caching of the date formatter for performance.
 * @param options - Formatting options.
 */
export function useDateFormatter(options?: DateFormatterOptions): DateFormatter {
    // Reuse last options object if it is shallowly equal, which allows the useMemo result to also be reused.
    const lastOptions = useRef<DateFormatterOptions | undefined>(null)
    if (options && lastOptions.current && isEqual(options, lastOptions.current)) {
        options = lastOptions.current
    }

    // @ts-ignore
    lastOptions.current = options

    let { locale } = { locale: 'hu-HU' } // TODO: get from context
    return useMemo(() => new DateFormatter(locale, options), [locale, options])
}
