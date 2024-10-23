import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Overlay, OverlayProps2 } from '@meshx/mxui'

const argTypes = {
    placement: {
        control: 'radio',
        defaultValue: 'top',
        options: ['top', 'bottom', 'left', 'right']
    },
    variant: {
        control: 'radio',
        defaultValue: undefined,
        options: [undefined, 'neutral', 'info', 'positive', 'negative']
    },
    showIcon: {
        control: 'boolean',
        defaultValue: false
    },
    isOpen: {
        // control: { disable: true }
    }
}

export default {
    title: 'Containers/Overlay',
    component: Overlay,
    argTypes: argTypes
} as Meta

const OverlayTemplate: Story<OverlayProps2> = (args) => <Overlay {...args} />

export const Default = OverlayTemplate.bind({})
Default.args = {
    isOpen: true,
    children: 'Button'
}
