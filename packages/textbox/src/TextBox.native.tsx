import React from 'react'
import { TextInput } from 'react-native'
import { TextBoxProps, PasswordBoxProps } from './TextBox.types'

export function TextBox(props: TextBoxProps) {
    return <TextInput placeholder={props.placeholder} />
}

export function PasswordBox(props: PasswordBoxProps) {
    return <TextInput secureTextEntry placeholder={props.placeholder} />
}
