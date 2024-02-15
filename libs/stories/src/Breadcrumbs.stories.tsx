import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'
import { Breadcrumbs } from '@meshx/mxui-navigation'
import { BreadcrumbProps } from '@meshx/mxui-navigation/src/breadcrumbs/types'
import { Link } from '@meshx/mxui-link'

const meta = {
    title: 'Navigation/Breadcrumbs',
    component: Breadcrumbs,
    argTypes: {},
    render: (args) => {
        return (
            <div style={{ width: 300 }}>
                <Breadcrumbs {...args} />
            </div>
        )
    }
} satisfies Meta<typeof Breadcrumbs>

export default meta

type Story = StoryObj<typeof Breadcrumbs>

const ITEMS: BreadcrumbProps[] = [
    { text: 'All files' },
    { text: 'Users' },
    { text: 'Janet' },
    { href: '#', text: 'Photos' },
    { href: '#', text: 'Wednesday' },
    { text: 'image.jpg', current: true }
]

export const Default: Story = {
    args: {
        breadcrumbRenderer(props) {
            return <Link variant="secondary">{props.text ?? props.children}</Link>
        },
        items: ITEMS
    }
}
