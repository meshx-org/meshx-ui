// YourComponent.stories.ts | YourComponent.stories.tsx

import React, { ComponentProps } from 'react'
import { View } from 'react-native'

import { Story, Meta } from '@storybook/react'

import {
  Title,
  Subtitle,
  Description,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs'

import MXButton, { IButtonProps } from '../components/shared/Button'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Button',
  component: MXButton,
  parameters: {
    docs: { 
      page: null 
    },
  },
} as Meta

//👇 We create a “template” of how args map to rendering
const Template: Story<IButtonProps> = (args) => (
 
  <View style={{ alignSelf: 'flex-start' }}>
    <MXButton {...args} />
  </View>
)

export const Primary = Template.bind({})
Primary.args = {
  apparance: 'primary',
  text: 'Primary',
}

export const Secondary = Template.bind({  })
Secondary.args = {
  apparance: 'secondary',
  text: 'Secondary',
  
}
