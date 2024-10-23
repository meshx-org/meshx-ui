import type { StoryObj, Meta } from '@storybook/react'
import { Link } from '@meshx/mxui'
import { Text } from '@meshx/mxui'
import React from 'react'

const meta = {
    title: 'Navigation/Link',
    component: Link,
    argTypes: {},
    render: (args) => {
        return (
            <Text variant="body.large">
                The missing <Link {...args}></Link>.
            </Text>
        )
    }
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof Link>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'link'
    }
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'link'
    }
}

export const AsASpan: Story = {
    argTypes: {
        onClick: { action: 'clicked' }
    },
    args: {
        as: 'span',
        children: 'link',
        onClick: () => {}
    }
}
