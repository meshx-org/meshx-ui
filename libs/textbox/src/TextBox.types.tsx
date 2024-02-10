import { PaddingProps, LayoutProps, MarginProps } from 'styled-system'

export type ChangeHandler = (value: string) => void
export type VoidHandler = () => void

export interface BaseInputProps extends PaddingProps, MarginProps, LayoutProps {
    placeholder?: string
    disabled?: boolean

    // label for input	string
    label?: string

    // label at right for input	string
    labelRight?: string

    onFocus?: VoidHandler
    onBlur?: VoidHandler

    value?: string | undefined
    onChange?: ChangeHandler | undefined

    readonly?: boolean

    // keyHint?: 'go' | 'done' | 'next' | 'previous' | 'search' | 'send' | undefined
    // inputMode?: 'default' | 'url' | 'email' | 'numeric' | 'decimal' | 'phone' | undefined
}

export interface TextBoxProps extends BaseInputProps {
    // allow passing non-standard props to the underlying element
    [key: string]: unknown
}

export interface PasswordBoxProps extends BaseInputProps {
    passwordChar?: string

    // allow passing non-standard props to the underlying element
    [key: string]: unknown
}
