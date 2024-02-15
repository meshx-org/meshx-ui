import React, { SVGProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@meshx-org/mxui-button'
import { Divider } from '@meshx-org/mxui-primitives'

const CompassIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16.25 12h-8.5m8.5 0-3.5 3.25m3.5-3.25-3.5-3.25M3.75 7.75a4 4 0 0 1 4-4h8.5a4 4 0 0 1 4 4v8.5a4 4 0 0 1-4 4h-8.5a4 4 0 0 1-4-4v-8.5Z"
        />
    </svg>
)

const meta = {
    title: 'Basic Input/Button',
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

export const WithIcon: Story = {
    args: {
        variant: 'default',
        children: 'Action',
        icon: <CompassIcon width={16} height={16} />
    }
}

export const WithoutChildren: Story = {
    args: {
        variant: 'default',
        icon: <CompassIcon width={16} height={16} />
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
        children: 'Button',
        icon: <CompassIcon width={16} height={16} />
    }
}
