import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Divider, LayerSurface, CardSurface, SmokeSurface } from '@meshx-org/mxui-primitives/src'

const meta = {
    title: 'Primitives/Surface2',
    component: LayerSurface
} satisfies Meta<typeof LayerSurface>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Button'
    }
}

export const Variations: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <LayerSurface {...args} children="Default" />
            <Divider />
            <CardSurface {...args} children="Default" />
            <Divider />
            <SmokeSurface {...args} children="Smoke" />
        </div>
    ),
    args: {
        children: 'Button',
        p: 6
    }
}
