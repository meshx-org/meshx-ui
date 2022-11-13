import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps, LinkButton } from '@meshx-org/mxui-button/src'
import CustomMDXDocumentation from './Custom.mdx'

export default {
    title: 'Basic Input/Button',
    component: Button,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: CustomMDXDocumentation
        },
    },
    argTypes: {
        apparance: {
            options: ['primary', 'default'],
            control: { type: 'radio' }
        },
        block: { control: 'boolean' }
    }
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    apparance: 'default',
    children: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
    apparance: 'default',
    children: '😄👍😍💯'
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
    children: 'Disabled'
}

const TemplateWithLinkButton: Story<ButtonProps> = (args) => {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <LinkButton href="#" label="Sign in" />
            <Button {...args} children="Create an account" />
        </div>
    )
}

export const WithLinkButton = TemplateWithLinkButton.bind({})
WithLinkButton.args = { }

