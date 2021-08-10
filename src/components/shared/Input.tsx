/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import ControlGraphics from './ControlGraphics'

const styles = StyleSheet.create({
  input: {
    height: 38,
    width: 319,
    position: 'absolute',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 6,
    fontSize: 14,
    lineHeight: 14,
    borderRadius: 4,
    fontFamily: 'Work Sans',
    textAlignVertical: 'auto',
    borderBottomWidth: 2,
  },
})

interface IProps {
  placeholder?: string
}

const BasicInput: FC<IProps> = ({ placeholder }) => {
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <View style={{ height: 38 }} focusable={false}>
      <ControlGraphics width={319} />
      <View
        style={{
          position: 'absolute',
          zIndex: -1,
          borderRadius: 5,
          width: 319,
          height: 38,
          backgroundColor: '#FFF',
        }}
      />

      <TextInput
        focusable={true}
        placeholder={placeholder}

        //autoCompleteType="email"
        textContentType="nameSuffix"
        
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          { borderBottomColor: focused ? '#0396FF' : 'transparent' },
        ]}
        value={input}
        onChangeText={setInput}
      />
    </View>
  )
}

export default BasicInput
