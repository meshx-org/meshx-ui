import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps, LinkButton } from '@meshx-org/mxui-button/src'
import { Text } from '@meshx-org/mxui-text'
import { ControlState } from '@meshx-org/mxui-core'

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

export const WithIcon = Template.bind({})
WithIcon.args = {
    apparance: 'default',
    children: [<Text>😄</Text>, <Text>Text</Text>]
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
            <LinkButton as="a" state={ControlState.Hovered}>
                Sign in
            </LinkButton>
            <Button {...args} children="Create an account" />
        </div>
    )
}

export const WithLinkButton = TemplateWithLinkButton.bind({})
WithLinkButton.args = {}
