import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Avatar, AvatarProps } from '@meshx/mxui-navigation'

const argTypes = {
    size: {
        options: [20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 96, 120, 128],
        defaultValue: 44,
        control: { type: 'radio' }
    }
}

export default {
    title: 'Navigation/Avatar',
    component: Avatar,
    argTypes: argTypes
} as Meta

const AvatarTemplate: Story<AvatarProps> = (args) => {
    return <Avatar {...args} />
}

export const Default = AvatarTemplate.bind({})
Default.args = {
    size: 44,
    name: 'John Doe',
    src: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=96&q=100'
}
