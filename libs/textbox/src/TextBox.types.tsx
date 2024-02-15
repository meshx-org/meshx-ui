import { InputHTMLAttributes } from 'react'
import { FocusEvents, HoverEvents } from 'react-aria'
import { PaddingProps, LayoutProps, MarginProps } from 'styled-system'

export type ChangeHandler = (value: string) => void
export type VoidHandler = () => void

export interface BaseInputProps extends PaddingProps, MarginProps, LayoutProps {
    onFocus?: VoidHandler
    onBlur?: VoidHandler

    value?: string | undefined
    onChange?: ChangeHandler | undefined

    isReadonly?: boolean
    autoFocus?: boolean

    // keyHint?: 'go' | 'done' | 'next' | 'previous' | 'search' | 'send' | undefined
    // inputMode?: 'default' | 'url' | 'email' | 'numeric' | 'decimal' | 'phone' | undefined
}

export interface TextBoxProps extends HoverEvents, FocusEvents {
    // label for input	string
    label?: string

    // label at right for input	string
    labelRight?: string

    placeholder?: string
    isReadonly?: boolean
    isDisabled?: boolean
    autoFocus?: boolean

    value?: string
    defaultValue?: string
    onChange?: (v: string, ...args: any[]) => void
}
