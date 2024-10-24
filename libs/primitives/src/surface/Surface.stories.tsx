import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CardSurface, SmokeSurface, FlyoutSurface } from './Surface'
import { Divider } from '../divider/Divider'

const meta = {
    title: 'Primitives/Surface2',
    component: CardSurface
} satisfies Meta<typeof CardSurface>

export default meta
type Story = StoryObj<typeof CardSurface>

export const Default: Story = {
    args: {
        children: 'Button'
    }
}

export const Variations: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <CardSurface {...args} variant="default" children="Card: default" />
            <Divider />
            <CardSurface {...args} variant="well" children="Card: well" />
            <Divider />
            <CardSurface {...args} variant="warning" children="Card: warning" />
            <Divider />
            <CardSurface {...args} variant="danger" children="Card: danger" />
            <Divider />
            <CardSurface {...args} variant="success" children="Card: success" />
            <Divider />
            <SmokeSurface {...args} children="Smoke" />
            <Divider />
            <FlyoutSurface {...args} children="Flyout" />
        </div>
    ),
    args: {
        sx: {
            p: 4,
            borderRadius: 6
        }
    }
}
