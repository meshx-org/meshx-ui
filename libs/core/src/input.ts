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

export type ValidationError = string | string[]
export type ValidationErrors = Record<string, ValidationError>
export type ValidationFunction<T> = (value: T) => ValidationError | true | null | undefined

export interface Validation<T> {
    /** Whether user input is required on the input before form submission. */
    isRequired?: boolean

    /** Whether the input value is invalid. */
    isInvalid?: boolean

    /**
     * Whether to use native HTML form validation to prevent form submission
     * when the value is missing or invalid, or mark the field as required
     * or invalid via ARIA.
     * @default 'aria'
     */
    validationBehavior?: 'aria' | 'native'

    /**
     * A function that returns an error message if a given value is invalid.
     * Validation errors are displayed to the user when the form is submitted
     * if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
     * prop instead.
     */
    validate?: (value: T) => ValidationError | true | null | undefined
}

export interface InputBase {
    /** Whether the input is disabled. */
    isDisabled?: boolean

    /** Whether the input can be selected but not changed by the user. */
    isReadOnly?: boolean
}
