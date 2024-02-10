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

import { ReactNode, CSSProperties } from 'react'

export interface OverlayAriaProps {
    /**
     * The container element in which the overlay portal will be placed.
     * @default document.body
     */
    portalContainer?: Element

    /** The overlay to render in the portal. */
    children: ReactNode
}

export interface OverlayProps {
    children: ReactNode
    isOpen?: boolean
    container?: Element
    isKeyboardDismissDisabled?: boolean
    overlayStyles?: CSSProperties
    onEnter?: () => void
    onEntering?: () => void
    onEntered?: () => void
    onExit?: () => void
    onExiting?: () => void
    onExited?: () => void
}
