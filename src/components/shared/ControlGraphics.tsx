/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'
import { Platform, View, HostComponent, requireNativeComponent } from 'react-native'


let RNControlGraphics: HostComponent<{ style: any, label: string }>

if (Platform.OS == "windows") {
  RNControlGraphics = requireNativeComponent('ControlGraphics')
}


interface IProps {
  width: number
  backgroundColor: string
}

const ControlGraphics: FC<IProps> = ({ width, backgroundColor }) => {
  if (Platform.OS == "windows") {
    return <RNControlGraphics
      style={{ width, heigth: 38 }}
      label="CustomUserControl!"
    />
  } else {
    const { Defs, LinearGradient, Stop, Svg } = require('react-native-svg')
    return (
      <>
        <Svg
          width={width}
          height="38"
          fill="none"
          viewBox={`0 0 ${width} 38`}
          focusable={false}
        >
          <rect
            tabIndex={-1}
            width={Math.max(0, width - 1)}
            height="37"
            x="0.5"
            y="0.5"
            stroke="url(#paint0_linear)"
            rx="4"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear"
              x1="159.5"
              x2="159.5"
              y1="1"
              y2="37"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0.906" stopOpacity="0.1" />
              <Stop offset="1" stopOpacity="0.202" />
            </LinearGradient>
          </Defs>
        </Svg>
        <View
          style={{
            position: 'absolute',
            flex: 1,
            zIndex: -1,
            borderRadius: 4,
            width,
            height: 38,
            margin: 1,
            backgroundColor,
          }}
        />
      </>
    )
  }
}

export default ControlGraphics
