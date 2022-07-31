import React from 'react'

export interface TextBlockProps {
    children?: React.ReactNode
    variant?: 'caption' | 'body' | 'title' | 'subtitle' | string
    ssTextSelectionEnabled?: string
    selectionHighlightColor?: string
}
