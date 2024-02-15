import type { StoryObj, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from '@meshx/mxui-button/src'
import { Tooltip, TooltipTrigger } from '@meshx/mxui-tooltip/src'
import React from 'react'

const argTypes = {
    placement: {
        control: 'select',
        options: [
            'bottom',
            'bottom left',
            'bottom right',
            'bottom start',
            'bottom end',
            'top',
            'top left',
            'top right',
            'top start',
            'top end',
            'left',
            'left top',
            'left bottom',
            'start',
            'start top',
            'start bottom',
            'right',
            'right top',
            'right bottom',
            'end',
            'end top',
            'end bottom'
        ]
    },
    delay: {
        control: 'number',
        min: 0,
        max: 50000,
        step: 500
    },
    offset: {
        control: 'number',
        min: -500,
        max: 500
    },
    crossOffset: {
        control: 'number',
        min: -500,
        max: 500
    },
    containerPadding: {
        control: 'number',
        min: -500,
        max: 500
    },
    isDisabled: {
        control: 'boolean'
    },
    shouldFlip: {
        control: 'boolean'
    },
    trigger: {
        control: 'radio',
        options: [undefined, 'focus']
    },
    children: {
        control: { disable: true }
    }
}

const meta = {
    title: 'TooltipTrigger',
    component: TooltipTrigger,
    argTypes,
    render: (args) => {
        return (
            <div>
                <div className="flex">
                    <div className="w-10 h-10 bg-red-500"></div>
                    <div className="w-10 h-10 bg-blue-500"></div>
                    <div className="w-10 h-10 bg-green-500"></div>
                </div>

                <TooltipTrigger {...args} />
            </div>
        )
    },
    args: {
        delay: 10,
        children: [<Button aria-label="Edit Name">Ok</Button>, <Tooltip placement="right">Change Name</Tooltip>],
        onOpenChange: action('openChange')
    }
} satisfies Meta<typeof TooltipTrigger>

type Story = StoryObj<typeof TooltipTrigger>

export const Default: Story = {}

export const DefaultOpen: Story = {
    args: { defaultOpen: true },
    name: 'defaultOpen: true'
}

export const IsOpen: Story = {
    args: { isOpen: true },
    name: 'isOpen: true'
}

export default meta
