import type { StoryObj, Meta } from '@storybook/react'
import { Heading } from './Heading'
import React from 'react'

const meta = {
    title: 'Primitives/Heading',
    component: Heading,
    argTypes: {}
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof Heading>

export const Default: Story = {
    render: (args) => {
        return (
            <div>
                <Heading {...args} children="Display 1" variant="display1" />
                <Heading {...args} children="Display 2" variant="display2" />
                <Heading {...args} children="H1 heading" variant="heading1" />
                <Heading {...args} children="H2 heading" variant="heading2" />
                <Heading {...args} children="H3 heading" variant="heading3" />
                <Heading {...args} children="H4 heading" variant="heading4" />
                <Heading {...args} children="H5 heading" variant="heading5" />
                <Heading {...args} children="H6 heading" variant="heading6" />
            </div>
        )
    },
    args: {}
}
