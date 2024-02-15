export type AriaLabelingProps = {
    /**
     * Defines a string value that labels the current element.
     */
    'aria-label'?: string

    /**
     * Identifies the element (or elements) that labels the current element.
     */
    'aria-labelledby'?: string

    /**
     * Identifies the element (or elements) that describes the object.
     */
    'aria-describedby'?: string

    /**
     * Identifies the element (or elements) that provide a detailed, extended description for the object.
     */
    'aria-details'?: string
}

export type InfoBarVariant = 'info' | 'help' | 'default' | 'success' | 'warning' | 'danger'

export type InfoBarProps = {
    /**  InfoBar contents. */
    children?: React.ReactNode

    /**
     * Name of a MeshX icon (or an icon element) to render on the left side.
     *
     * If this prop is omitted or `undefined`, the `variant` prop will determine a default icon.
     * If this prop is explicitly `null`, no icon will be displayed (regardless of `variant`).
     */
    icon?: JSX.Element

    /**
     * Visual intent color to apply to background, title, and icon.
     *
     * Defining this prop also applies a default icon, if the `icon` prop is omitted.
     */
    variant?: InfoBarVariant

    /**
     * Whether to automatically focus the Inline Alert when it first renders.
     */
    autoFocus?: boolean

    /**
     * String content of optional title element.
     */
    title?: string

    description?: string
} & AriaLabelingProps
