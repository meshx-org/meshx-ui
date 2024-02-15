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

import { PlacementAxis } from '@meshx/mxui-overlays'
import React, { CSSProperties, HTMLAttributes, RefObject } from 'react'
import { TooltipTriggerState } from '@react-stately/tooltip'

export type StyleProps = {
    UNSAFE_style?: CSSProperties
}

type TooltipContextProps = {
    state?: TooltipTriggerState
    ref?: RefObject<HTMLDivElement>
    placement?: PlacementAxis

    arrowProps?: HTMLAttributes<HTMLElement>
    arrowRef?: RefObject<HTMLElement>
} & StyleProps

export const TooltipContext = React.createContext<TooltipContextProps>({})
