import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useThemeValues } from '../../context/ThemeProvider'

const styles = StyleSheet.create({
    divider: { margin: 5, borderRightWidth: 1, borderBottomWidth: 1 }
})

function Divider() {
    const values = useThemeValues()
    return <View style={[styles.divider, { borderColor: values.stoke.divider }]} />
}

export default Divider
