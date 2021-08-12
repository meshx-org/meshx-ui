/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from 'react'
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native'
import { useSpring, animated } from '@react-spring/native'

import { body1 } from '../../text'
import ControlGraphics from './ControlGraphics'
import Hoverable from './Hoverable'

type ButtonType = 'primary' | 'secondary'

const getBgColor = (type: ButtonType) => {
  switch (type) {
    case 'primary':
      return '#0396FF'
    case 'secondary':
      return '#FFF'
  }
}

const getTextColor = (type: ButtonType) => {
  switch (type) {
    case 'primary':
      return '#FFF'
    case 'secondary':
      return '#000'
  }
}

const getShadeColor = (type: ButtonType) => {
  switch (type) {
    case 'primary':
      return 'rgba(255,255,255,0.2)'
    case 'secondary':
      return 'rgba(0,0,0,0.056)'
  }
}

interface IProps {
  hovered: boolean
  type: ButtonType
  width: number
}

const ButtonInner: FC<IProps> = ({ hovered, children, type, width }) => {
  const [props, set] = useSpring(() => ({
    opacity: hovered ? 1.0 : 0.0,
    config: { duration: 100 },
  }))

  useEffect(() => {
    set({ opacity: hovered ? 1.0 : 0.0 })
  }, [hovered])

  return (
    <>
      <View style={{ height: 32, position: 'absolute', width: 'auto', }}>
        <ControlGraphics height={ 32 } width={width ?? 1} backgroundColor={getBgColor(type)} />
      </View>

      <animated.View
        style={{
          position: 'absolute',
         zIndex: -1,
          opacity: props.opacity,
          borderRadius: 4,
          width: '100%',
          height: 32,
          backgroundColor: getShadeColor(type),
        }}
      />

      {children}
    </>
  )
}

interface IButtonProps {
  type: ButtonType
  layout: 'fill' | 'fit-left' | 'fit-right' | 'fill-left' | 'fill-right'
  icon?: JSX.Element
  text: string
  onPress?: () => void
}

const Button: FC<IButtonProps> = ({
  type,
  text,
  onPress,
  icon,
  layout = 'fill',
}) => {
  const [buttonWidth, setButtonWidth] = useState(0)

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setButtonWidth(width)
  }

  const isFill = layout.startsWith('fill')
  let justifyContent = 'center'

  const isReverse = layout.endsWith('left')

  switch (layout) {
    case 'fit-left': {
      justifyContent = 'flex-start'
      break
    }
    case 'fit-right': {
      justifyContent = 'flex-end'
      break
    }
    case 'fill-left': {
      justifyContent = 'flex-start'
      break
    }
    case 'fill-right': {
      justifyContent = 'flex-end'
      break
    }
    case 'fill': {
      justifyContent = 'center'
      break
    }
  }

  const buttonChild = (
    <View
      onLayout={handleLayoutChange}
      style={{
        flexDirection: isReverse ? 'row' : 'row-reverse',
        alignItems: 'center',
        justifyContent: justifyContent as any,
        padding: 3,
        flex: 1,
      }}
    >
      {icon}
      <Text

        selectable={false}
        numberOfLines={1}
        style={[
          body1,
          {
            color: getTextColor(type),
            paddingHorizontal: 8,
            alignItems: 'center',
            textAlign: 'center',
            flex: 1,
            fontSize: 14,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  )

  return (
    <Pressable
      focusable={true}
      onPress={() => {
        if (onPress) onPress()
      }}

      accessible={true}

      accessibilityRole="button"
      style={{
        height: 32,
        minWidth: 100,
        //width: isFill ? '100%' : 'auto',
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {({ pressed }: any) => (
        <Hoverable>
          {hovered => <ButtonInner
            type={type}
            hovered={hovered ?? false}
            width={buttonWidth}
            children={buttonChild}
          />}
        </Hoverable>
      )}
    </Pressable>
  )
}

export default Button
