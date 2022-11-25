import React from "react"
import { Story, Meta } from '@storybook/react'
import { AnchoredOverlay, AnchoredOverlayProps } from '@meshx-org/mxui-overlays/src'
import { Button } from '@meshx-org/mxui-button/src'

const argTypes = {
    placement: {
        control: 'select',
        defaultValue: 'bottom',
        options: [
            'bottom',
            'bottom left',
            'bottom right',
            'bottom start',
            'bottom end',
            'top',
            'top left',
            'top right',
            'top start',
            'top end',
            'left',
            'left top',
            'left bottom',
            'start',
            'start top',
            'start bottom',
            'right',
            'right top',
            'right bottom',
            'end',
            'end top',
            'end bottom'
        ]
    },
    delay: {
        control: 'number',
        defaultValue: 1500,
        min: 0,
        max: 50000,
        step: 500
    },
    offset: {
        control: 'number',
        defaultValue: 0,
        min: -500,
        max: 500
    },
    crossOffset: {
        control: 'number',
        defaultValue: 0,
        min: -500,
        max: 500
    },
    containerPadding: {
        control: 'number',
        defaultValue: 0,
        min: -500,
        max: 500
    },
    isDisabled: {
        control: 'boolean',
        defaultValue: false
    },
    shouldFlip: {
        control: 'boolean',
        defaultValue: true
    },
    trigger: {
        control: 'radio',
        defaultValue: undefined,
        options: [undefined, 'focus']
    },
    children: {
        control: { disable: true }
    }
}

const disabledArgTypes = {
    placement: {
        control: { disable: true }
    },
    delay: {
        control: { disable: true }
    },
    offset: {
        control: { disable: true }
    },
    crossOffset: {
        control: { disable: true }
    },
    containerPadding: {
        control: { disable: true }
    },
    isDisabled: {
        control: { disable: true }
    },
    shouldFlip: {
        control: { disable: true }
    },
    trigger: {
        control: { disable: true }
    },
    children: {
        control: { disable: true }
    }
}

export default {
    title: 'Containers/AnchoredOverlay',
    component: AnchoredOverlay,
    argTypes: argTypes
} as Meta

const AnchoredOverlayTemplate: Story<AnchoredOverlayProps> = (args) => <AnchoredOverlay {...args} />

export const Default = AnchoredOverlayTemplate.bind({})
Default.args = {
    children: [<Button>target</Button>, <div>overlay</div>]
    // onOpenChange: action('openChange')
}
 