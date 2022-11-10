interface IColors {
    text: string
    accentText: string
    textOnAccent: string
}

export const dark: IColors = {
    text: '#f8f8f2',
    accentText: '#f8f8f2',
    textOnAccent: ''
}

export const light: IColors = {
    text: '#f8f8f2',
    accentText: '',
    textOnAccent: ''
}

export const surfaceVariants = {
    layer: {},
    card: {},
    flyout: {}
}

export const textVariants = {
    heading1: {
        fontSize: 6,
        fontWeight: 600
    },
    heading2: {
        fontSize: 5,
        fontWeight: 600
    },
    heading3: {
        fontSize: 4,
        fontWeight: 600
    },
    heading4: {
        fontSize: 3,
        fontWeight: 600
    },
    heading5: {
        fontSize: 2,
        fontWeight: 600
    },
    heading6: {
        fontSize: 1,
        fontWeight: 600
    },
    bodyLarge: {
        // fontFamily: 'SF Pro',
        lineHeight: 'body',
        fontSize: 2
    },
    body: {
        lineHeight: 'body',
        fontWeight: '400',
        fontSize: 1
    },
    bodyStrong: {
        lineHeight: 'body',
        fontWeight: 'bold',
        fontSize: 1
    },
    caption: {
        lineHeight: 'body',
        opacity: 0.8,
        fontWeight: '400',
        fontSize: 0
    }
}
