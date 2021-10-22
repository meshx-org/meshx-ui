/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useMemo } from 'react'
import { Rect } from 'react-native-svg'

interface IProps {
  width: number
  height: number
}

const ControlGraphics: FC<IProps> = ({ width, height }) => {
  let id = useMemo(() => {
    let randomId = Math.random() * 1000000000
    return `button_gradient${randomId}`
  }, [])

  const { Defs, LinearGradient, Stop, Svg } = require('react-native-svg')

  return (
    <Svg
      width={width}
      height="100%"
      fill="transparent"
      //viewBox={`0 0 100px 34px`}
      focusable={false}
    >
      <Rect
        //tabIndex={-1}
        width={width - 1}
        height={'calc(100% - 1px)'}
        x="0.5px"
        y="0.5px"
        stroke={`url(#${id})`}
        rx="3.5"
      />
      <Defs>
        <LinearGradient
          id={id}
          x1="100%"
          x2="100%"
          y1="0"
          y2={height - 1}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.9" stopOpacity="0.08" />
          <Stop offset="1" stopOpacity="0.2" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default ControlGraphics
