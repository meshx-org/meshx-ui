import type { StoryObj, Meta } from '@storybook/react'
import { Link } from '@meshx-org/mxui-link/src'
import React from 'react'

const meta = {
    title: 'Navigation/Link',
    component: Link,
    argTypes: {},
    render: (args) => {
        return (
            <div style={{ width: 300 }}>
                <Link {...args}>
                    <a href="https://www.imdb.com/title/tt6348138/" target="_blank">
                        The missing link.
                    </a>
                </Link>
            </div>
        )
    }
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof Link>

export const Primary: Story = {
    args: {
        variant: 'primary'
    }
}

export const Secondary: Story = {
    args: {
        variant: 'secondary'
    }
}

export const StringContent: Story = {
    render: (args) => {
        return (
            <div style={{ width: 300 }}>
                <Link {...args}>The missing link.</Link>
            </div>
        )
    },
    args: {
        variant: 'primary',
        onClick: () => {
            console.log('clicked')
        }
    }
}
