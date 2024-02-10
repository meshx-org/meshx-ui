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

import React, { createContext, useCallback, useReducer } from 'react'
import { shallowCompareKeys } from '../utils'
import { ShortcutsConfig } from '../hooks/shortcuts/shortcutConfig'

interface ShortcutsContextState {
    /**
     * Whether the context instance is being used within a tree which has a <ShortcutsProvider>.
     * It's technically ok if this is false, but not recommended, since that means any shortcuts
     * bound with that context instance will not show up in the shortcuts help dialog.
     */
    hasProvider: boolean

    /** List of shortcuts accessible in the current scope, registered by currently mounted components, can be global or local. */
    shortcuts: ShortcutsConfig[]

    /** Whether the global shortcuts dialog is open. */
    isDialogOpen: boolean
}

type ShortcutsAction =
    | { type: 'ADD_SHORTCUTS' | 'REMOVE_SHORTCUTS'; payload: ShortcutsConfig[] }
    | { type: 'CLOSE_DIALOG' | 'OPEN_DIALOG' }

export type ShortcutsContextInstance = [ShortcutsContextState, React.Dispatch<ShortcutsAction>]

const initialShortcutsState: ShortcutsContextState = { hasProvider: false, shortcuts: [], isDialogOpen: false }
const noOpDispatch: React.Dispatch<ShortcutsAction> = () => null

/**
 * A React context used to register and deregister shortcuts as components are mounted and unmounted in an application.
 * Users should take care to make sure that only _one_ of these is instantiated and used within an application, especially
 * if using global shortcuts.
 *
 * You will likely not be using this ShortcutsContext directly, except in cases where you need to get a direct handle on an
 * existing context instance for advanced use cases involving nested ShortcutsProviders.
 */
export const ShortcutsContext = createContext<ShortcutsContextInstance>([initialShortcutsState, noOpDispatch])

const shortcutsReducer = (state: ShortcutsContextState, action: ShortcutsAction) => {
    switch (action.type) {
        case 'ADD_SHORTCUTS':
            // only pick up unique shortcuts which haven't been registered already
            const newUniqueShortcuts = []

            for (const a of action.payload) {
                let isUnique = true
                for (const b of state.shortcuts) {
                    isUnique &&= !shallowCompareKeys(a, b, { exclude: ['onKeyDown', 'onKeyUp'] })
                }

                if (isUnique) {
                    newUniqueShortcuts.push(a)
                }
            }

            return {
                ...state,
                shortcuts: [...state.shortcuts, ...newUniqueShortcuts]
            }
        case 'REMOVE_SHORTCUTS':
            return {
                ...state,
                shortcuts: state.shortcuts.filter((key) => action.payload.indexOf(key) === -1)
            }
        case 'OPEN_DIALOG':
            return { ...state, isDialogOpen: true }
        case 'CLOSE_DIALOG':
            return { ...state, isDialogOpen: false }
        default:
            return state
    }
}

export interface ShortcutsProviderProps {
    /** The component subtree which will have access to this shortcuts context. */
    children: React.ReactNode

    /** Optional props to customize the rendered shortcuts dialog. */
    // TODO: dialogProps?: Partial<Omit<ShortcutsDialogProps, 'shortcuts'>>

    /** If provided, this dialog render function will be used in place of the default implementation. */
    // TODO: renderDialog?: (state: ShortcutsContextState, contextActions: { handleDialogClose: () => void }) => JSX.Element

    /** If provided, we will use this context instance instead of generating our own. */
    value?: ShortcutsContextInstance
}

/**
 * Shortcuts context provider, necessary for the `useShortcuts` hook.
 */
export const ShortcutsProvider = ({ children, value }: ShortcutsProviderProps) => {
    const hasExistingContext = value != null
    const [state, dispatch] = value ?? useReducer(shortcutsReducer, { ...initialShortcutsState, hasProvider: true })
    const handleDialogClose = useCallback(() => dispatch({ type: 'CLOSE_DIALOG' }), [])

    //const dialog = renderDialog?.(state, { handleDialogClose }) ?? (
    //    <ShortcutsDialog2
    //        {...dialogProps}
    //        isOpen={state.isDialogOpen}
    //        shortcuts={state.shortcuts}
    //        onClose={handleDialogClose}
    //    />
    //)

    // if we are working with an existing context, we don't need to generate our own dialog
    return (
        <ShortcutsContext.Provider value={[state, dispatch]}>
            {children}
            {/*hasExistingContext ? undefined : dialog*/}
        </ShortcutsContext.Provider>
    )
}
