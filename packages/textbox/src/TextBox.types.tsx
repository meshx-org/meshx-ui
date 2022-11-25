type ChangeHandler = (value: string) => void
type VoidHandler = () => void

export interface TextBoxProps {
    placeholder?: string
    header?: string
    readonly?: boolean
    disabled?: boolean

    value?: string
    onChange?: ChangeHandler

    onFocus?: VoidHandler
    onBlur?: VoidHandler
}
