import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps, LinkButton } from '@meshx-org/mxui-button'
import { Text } from '@meshx-org/mxui-text'
import { ControlState } from '@meshx-org/mxui-core'
import { Divider } from '@meshx-org/mxui-primitives'

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
        variant: {
            options: ['accent', 'default', 'danger', 'warning', 'success'],
            control: { type: 'radio' }
        },
        block: { control: 'boolean' }
    }
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    variant: 'default',
    children: 'Button'
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    variant: 'default',
    children: [<Text>😄</Text>, <Text>Text</Text>]
}

export const Secondary = Template.bind({})
Secondary.args = {
    variant: 'default',
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

const TemplateWithVariations: Story<ButtonProps> = (args) => {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <Button {...args} variant="default" children="Default" />
            <Divider />
            <Button {...args} variant="accent" children="Accent" />
            <Divider />
            <Button {...args} variant="warning" children="Warning" />
            <Divider />
            <Button {...args} variant="danger" children="Danger" />
        </div>
    )
}

export const WithVariations = TemplateWithVariations.bind({})

