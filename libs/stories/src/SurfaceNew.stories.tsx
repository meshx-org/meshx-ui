import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Divider, LayerSurface, CardSurface, SmokeSurface, FlyoutSurface } from '@meshx/mxui-primitives/src'

const meta = {
    title: 'Primitives/Surface2',
    component: LayerSurface
} satisfies Meta<typeof LayerSurface>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Button',
        p: 5,
        borderRadius: 6
    }
}

export const Variations: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <LayerSurface {...args} children="Layer" />
            <Divider />
            <CardSurface {...args} variant="default" children="Card: default" />
            <Divider />
            <CardSurface {...args} variant="well" children="Card: well" />
            <Divider />
            <SmokeSurface {...args} children="Smoke" />
            <Divider />
            <FlyoutSurface {...args} children="Flyout" />
        </div>
    ),
    args: {
        p: 5,
        borderRadius: 6
    }
}
