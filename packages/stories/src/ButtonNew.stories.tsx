import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@meshx-org/mxui-button/src'
import { Divider } from '@meshx-org/mxui-primitives/src'


const meta = {
    title: 'Basic Input/NewButton',
    component: Button
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'default',
        children: 'Button'
    }
}

export const Variations: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '4px' }}>
            <Button {...args} variant="default" children="Default" />
            <Divider />
            <Button {...args} variant="accent" children="Accent" />
            <Divider />
            <Button {...args} variant="warning" children="Warning" />
            <Divider />
            <Button {...args} variant="danger" children="Danger" />
        </div>
    ),
    args: {
        variant: 'default',
        children: 'Button'
    }
}
