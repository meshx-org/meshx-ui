import type { StoryObj, Meta } from '@storybook/react'
import { InfoBar } from '@meshx-org/mxui-infobar/src'
import React from 'react'
import { Text } from '@meshx-org/mxui-text'

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
