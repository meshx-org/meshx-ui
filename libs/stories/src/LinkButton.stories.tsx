import React from 'react'
import { Story, Meta } from '@storybook/react'
import { LinkButton, LinkButtonProps } from '@meshx/mxui'
import { Text } from '@meshx/mxui'

export default {
    title: 'Basic Input/LinkButton',
    component: LinkButton,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

const Template: Story<LinkButtonProps<unknown>> = (args: any) => (
    <div style={{ display: 'flex' }}>
        <LinkButton {...args} />
    </div>
)

export const Primary = Template.bind({})
Primary.args = {
    children: [<Text>😄</Text>, <Text>Text</Text>],
    href: '#'
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
    href: '#'
}
