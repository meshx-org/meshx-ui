import { styleFn, compose, variant, VariantArgs } from 'styled-system'


export interface SpaceStyleProps {
    m?: number
    mt?: number
    mr?: number
    mb?: number
    ml?: number
    mx?: number
    my?: number
    margin?: number
    marginTop?: number
    marginRight?: number
    marginBottom?: number
    marginLeft?: number
    marginX?: number
    marginY?: number

    p?: number
    pt?: number
    pr?: number
    pb?: number
    pl?: number
    px?: number
    py?: number
    padding?: number
    paddingTop?: number
    paddingRight?: number
    paddingBottom?: number
    paddingLeft?: number
    paddingX?: number
    paddingY?: number
}

export interface ColorStyleProps {
    color?: string
    bg?: string
    backgroundColor?: string
    opacity?: number
}

export interface TypographyStyleProps {
    fontFamily?: string
    fontSize?: number
    fontWeight?: number
    lineHeight?: number
    letterSpacing?: number
    textAlign?: string
    fontStyle?: string
}

export function useNativeStyle(props: any, ...functions: styleFn[]) {
    return compose(...functions)(props)
}

export function useNativeVariant(props: any, variants: VariantArgs<object, any, any>['variants'], propName: string) {
    return variant({
        prop: propName,
        variants
    })(props)
}
