import { OverlayTriggerProps, PositionProps } from '@meshx/mxui-overlays'

// A set of common DOM props that are allowed on any component
// Ensure this is synced with DOMPropNames in filterDOMProps
export interface DOMProps {
    /**
     * The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
     */
    id?: string
}

export type TooltipProps = {
    isOpen?: boolean

    /**
     * The [visual style](https://spectrum.adobe.com/page/tooltip/#Semantic-variants) of the Tooltip.
     */
    variant?: 'neutral' | 'positive' | 'negative' | 'info'

    /**
     * The placement of the element with respect to its anchor element.
     * @default 'top'
     */
    placement?: 'start' | 'end' | 'right' | 'left' | 'top' | 'bottom'

    /**
     * Whether the element is rendered.
     */
    showIcon?: boolean

    children: React.ReactNode
} & DOMProps

export type TooltipTriggerProps = {
    children: [React.ReactElement, React.ReactElement]

    /**
     * Whether the tooltip should be disabled, independent from the trigger.
     */
    isDisabled?: boolean

    /**
     * The delay time for the tooltip to show up. [See guidelines](https://spectrum.adobe.com/page/tooltip/#Immediate-or-delayed-appearance).
     * @default 1500
     */
    delay?: number

    /**
     * The delay time for the tooltip to close. [See guidelines](https://spectrum.adobe.com/page/tooltip/#Warmup-and-cooldown).
     * @default 500
     */
    closeDelay?: number

    /**
     * By default, opens for both focus and hover. Can be made to open only for focus.
     */
    trigger?: 'focus'

    /**
     * The additional offset applied along the main axis between the element and its
     * anchor element.
     * @default 7
     */
    offset?: number
} & OverlayTriggerProps &
    PositionProps
