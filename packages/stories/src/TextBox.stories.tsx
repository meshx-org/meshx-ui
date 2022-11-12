import React from 'react'
import { Story, Meta } from '@storybook/react'
import { TextBox, TextBoxProps } from '@meshx-org/mxui-textbox/src'

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

const Template: Story<TextBoxProps> = (args) => <TextBox {...args} />

export const Rest = Template.bind({})
Rest.args = {
    placeholder: 'Placeholder'
}

export const Disabled = Template.bind({})
Disabled.args = {
    placeholder: 'Placeholder',
    disabled: true
}

export default meta
