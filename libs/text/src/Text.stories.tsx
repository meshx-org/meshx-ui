import type { StoryObj, Meta } from '@storybook/react'
import { Text } from './Text'
import React from 'react'

const meta = {
    title: 'Primitives/Text',
    component: Text,
    argTypes: {}
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
    render: (args) => {
        return (
            <div>
                <Text {...args} variant="body" children="Body" />
                <Text {...args} variant="body.large" children="Body Large" />
                <Text {...args} variant="body.bold" children="Body Bold" />
                <Text {...args} variant="body.large.semibold" children="Body Large Semi" />
                <Text {...args} variant="body.medium" children="Body Medium" />
                <Text {...args} variant="body.semibold" children="Body Semi" />
                <Text {...args} variant="caption" children="Caption" />
                <Text {...args} variant="captionAlt" children="Caption Alt" />
            </div>
        )
    },
    args: {
        as: 'p'
    }
}
