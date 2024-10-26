import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'
import { InfoBar } from './InfoBar'
import { Text } from '@meshx/mxui-text'

const meta = {
    title: 'Status/InfoBar',
    component: InfoBar,
    argTypes: {
        title: {
            defaultValue: 'Title'
        }
    },
    render: (args) => {
        return (
            <div>
                <InfoBar {...args}>
                    <Text>Hello</Text>
                </InfoBar>
            </div>
        )
    }
} satisfies Meta<typeof InfoBar>

export default meta

type Story = StoryObj<typeof InfoBar>

export const Default: Story = {
    args: {
        title: 'Title',
        description: 'This is Body text. MeshX is faster and more intuitive.'
    }
}


export const Info: Story = {
    args: {
        title: 'Info',
        description: 'This is Body text. MeshX is faster and more intuitive.',
        variant: "info"
    }
}

export const Warning: Story = {
    args: {
        title: 'Warning',
        description: 'This is Body text. MeshX is faster and more intuitive.',
        variant: "warning"
    }
}

export const Danger: Story = {
    args: {
        title: 'Danger',
        description: 'This is Body text. MeshX is faster and more intuitive.',
        variant: "danger"
    }
}

export const Success: Story = {
    args: {
        title: 'Success',
        description: 'This is Body text. MeshX is faster and more intuitive.',
        variant: "success"
    }
}
