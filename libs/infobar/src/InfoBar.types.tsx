export type InfoBarVariant = 'info' | 'help' | 'default' | 'success' | 'warning' | 'danger'

/**
 * Alias for a `JSX.Element` or a value that renders nothing.
 *
 * In React, `boolean`, `null`, and `undefined` do not produce any output.
 */
export type MaybeElement = JSX.Element | false | null | undefined

export interface InfoBarProps {
    /**  InfoBar contents. */
    children?: React.ReactNode

    /**
     * Name of a Blueprint UI icon (or an icon element) to render on the left side.
     *
     * If this prop is omitted or `undefined`, the `variant` prop will determine a default icon.
     * If this prop is explicitly `null`, no icon will be displayed (regardless of `variant`).
     */
    icon?: MaybeElement

    /**
     * Visual intent color to apply to background, title, and icon.
     *
     * Defining this prop also applies a default icon, if the `icon` prop is omitted.
     */
    variant?: InfoBarVariant

    /**
     * String content of optional title element.
     *
     * Due to a conflict with the HTML prop types, to provide JSX content simply
     * pass `<H4>JSX title content</H4>` as first `children` element instead of
     * using this prop (note uppercase tag name to use the Blueprint Heading
     * component).
     */
    title?: string
}
