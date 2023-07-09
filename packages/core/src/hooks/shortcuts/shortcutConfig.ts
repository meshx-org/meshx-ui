/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface ShortcutsConfig {
    /**
     * Whether the shortcut should be triggerable when focused in a text input.
     *
     * @default false
     */
    allowInInput?: boolean

    /**
     * Shortcut combination string, such as "space" or "cmd+n".
     */
    combo: string

    /**
     * Whether the shortcut cannot be triggered.
     *
     * @default false
     */
    disabled?: boolean

    /**
     * Human-friendly label for the shortcut.
     */
    label: React.ReactNode

    /**
     * If `false`, the shortcut is active only when the target is focused. If
     * `true`, the shortcut can be triggered regardless of what component is
     * focused.
     *
     * @default false
     */
    global?: boolean

    /**
     * Unless the shortcut is global, you must specify a group where the shortcut
     * will be displayed in the shortcuts dialog. This string will be displayed
     * in a header at the start of the group of shortcuts.
     */
    group?: string

    /**
     * When `true`, invokes `event.preventDefault()` before the respective `onKeyDown` and
     * `onKeyUp` callbacks are invoked. Enabling this can simplify handler implementations.
     *
     * @default false
     */
    preventDefault?: boolean

    /**
     * When `true`, invokes `event.stopPropagation()` before the respective `onKeyDown` and
     * `onKeyUp` callbacks are invoked. Enabling this can simplify handler implementations.
     *
     * @default false
     */
    stopPropagation?: boolean

    /** `keydown` event handler. */
    onKeyDown?(e: KeyboardEvent): any

    /** `keyup` event handler. */
    onKeyUp?(e: KeyboardEvent): any
}
