import type { StoryObj, Meta } from '@storybook/react'
import { Link } from '@meshx-org/mxui-link/src'
import { Text } from '@meshx-org/mxui-text/src'
import React from 'react'

const meta = {
    title: 'Navigation/Link',
    component: Link,
    argTypes: {},
    render: (args) => {
        return (
            <Text variant="bodyLarge">
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
    args: {
        as: 'span',
        children: 'link',
        onClick: () => {}
    }
}
