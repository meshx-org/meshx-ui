import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'
import { Select } from './Select'

const meta = {
    title: 'Basic Input/Select',
    component: Select,
    argTypes: {},
    render: (args) => {
        return <Select {...args} />
    }
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
    args: {
        apparance: 'default',
        children: 'Button'
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled'
    }
}
