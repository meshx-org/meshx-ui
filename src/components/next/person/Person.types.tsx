export interface PersonProps {
    /**
     * Size of the avatar in pixels.
     *
     * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`) and
     * based on design guidelines for the Avatar control.
     *
     * If a non-supported size is neeeded, set `size` to the next-smaller supported size, and set `width` and `height`
     * to override the rendered size.
     *
     * For example, to set the avatar to 45px in size:
     * `<Avatar size={40} style={{ width: '45px', height: '45px' }} />`
     *
     * @defaultvalue 44
     */
    size: 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56 | 64 | 72 | 96 | 120 | 128

    /**
     * The name of the person or entity represented by this Avatar. This should always be provided if it is available.
     *
     * The name will be used to determine the initials displayed when there is no icon, as well as provided to
     * accessibility tools.
     */
    name: string

    /**
     * The Avatar's image.
     *
     * Usage e.g.: `image={{ src: '...' }}`
     */
    image?: string

    badge: number
}
