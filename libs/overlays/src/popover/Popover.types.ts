import { AriaPopoverProps, FocusWithinProps } from 'react-aria'
import {} from 'react-stately'

import { CSSProperties, MutableRefObject, ReactNode, RefObject } from 'react'

export interface OverlayTriggerState {
    /** Whether the overlay is currently open. */
    readonly isOpen: boolean
    /** Sets whether the overlay is open. */
    setOpen(isOpen: boolean): void
    /** Opens the overlay. */
    open(): void
    /** Closes the overlay. */
    close(): void
    /** Toggles the overlay's visibility. */
    toggle(): void
}

export type PopoverProps = {
    children: ReactNode
    hideArrow?: boolean
    state: OverlayTriggerState
    shouldContainFocus?: boolean
    onEntering?: () => void
    onEnter?: () => void
    onEntered?: () => void
    onExiting?: () => void
    onExited?: () => void
    onExit?: () => void
    container?: HTMLElement
    disableFocusManagement?: boolean
    enableBothDismissButtons?: boolean
    onDismissButtonPress?: () => void
    className?: string
} & Omit<AriaPopoverProps, 'popoverRef' | 'maxHeight'> & { UNSAFE_style: CSSProperties }

export interface PopoverWrapperProps extends PopoverProps, FocusWithinProps {
    isOpen?: boolean
    wrapperRef: RefObject<HTMLDivElement>
}
