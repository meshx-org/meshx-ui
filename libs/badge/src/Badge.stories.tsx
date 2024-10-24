import type { StoryObj, Meta } from '@storybook/react'
import { Badge } from './Badge'
import React from 'react'

const meta = {
    title: 'Status/Badge',
    component: Badge,
    argTypes: {},
    render: (args) => {
        return (
            <div style={{ width: 300 }}>
                <Badge {...args} />
            </div>
        )
    }
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
    args: {}
}

export const Info: Story = {
    args: {
        variant: 'info'
    }
}

export const InfoSubtle: Story = {
    name: 'Info (Subtle)',
    args: {
        variant: 'info.subtle'
    }
}

export const Help: Story = {
    args: {
        variant: 'help'
    }
}

export const Success: Story = {
    args: {
        variant: 'success'
    }
}

export const Warning: Story = {
    args: {
        variant: 'warning'
    }
}

export const Danger: Story = {
    args: {
        variant: 'danger'
    }
}
