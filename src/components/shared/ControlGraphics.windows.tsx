/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'
import { HostComponent, requireNativeComponent } from 'react-native'

const CustomUserControl: HostComponent<{ style: any, label: string }> = requireNativeComponent('TestControl')

interface IProps {
    width: number
    backgroundColor: string
}

const ControlGraphics: FC<IProps> = ({ width }) => {
    return <CustomUserControl
        style={{ width, heigth: 38 }}
        label="CustomUserControl!"
    />
}

export default ControlGraphics
