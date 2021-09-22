/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react'
import {
  LayoutChangeEvent,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native'

import ControlGraphics from './ControlGraphics'
import Hoverable from './Hoverable'

type ButtonAppearance = 'primary' | 'secondary'
type ButtonLayout =
  | 'fill'
  | 'fit-left'
  | 'fit-right'
  | 'fill-left'
  | 'fill-right'

const getBgColor = (type: ButtonAppearance) => {
  switch (type) {
    case 'primary':
      return '#0396FF'
    case 'secondary':
      return 'white'
  }
}

const getTextColor = (type: ButtonAppearance) => {
  switch (type) {
    case 'primary':
      return '#FFF'
    case 'secondary':
      return '#000'
  }
}

const getShadeColor = (type: ButtonAppearance) => {
  switch (type) {
    case 'primary':
      return 'rgba(255,255,255,0.2)'
    case 'secondary':
      return 'rgba(0,0,0,0.056)'
  }
}

const styles = StyleSheet.create({
  button: {
    height: 34,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    //alignSelf: 'flex-start',
    height: 34,
    flex: 1,
    flexDirection: "row",
    padding: 3
  },
  gfxBackground: {
    borderRadius: 4,
    height: 34,
    position: 'absolute',
    //right: 0,
    left: 0,
  },
  gfxBorder: { height: 34, position: 'absolute', right: 0, left: 0 },
  gfxOverlay: {
    position: 'absolute',
    zIndex: -1,
    borderRadius: 4,
    right: 0,
    left: 0,
    height: 34,
  },
  label: {},
})

interface IGraphicsProps {
  hovered: boolean
  apparance: ButtonAppearance
  width: number
}

const ButtonGraphics: FC<IGraphicsProps> = ({ hovered, apparance, width }) => {
  return (
    <>
      <View
        style={[
          styles.gfxBackground,
          {
            backgroundColor: getBgColor(apparance),
            width: width ?? 1,
          },
        ]}
      />
      <View style={styles.gfxBorder}>
        <ControlGraphics height={34} width={width ?? 1} />
      </View>

      <View
        style={[
          styles.gfxOverlay,
          {
            backgroundColor: getShadeColor(apparance),
          },
        ]}
      />
    </>
  )
}

interface IButtonContent {
  apparance: ButtonAppearance
  layout: ButtonLayout
  onWidthChange: (width: number) => void
  icon?: JSX.Element
  text: string
}

const ButtonContent: FC<IButtonContent> = (props) => {
  const { onWidthChange, icon, text, apparance, layout } = props

  const isReverse = layout.endsWith('left')
  let justifyContent = 'center'

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

  return null
}

export interface IButtonProps {
  apparance: ButtonAppearance
  layout: ButtonLayout
  icon?: JSX.Element
  text: string
  onPress?: () => void
}

const Button: FC<IButtonProps> = ({
  apparance,
  text,
  onPress,
  icon,
  layout = 'fill',
}) => {
  const [buttonWidth, setButtonWidth] = useState(0)

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width
    setButtonWidth(width)
  }

  return (
    <Pressable
      focusable={true}
      accessible={true}
      accessibilityRole="button"
      onPress={() => {
        if (onPress) onPress()
      }}
      style={styles.button}
      onLayout={handleLayoutChange}
    >
      {({ pressed }: any) => (
        <Hoverable>
          {(hovered) => (
            <>
              <ButtonGraphics
                apparance={apparance}
                hovered={hovered ?? false}
                width={buttonWidth}
              />

              <View style={styles.content}>
                {icon}
                <Text
                  selectable={false}
                  numberOfLines={1}
                  style={{
                    color: getTextColor(apparance),
                    paddingHorizontal: 12,
                    alignItems: 'center',
                    textAlign: 'center',
                    fontFamily: 'Open Sans',
                    fontSize: 13,
                  }}
                >
                  {text}
                </Text>
              </View>
            </>
          )}
        </Hoverable>
      )}
    </Pressable>
  )
}

export default Button
