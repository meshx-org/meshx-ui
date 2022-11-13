const displayVariants = {
display1: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        fontSize: 8,
        fontWeight: 700
    },
    display2: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        fontSize: 7,
        fontWeight: 700
    },
}

const hVariants = {
    heading1: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        fontSize: 6,
        fontWeight: 700
    },
    heading2: {
        color: 'text.primary', 
        fontFamily: 'Noto Sans',
        fontSize: 5,
        fontWeight: 700
    },
    heading3: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        fontSize: 4,
        fontWeight: 700
    },
    heading4: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        fontSize: 3,
        fontWeight: 700
    },
    heading5: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        fontSize: 2,
        fontWeight: 700
    },
    heading6: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        fontSize: 1,
        fontWeight: 700
    },
}

export const headingVariants = {
    ...displayVariants,
    ...hVariants,
}

export const textVariants = {
    body: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        lineHeight: 'body',
        fontWeight: '400',
        fontSize: 1
    },
    bodyAlt: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        lineHeight: 'body',
        fontWeight: 600,
        fontSize: 1
    },
    caption: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        lineHeight: 'body',
        opacity: 0.8,
        fontWeight: '400',
        fontSize: 0
    },
    captionAlt: {
        color: 'text.primary',
        fontFamily: 'Noto Sans',
        lineHeight: 'body',
        opacity: 0.8,
        fontWeight: 600,
        fontSize: 0
    }
}