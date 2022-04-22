/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { Text, View } from 'react-native'

import { Story, Meta } from '@storybook/react'

import MXButton from '../components/next/button/Button'
import { ButtonProps } from '../components/next/button/Button.types'

// 👇 This default export determines where your story goes in the story list
export default {
    title: 'Components/Button',
    component: MXButton,
    parameters: {
        grid: { cellSize: 1 },
        docs: {
            page: null
        }
    }
} as Meta

// 👇 We create a “template” of how args map to rendering
const Template: Story<ButtonProps> = (args) => (
    <View style={{ alignSelf: 'flex-start' }}>
        <MXButton {...args} />
    </View>
)

export const Primary = Template.bind({})
Primary.args = {
    apparance: 'primary',
    children: (
        <Text
            selectable={false}
            numberOfLines={1}
            style={{
                color: 'white',
                paddingHorizontal: 12,
                fontFamily: 'Open Sans',
                fontSize: 13
            }}
        >
            Button
        </Text>
    )
}

export const Secondary = Template.bind({})
Secondary.args = {
    apparance: 'subtle',
    children: (
        <Text
            selectable={false}
            numberOfLines={1}
            style={{
                paddingHorizontal: 12,
                fontFamily: 'Open Sans',
                fontSize: 13
            }}
        >
            Button
        </Text>
    )
}

export const Disabled = Template.bind({})
Disabled.args = {
    apparance: 'subtle',
    disabled: true,
    children: (
        <Text
            selectable={false}
            numberOfLines={1}
            style={{
                paddingHorizontal: 12,
                fontFamily: 'Open Sans',
                fontSize: 13
            }}
        >
            Button
        </Text>
    )
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    apparance: 'primary',
    children: (
        <>
            <View style={{ width: 28, height: 28, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 2 }} />
            <Text
                selectable={false}
                numberOfLines={1}
                style={{
                    color: 'white',
                    paddingHorizontal: 12,
                    fontFamily: 'Open Sans',
                    fontSize: 13
                }}
            >
                Button
            </Text>
        </>
    )
}
