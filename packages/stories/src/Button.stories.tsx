import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from '@meshx-org/mxui-button/src'

export default {
    title: 'Basic Input/Button',
    component: Button,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    apparance: 'default',
    children: 'test'
}

export const Disabled = Template.bind({})
Disabled.args = {
    apparance: 'default',
    disabled: true,
    children: 'test'
}
