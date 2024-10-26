import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CardSurface, SmokeSurface, FlyoutSurface, LayerSurface, ControlSurface } from './Surface'
import { Divider } from '../divider/Divider'

const meta = {
    title: 'Primitives/Surface',
    component: CardSurface,
    argTypes: {
        variant: { control: 'select', options: ['default', 'well'] }
    }
} satisfies Meta<typeof CardSurface>

export default meta
type Story = StoryObj<typeof CardSurface>

export const Card: Story = {
    args: {
        children: 'Card',
        sx: {
            p: 3,
            borderRadius: 6
        }
    }
}

export const Smoke: Story = {
    render: (args) => <SmokeSurface {...args} />,
    argTypes: {},
    args: {
        children: 'Smoke',
        sx: {
            p: 3,
            borderRadius: 6
        }
    }
}
export const Layer: Story = {
    render: (args) => <LayerSurface {...args} />,
    args: {
        children: 'Layer',
        sx: {
            p: 3,
            borderRadius: 6
        }
    }
}

export const Flyout: Story = {
    render: (args) => <FlyoutSurface {...args} />,
    args: {
        children: 'Flyout',
        sx: {
            p: 3,
            borderRadius: 6
        }
    }
}

export const All: Story = {
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
            <LayerSurface {...args} children="Layer" />
            <Divider />
            <FlyoutSurface {...args} children="Flyout" />
            <Divider />
            <ControlSurface {...args} variant="accent" children="Control: accent" />
            <Divider />
            <ControlSurface {...args} variant="link" children="Control: link" />
            <Divider />
            <ControlSurface {...args} variant="outline" children="Control: outline" />
            <Divider />
            <ControlSurface {...args} variant="warning" children="Control: warning" />
            <Divider />
            <ControlSurface {...args} variant="danger" children="Control: danger" />
            <Divider />
            <ControlSurface {...args} variant="success" children="Control: success" />
        </div>
    ),
    args: {
        sx: {
            p: 3,
            borderRadius: 6
        }
    }
}
