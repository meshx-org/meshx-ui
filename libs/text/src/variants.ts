const displayVariants = {
    display1: {
        fontFamily: 'default',
        fontSize: 8,
        fontWeight: 700
    },
    display2: {
        fontFamily: 'default',
        fontSize: 7,
        fontWeight: 700
    }
}

const hVariants = {
    heading1: {
        fontFamily: 'default',
        fontSize: 6,
        fontWeight: 700
    },
    heading2: {
        fontFamily: 'default',
        fontSize: 5,
        fontWeight: 700
    },
    heading3: {
        fontFamily: 'default',
        fontSize: 4,
        fontWeight: 700
    },
    heading4: {
        fontFamily: 'default',
        fontSize: 3,
        fontWeight: 700
    },
    heading5: {
        fontFamily: 'default',
        fontSize: 2,
        fontWeight: 700
    },
    heading6: {
        fontFamily: 'default',
        fontSize: 1,
        fontWeight: 700
    }
}

export const headingVariants = {
    ...displayVariants,
    ...hVariants
}

export const textVariants = {
    body: {
        fontFamily: 'default',
        lineHeight: 'body',
        fontWeight: 400,
        fontSize: 1
    },
    'body.medium': {
        fontFamily: 'default',
        lineHeight: 'body',
        fontWeight: 500,
        fontSize: 1
    },
    'body.semibold': {
        fontFamily: 'default',
        lineHeight: 'body',
        fontWeight: 600,
        fontSize: 1
    },
    'body.bold': {
        fontFamily: 'default',
        lineHeight: 'body',
        fontWeight: 700,
        fontSize: 1
    },
    bodyLarge: {
        fontFamily: 'default',
        lineHeight: 'body',
        fontWeight: 400,
        fontSize: 2
    },
    bodyLargeAlt: {
        fontFamily: 'default',
        lineHeight: 'body',
        fontWeight: 600,
        fontSize: 2
    },
    caption: {
        fontFamily: 'default',
        lineHeight: 'body',
        opacity: 0.8,
        fontWeight: 400,
        fontSize: 0
    },
    captionAlt: {
        fontFamily: 'default',
        lineHeight: 'body',
        opacity: 0.8,
        fontWeight: 600,
        fontSize: 0
    }
}
