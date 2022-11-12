import React from 'react'
import { Story, Meta } from '@storybook/react'
import { LinkButton, LinkButtonProps } from '@meshx-org/mxui-button/src'

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

const Template: Story<LinkButtonProps> = (args) => <LinkButton {...args} />

export const Primary = Template.bind({})
Primary.args = {
    label: 'test',
    href: '#'
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
    label: 'test',
    href: '#'
}
