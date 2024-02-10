import { ReactElement } from 'react'
import { OverlayTriggerProps, PositionProps } from './types'

export interface TooltipTriggerProps extends OverlayTriggerProps {
    
}

export interface AnchoredOverlayProps extends TooltipTriggerProps, PositionProps {
    children: [ReactElement, ReactElement]

    /**
     * The additional offset applied along the main axis between the element and its
     * anchor element.
     * @default 0
     */
    offset?: number

    /**
     * The additional offset applied along the cross axis between the element and its
     * anchor element.
     * @default 0
     */
    crossOffset: number
}
