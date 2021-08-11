/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'
import { HostComponent, requireNativeComponent } from 'react-native'

const RNControlGraphics: HostComponent<{ style: any, label: string }> = requireNativeComponent('ControlGraphics')

interface IProps {
    width: number
    backgroundColor: string
}

const ControlGraphics: FC<IProps> = ({ width }) => {
    return <RNControlGraphics
        style={{ width, heigth: 38 }}
        label="CustomUserControl!"
    />
}

export default ControlGraphics
