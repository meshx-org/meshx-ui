type ChangeHandler = (value: string) => void

export interface TextBoxProps {
    placeholder?: string
    header?: string
    readonly?: boolean
    disabled?: boolean

    value?: string
    onChange?: ChangeHandler
}
