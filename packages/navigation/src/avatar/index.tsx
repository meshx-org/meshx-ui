import React, { useMemo } from 'react'
import { Text } from '@meshx-org/mxui-text'
import { AvatarProps } from './types'
import styled from 'styled-components'

function getInitials(name: string) {
    const fullName = name.split(' ')
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0)
    return initials.toUpperCase()
}

const Stroke = styled.div<{ size: number }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${(props) => props.size / 2}px;
    z-index: 10;
    border: 1px solid ${(props) => (props.theme.name === 'dark' ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)')};
`

const Container = styled.div<{ size: number }>`
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border-radius: ${(props) => props.size / 2}px;
    background: ${(props) => (props.theme.name === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.09)')};
    overflow: hidden;
`

const Initials = styled(Text)<{ size: number }>`
    color: ${(props) => (props.theme.name === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)')};
    font-size: ${(props) => props.size / 3}px;
    z-index: 5;
    font-weight: 600;
`

export function Avatar(props: AvatarProps) {
    const { size = 20, alt = 'Avatar', name, src } = props

    const halfSize = size / 2
    const initials = useMemo(() => getInitials(name), [name])

    const image = {
        width: size,
        height: size,
        zIndex: 5,
        borderRadius: halfSize,
        resizeMode: 'contain'
    }

    let inner: JSX.Element

    if (typeof src === 'string') {
        inner = (
            <img
                width={size}
                height={size}
                alt={`${name}'s avatar`}
                // resizeMode="stretch"
                style={image}
                src={src}
            />
        )
    } else {
        inner = <Initials size={size}>{initials}</Initials>
    }

    return (
        <Container size={size}>
            <Stroke size={size} />
            {inner}
        </Container>
    )
}
