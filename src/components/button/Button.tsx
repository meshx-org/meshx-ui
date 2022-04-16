/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react'
import { LayoutChangeEvent, Pressable, View, Text as RNText, Animated } from 'react-native'

import ControlSurface from '../surface/ControlSurface'
import styles from './Button.styles'
import type { ButtonAppearance, ButtonComponent, PressableState } from './Button.types'

const getBgColor = (type: ButtonAppearance) => {
  if (type === 'primary') {
    return '#0396FF'
  }

  return 'white'
}

const getShadeColor = (type: ButtonAppearance) => {
  if (type === 'primary') {
    return 'rgba(255,255,255,0.2)'
  }

  return 'rgba(0,0,0,0.056)'
}

const Button: ButtonComponent = ({ apparance, children, ...props }) => {
  const [buttonWidth, setButtonWidth] = useState(0)

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setButtonWidth(width)
  }

  return (
    <Pressable
      {...props}
      focusable={true}
      accessibilityRole="button"
      style={styles.button}
      onLayout={handleLayoutChange}
    >
      {({ pressed, hovered }: PressableState) => (
        <Animated.View style={{ opacity: new Animated.Value(hovered ? 0.7 : 1) }}>
          <View style={[styles.gfxBorder]}>
            <ControlSurface height={34} width={buttonWidth ?? 1} backgroundColor={getBgColor(apparance)} />
          </View>

          <View style={[styles.gfxOverlay, { backgroundColor: getShadeColor(apparance) }]} />

          <View style={[styles.content]}>{children}</View>
        </Animated.View>
      )}
    </Pressable>
  )
}

Button.Text = ({ children, style, ...props }) => (
  <RNText {...props} selectable={false} numberOfLines={1} style={[style, styles.text]}>
    {children}
  </RNText>
)

export default Button
