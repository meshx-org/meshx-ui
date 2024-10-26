import type { StoryObj, Meta } from '@storybook/react'
import { ProgressCircle } from './ProgressCircle'
import React from 'react'

const meta = {
    title: 'Progress/ProgressCircle',
    component: ProgressCircle,
    argTypes: {
        value: {
            control: {
                type: 'number',
                min: 0,
                max: 100,
                step: 1
            }
        }
    },
    render: (args) => {
        return <ProgressCircle {...args} />
    }
} satisfies Meta<typeof ProgressCircle>

export default meta

type Story = StoryObj<typeof ProgressCircle>

export const Default: Story = {
    args: {
        value: 50
    }
}

export const Indeterminate: Story = {
    args: {
        isIndeterminate: true
    }
}
