import React, { useMemo } from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../../provider/ThemeProvider'
import { PersonProps } from './Person.types'

function getInitials(name: string) {
    const fullName = name.split(' ')
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0)
    return initials.toUpperCase()
}

export function Person(props: PersonProps) {
    const { size, name, image } = props

    const theme = useTheme()
    const halfSize = size / 2
    const isDark = theme === 'dark'
    const initials = useMemo(() => getInitials(name), [name])

    const style = useMemo(() => {
        const sheet = StyleSheet.create({
            container: {
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: size,
                height: size,
                borderRadius: halfSize,
                backgroundColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.09)',
                overflow: 'hidden'
            },
            image: {
                width: size,
                height: size,
                zIndex: 5,
                borderRadius: halfSize,
                resizeMode: 'contain'
            },
            initials: {
                color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
                fontSize: size / 3,
                zIndex: 5,
                fontWeight: '600'
            },
            border: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: halfSize,
                zIndex: 10,
                borderWidth: 1,
                borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)'
            }
        })

        return sheet
    }, [isDark, size])

    let inner: JSX.Element

    if (typeof image === 'string') {
        inner = (
            <Image
                width={size}
                height={size}
                accessibilityLabel={`${name}'s avatar`}
                resizeMode="stretch"
                style={style.image}
                source={{ uri: image }}
            />
        )
    } else {
        inner = (
            <Text accessibilityLabel={`${name}'s initials`} style={style.initials}>
                {initials}
            </Text>
        )
    }

    return (
        <View style={style.container}>
            <View style={style.border} />
            {inner}
        </View>
    )
}
