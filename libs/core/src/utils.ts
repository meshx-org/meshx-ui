/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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

// we use the empty object {} a lot in this public API
/* eslint-disable @typescript-eslint/ban-types */

export enum ControlState {
    Rest = 'rest',
    Hovered = 'hovered',
    Pressed = 'pressed',
    Disabled = 'disabled'
}

export enum CardState {
    Rest = 'rest',
    Hovered = 'hovered',
    Pressed = 'pressed'
}

export function getControlState(pressed: boolean, hovered: boolean, disabled: boolean): ControlState {
    let state: ControlState = ControlState.Rest
    if (hovered) state = ControlState.Hovered
    if (pressed) state = ControlState.Pressed
    if (disabled) state = ControlState.Disabled

    return state
}

export interface KeyAllowlist<T> {
    include: Array<keyof T>
}

export interface KeyDenylist<T> {
    exclude: Array<keyof T>
}

/**
 * Shallow comparison between objects. If `keys` is provided, just that subset
 * of keys will be compared; otherwise, all keys will be compared.
 *
 * @returns true if items are equal.
 */
export function shallowCompareKeys<T extends {}>(
    objA: T | null | undefined,
    objB: T | null | undefined,
    keys?: KeyDenylist<T> | KeyAllowlist<T>
) {
    // treat `null` and `undefined` as the same
    if (objA == null && objB == null) {
        return true
    } else if (objA == null || objB == null) {
        return false
    } else if (Array.isArray(objA) || Array.isArray(objB)) {
        return false
    } else if (keys != null) {
        return shallowCompareKeysImpl(objA, objB, keys)
    } else {
        // shallowly compare all keys from both objects
        const keysA = Object.keys(objA) as Array<keyof T>
        const keysB = Object.keys(objB) as Array<keyof T>
        return (
            shallowCompareKeysImpl(objA, objB, { include: keysA }) &&
            shallowCompareKeysImpl(objA, objB, { include: keysB })
        )
    }
}

// Private helpers
// ===============

/**
 * Partial shallow comparison between objects using the given list of keys.
 */
function shallowCompareKeysImpl<T extends object>(objA: T, objB: T, keys: KeyDenylist<T> | KeyAllowlist<T>) {
    return filterKeys(objA, objB, keys).every((key) => {
        return objA.hasOwnProperty(key) === objB.hasOwnProperty(key) && objA[key] === objB[key]
    })
}

function filterKeys<T extends object>(objA: T, objB: T, keys: KeyDenylist<T> | KeyAllowlist<T>) {
    if (isAllowlist(keys)) {
        return keys.include
    } else if (isDenylist(keys)) {
        const keysA = Object.keys(objA)
        const keysB = Object.keys(objB)

        // merge keys from both objects into a big set for quick access
        const keySet = arrayToObject(keysA.concat(keysB))

        // delete denied keys from the key set
        keys.exclude.forEach((key) => delete keySet[key])

        // return the remaining keys as an array
        return Object.keys(keySet) as Array<keyof T>
    }

    return []
}

function isAllowlist<T>(keys: any): keys is KeyAllowlist<T> {
    return keys != null && (keys as KeyAllowlist<T>).include != null
}

function isDenylist<T>(keys: any): keys is KeyDenylist<T> {
    return keys != null && (keys as KeyDenylist<T>).exclude != null
}

function arrayToObject(arr: any[]) {
    return arr.reduce((obj: any, element: any) => {
        obj[element] = true
        return obj
    }, {})
}
