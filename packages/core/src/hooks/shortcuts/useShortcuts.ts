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

import React, { useContext, useEffect, useCallback } from 'react'

import { comboMatches, getKeyCombo, KeyCombo, parseKeyCombo } from './shortcutParser'
import { ShortcutsConfig } from './shortcutConfig'
import { ShortcutsContext } from '../../context/ShortcutsProvider'

function elementIsTextInput(el: HTMLElement) {
    return false
}

function getDefaultDocument(): Document | undefined {
    if (typeof window === 'undefined') {
        return undefined
    }
    return window.document
}

const ns = '[MXUI]'
export const SHORTCUTS_PROVIDER_NOT_FOUND =
    ns +
    ` useShortcuts() was used outside of a <ShortcutsProvider> context. These shortcuts will not be shown in the shortcuts help dialog.`

export interface UseShortcutsOptions {
    /**
     * A custom document to reference when binding global event handlers.
     * This can be useful when using iframes in an application.
     *
     * @default window.document
     */
    document?: Document

    /**
     * The key combo which will trigger the shortcuts dialog to open.
     *
     * @default "?"
     */
    showDialogKeyCombo?: string
}

export interface UseShortcutsReturnValue {
    handleKeyDown: React.KeyboardEventHandler<HTMLElement>
    handleKeyUp: React.KeyboardEventHandler<HTMLElement>
}

/**
 * React hook to register global and local shortcuts for a component.
 *
 * @param keys list of shortcuts to configure
 * @param options hook options
 */
export function useShortcuts(
    keys: readonly ShortcutsConfig[],
    options: UseShortcutsOptions = {}
): UseShortcutsReturnValue {
    const { document = getDefaultDocument(), showDialogKeyCombo = '?' } = options
    const localKeys = React.useMemo(
        () =>
            keys
                .filter((k) => !k.global)
                .map((k) => ({
                    combo: parseKeyCombo(k.combo),
                    config: k
                })),
        [keys]
    )
    const globalKeys = React.useMemo(
        () =>
            keys
                .filter((k) => k.global)
                .map((k) => ({
                    combo: parseKeyCombo(k.combo),
                    config: k
                })),
        [keys]
    )

    // register keys with global context
    const [state, dispatch] = useContext(ShortcutsContext)

    if (!state.hasProvider) {
        React.useEffect(() => console.warn(SHORTCUTS_PROVIDER_NOT_FOUND), [])
    }

    // we can still bind the shortcuts if there is no ShortcutsProvider, they just won't show up in the dialog
    React.useEffect(() => {
        const payload = [...globalKeys.map((k) => k.config), ...localKeys.map((k) => k.config)]
        dispatch({ type: 'ADD_SHORTCUTS', payload })
        return () => dispatch({ type: 'REMOVE_SHORTCUTS', payload })
    }, [keys])

    const invokeNamedCallbackIfComboRecognized = (
        global: boolean,
        combo: KeyCombo,
        callbackName: 'onKeyDown' | 'onKeyUp',
        e: KeyboardEvent
    ) => {
        const isTextInput = elementIsTextInput(e.target as HTMLElement)
        for (const key of global ? globalKeys : localKeys) {
            const {
                allowInInput = false,
                disabled = false,
                preventDefault = false,
                stopPropagation = false
            } = key.config

            const shouldIgnore = (isTextInput && !allowInInput) || disabled
            if (!shouldIgnore && comboMatches(key.combo, combo)) {
                if (preventDefault) {
                    e.preventDefault()
                }
                if (stopPropagation) {
                    // set a flag just for unit testing. not meant to be referenced in feature work.
                    ;(e as any).isPropagationStopped = true
                    e.stopPropagation()
                }
                key.config[callbackName]?.(e)
            }
        }
    }

    const handleGlobalKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // special case for global keydown: if '?' is pressed, open the shortcuts dialog
            const combo = getKeyCombo(e)
            const isTextInput = elementIsTextInput(e.target as HTMLElement)

            if (!isTextInput && comboMatches(parseKeyCombo(showDialogKeyCombo), combo)) {
                dispatch({ type: 'OPEN_DIALOG' })
            } else {
                invokeNamedCallbackIfComboRecognized(true, getKeyCombo(e), 'onKeyDown', e)
            }
        },
        [globalKeys]
    )

    const handleGlobalKeyUp = useCallback(
        (e: KeyboardEvent) => invokeNamedCallbackIfComboRecognized(true, getKeyCombo(e), 'onKeyUp', e),
        [globalKeys]
    )

    const handleLocalKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLElement>) =>
            invokeNamedCallbackIfComboRecognized(false, getKeyCombo(e.nativeEvent), 'onKeyDown', e.nativeEvent),
        [localKeys]
    )

    const handleLocalKeyUp = useCallback(
        (e: React.KeyboardEvent<HTMLElement>) =>
            invokeNamedCallbackIfComboRecognized(false, getKeyCombo(e.nativeEvent), 'onKeyUp', e.nativeEvent),
        [localKeys]
    )

    useEffect(() => {
        // document is guaranteed to be defined inside effects
        document!.addEventListener('keydown', handleGlobalKeyDown)
        document!.addEventListener('keyup', handleGlobalKeyUp)
        return () => {
            document!.removeEventListener('keydown', handleGlobalKeyDown)
            document!.removeEventListener('keyup', handleGlobalKeyUp)
        }
    }, [handleGlobalKeyDown, handleGlobalKeyUp])

    return { handleKeyDown: handleLocalKeyDown, handleKeyUp: handleLocalKeyUp }
}
