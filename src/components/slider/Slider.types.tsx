type ChangeHandler = (value: number) => void

export interface SliderProps {
    header?: string
    readonly?: boolean
    disabled?: boolean

    /**
     * The width of the slider in pixels.
     * @default 200
     */
    width?: number

    /**
     * The minimum value of the slider.
     */
    min?: number
    max?: number

    defaultValue?: number
    value?: number
    onChange?: ChangeHandler
}
