import React from 'react'
import { Story, Meta } from '@storybook/react'
import { View } from 'react-native'
import Divider from '../components/divider/Divider'
import Button from '../components/button/Button'

export default {
    title: 'Components/Divider',
    component: Divider,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

const Template: Story<{ vertical: boolean }> = ({ vertical }) =>
    vertical ? (
        <View>
            <Button>Button1</Button>
            <Divider />
            <Button>Hello</Button>
        </View>
    ) : (
        <View style={{ flexDirection: 'row' }}>
            <Button>Hello</Button>
            <Divider />
            <Button>Hello</Button>
        </View>
    )

export const Default = Template.bind({ test: 'true' })
Default.args = { vertical: false }
