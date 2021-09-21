// YourComponent.stories.ts | YourComponent.stories.tsx

import React, { useState } from 'react'
import { View } from 'react-native'

import { Story, Meta } from '@storybook/react'

import TextField, { ITextFieldProps } from '../components/shared/TextField'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    docs: {
      page: null,
    },
  },
} as Meta

//👇 We create a “template” of how args map to rendering
const TemplateWithState: Story<ITextFieldProps> = (args) => {
  const [input, setInput] = useState('')
  console.log(this)
  return (
    <View style={{ flex: 1, maxWidth: 300 }}>
      <TextField {...args} value={input} onChangeValue={setInput} />
    </View>
  )
}

const TemplateWithoutState: Story<ITextFieldProps> = (args) => {
  return (
    <View style={{ flex: 1, maxWidth: 300 }}>
      <TextField {...args} />
    </View>
  )
}

export const Primary = TemplateWithState.bind({})
Primary.args = {
  placeholder: 'Text here',
}

export const DefaultValue = TemplateWithoutState.bind({})
DefaultValue.args = {
  placeholder: 'Text here',
  defaultValue: 'Hello Input',
}
