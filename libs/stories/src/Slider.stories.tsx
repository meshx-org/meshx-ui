import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Slider, SliderProps } from '@meshx/mxui'

const meta: Meta = {
    title: 'Form/Slider',
    component: Slider,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
}

const Template: Story<SliderProps> = (args) => <Slider {...args} />

export const Rest = Template.bind({})
Rest.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}

export default meta
