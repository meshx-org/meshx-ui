import React from 'react'
import { View } from 'react-native'
import { TextBlock } from '../text-block/TextBlock'
import { FormGroupProps } from './FormGroup.types'

function FormGroup({ label, labelInfo, helper, inline, disabled, children }: FormGroupProps) {
    const defaultStyles = { margin: 16 }

    return (
        <View style={defaultStyles}>
            <TextBlock variant="body" mb={1}>
                {label} <TextBlock opacity={0.75}>{labelInfo}</TextBlock>
            </TextBlock>
            {children}
            <TextBlock variant="caption" mt={1}>
                {helper}
            </TextBlock>
        </View>
    )
}

export default FormGroup
