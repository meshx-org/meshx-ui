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
    isKeyboardDismissDisabled?: boolean,
    overlayStyles?: CSSProperties,
    onEnter?: () => void
    onEntering?: () => void
    onEntered?: () => void
    onExit?: () => void
    onExiting?: () => void
    onExited?: () => void
}
