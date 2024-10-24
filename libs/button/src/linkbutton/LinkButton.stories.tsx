import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Text } from '@meshx/mxui-text'
import { LinkButton } from './LinkButton'

const meta = {
    title: 'Basic Input/LinkButton',
    component: LinkButton,
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <LinkButton {...args} />
        </div>
    )
} satisfies Meta<typeof LinkButton>

export default meta
type Story = StoryObj<typeof LinkButton>

export const Default: Story = {
    args: {
        children: [<Text>😄</Text>, <Text>Text</Text>],
        href: '#'
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
        href: '#'
    }
}
