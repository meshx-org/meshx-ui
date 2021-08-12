/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'
import { Platform, View, HostComponent, requireNativeComponent } from 'react-native'


let RNControlGraphics: HostComponent<{ style: any, label: string }>

if (Platform.OS == "windows") {
  RNControlGraphics = requireNativeComponent('ControlGraphics')
  console.log(RNControlGraphics)
}

interface IProps {
  width: number
  height: number
  backgroundColor: string
}

const ControlGraphics: FC<IProps> = ({ width, height, backgroundColor }) => {
  if (Platform.OS == "windows") {
    return <RNControlGraphics
      style={{ width, height }}
      label="CustomUserControl!"
    />
  } else {
    const { Defs, LinearGradient, Stop, Svg } = require('react-native-svg')
    return (
      <Svg
        width={width}
        height="38"
        fill={backgroundColor}
        viewBox={`0 0 ${width} ${height}`}
        focusable={false}
      >
        <rect
          tabIndex={-1}
          width={Math.max(0, width - 1)}
          height={height - 1}
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
            y2={height - 1}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0.906" stopOpacity="0.08" />
            <Stop offset="1" stopOpacity="0.202" />
          </LinearGradient>
        </Defs>
      </Svg>
    )
  }
}

export default ControlGraphics
