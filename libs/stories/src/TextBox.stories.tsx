import React from 'react'
import { Story, Meta } from '@storybook/react'
import { TextBox, PasswordBox, TextBoxProps, PasswordBoxProps } from '@meshx-org/mxui-textbox'

const meta: Meta = {
    title: 'Form/TextBox',
    component: TextBox,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
}

const TextBoxTemplate: Story<TextBoxProps> = (args) => <TextBox {...args} />
const PasswordBoxTemplate: Story<PasswordBoxProps> = (args) => <PasswordBox {...args} />

export const Rest = TextBoxTemplate.bind({})
Rest.args = {
    placeholder: 'Placeholder',
    role: '',
    name: 'input1'
}

export const Styled = TextBoxTemplate.bind({})
Styled.args = {
    placeholder: 'Placeholder',
    py: 10,
    display: 'flex'
}

export const Password = PasswordBoxTemplate.bind({})
Password.args = {
    placeholder: 'PasswordBox',
    display: 'flex',
    flex: 1
}

export const Disabled = TextBoxTemplate.bind({})
Disabled.args = {
    placeholder: 'Placeholder',
    disabled: true
}

export default meta
