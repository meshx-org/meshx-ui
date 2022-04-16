/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react'
import { View, TextInput, StyleSheet, LayoutChangeEvent } from 'react-native'
import ControlSurface from '../surface/ControlSurface'

const styles = StyleSheet.create({
  input: {
    height: 34,

    position: 'absolute',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 6,

    lineHeight: 14,
    borderRadius: 4,
    fontFamily: 'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;',
    fontSize: 13,
    textAlignVertical: 'auto',
    borderBottomWidth: 2
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    borderRadius: 5,

    height: 34,
    backgroundColor: '#FFF'
  }
})

export interface ITextFieldProps {
  placeholder?: string
  maxLength?: number
  secure?: boolean
  defaultValue?: string
  value?: string
  onChangeValue?: (value: string) => void
}

const TextField: FC<ITextFieldProps> = ({ placeholder, maxLength, defaultValue, secure, value, onChangeValue }) => {
  const [focused, setFocused] = useState(false)
  const [fieldWidth, setFieldWidth] = useState(0)

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setFieldWidth(width)
  }

  return (
    <View style={{ height: 34 }} focusable={false} onLayout={handleLayoutChange}>
      <ControlSurface backgroundColor="transparent" width={fieldWidth} height={34} />

      <View style={[styles.background, { width: fieldWidth }]} />

      <TextInput
        focusable={true}
        placeholder={placeholder}
        maxLength={maxLength}
        defaultValue={defaultValue}
        secureTextEntry={secure}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          {
            borderBottomColor: focused ? '#0396FF' : 'transparent',
            width: fieldWidth
          }
        ]}
        value={value}
        onChangeText={onChangeValue}
      />
    </View>
  )
}

export default TextField
