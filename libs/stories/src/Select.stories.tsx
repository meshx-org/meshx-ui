import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Select, SelectProps } from '@meshx/mxui'

export default {
    title: 'Basic Input/Select',
    component: Select,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    },
    argTypes: {
        apparance: {
            options: ['primary', 'default'],
            control: { type: 'radio' }
        },
        block: { control: 'boolean' }
    }
} as Meta

const Template: Story<SelectProps> = (args) => <Select {...args} />

export const Primary = Template.bind({})
Primary.args = {
    apparance: 'default',
    children: 'Button'
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
    children: 'Disabled'
}
