import React from 'react'
import { Story, Meta } from '@storybook/react'
import { DateBox, DateBoxPropsBase } from '@meshx/mxui-datebox'
import { DateValue, parseAbsoluteToLocal } from '@internationalized/date'

const meta: Meta = {
    title: 'Form/DateBox',
    component: DateBox,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        }
    }
}

const DateBoxTemplate: Story<DateBoxPropsBase<DateValue>> = (args) => {
    return <DateBox granularity="second" defaultValue={parseAbsoluteToLocal('2021-11-07T07:45:00Z')} {...args} />
}

export const Rest = DateBoxTemplate.bind({})
Rest.args = {}

export default meta
