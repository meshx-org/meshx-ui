import React, { SVGProps, useRef, useState } from 'react'
import { MouseEvent } from 'react'
import { RatingItemProps, RatingProps } from './Rating.types'
import styled from 'styled-components'

const RatingRoot = styled.span`
    display: flex;
`
const RatingIcon = styled.span``

const RatingItemInput = styled.input`
    border: 0px;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StarBorder = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
        <path
            stroke="#000"
            strokeWidth={1.5}
            d="M5.307 19.323c-.4 1.377 1.174 2.476 2.33 1.628l3.764-2.764a1 1 0 0 1 1.184 0l3.766 2.766c1.155.848 2.728-.251 2.33-1.628l-1.319-4.55c-.112-.387.02-.802.33-1.06 1.034-.861 2.034-1.764 3.045-2.651.994-.871.458-2.508-.857-2.623-1.358-.12-2.715-.226-4.076-.293a1.01 1.01 0 0 1-.889-.632l-1.527-3.822c-.504-1.259-2.285-1.258-2.788 0L9.075 7.517a1.01 1.01 0 0 1-.89.632c-1.356.067-2.71.174-4.064.292-1.315.116-1.851 1.751-.86 2.622 1.01.887 2.007 1.79 3.039 2.651.309.258.44.674.328 1.06l-1.32 4.549Z"
        />
    </svg>
)

const Star = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
        <path
            fill="#000"
            stroke="#000"
            strokeWidth={1.5}
            d="M5.307 19.323c-.4 1.377 1.174 2.476 2.33 1.628l3.764-2.764a1 1 0 0 1 1.184 0l3.766 2.766c1.155.848 2.728-.251 2.33-1.628l-1.319-4.55c-.112-.387.02-.802.33-1.06 1.034-.861 2.034-1.764 3.045-2.651.994-.871.458-2.508-.857-2.623-1.358-.12-2.715-.226-4.076-.293a1.01 1.01 0 0 1-.889-.632l-1.527-3.822c-.504-1.259-2.285-1.258-2.788 0L9.075 7.517a1.01 1.01 0 0 1-.89.632c-1.356.067-2.71.174-4.064.292-1.315.116-1.851 1.751-.86 2.622 1.01.887 2.007 1.79 3.039 2.651.309.258.44.674.328 1.06l-1.32 4.549Z"
        />
    </svg>
)

const defaultIcon = <Star />
const defaultEmptyIcon = <StarBorder />

function clamp(value: number, min: number, max: number) {
    if (value < min) {
        return min
    }
    if (value > max) {
        return max
    }
    return value
}

function getDecimalPrecision(num: number) {
    const decimalPart = num.toString().split('.')[1]
    return decimalPart ? decimalPart.length : 0
}

function roundValueToPrecision(value: number, precision: number) {
    if (value == null) {
        return value
    }

    const nearest = Math.round(value / precision) * precision
    return Number(nearest.toFixed(getDecimalPrecision(precision)))
}

function RatingItem(props: RatingItemProps) {
    const { itemValue, ratingValue, icon, emptyIcon, isActive } = props

    const isFilled = itemValue <= ratingValue

    return (
        <>
            <RatingIcon>{emptyIcon && !isFilled ? emptyIcon : icon}</RatingIcon>
            <RatingItemInput type="radio" value={itemValue} />
        </>
    )
}

export function Rating(props: RatingProps) {
    const {
        max = 5,
        precision = 1,
        value: valueProp,
        defaultValue: defaultProp = 0,
        icon = defaultIcon,
        emptyIcon = defaultEmptyIcon
    } = props

    const rootRef = useRef<HTMLSpanElement>(null)

    const [valueDerived, setValueState] = useState(defaultProp)
    const valueRounded = roundValueToPrecision(valueDerived, precision)

    const [{ hover, focus }, setState] = useState({
        hover: -1,
        focus: -1
    })

    let value = valueRounded
    if (hover !== -1) {
        value = hover
    }
    if (focus !== -1) {
        value = focus
    }

    const handleMouseMove = (event: MouseEvent) => {
        const rootNode = rootRef.current

        if (!rootNode) return

        const { right, left } = rootNode.getBoundingClientRect()
        const { width } = (rootNode.firstChild! as HTMLElement).getBoundingClientRect()

        const percent = (event.clientX - left) / (width * max)

        let newHover = roundValueToPrecision(max * percent + precision / 2, precision)
        newHover = clamp(newHover, precision, max)

        setState((prev) =>
            prev.hover === newHover && prev.focus === newHover
                ? prev
                : {
                      hover: newHover,
                      focus: newHover
                  }
        )
    }

    const handleMouseLeave = (event: MouseEvent) => {}

    const renderRatingItems = (_: number, index: number) => {
        const itemValue = index + 1

        const isActive = itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1)

        const ratingItemProps = {
            icon,
            emptyIcon,
            ratingValue: value,
            ratingValueRounded: valueRounded
        }

        return <RatingItem key={itemValue} {...ratingItemProps} isActive={isActive} itemValue={itemValue} />
    }

    return (
        <RatingRoot ref={rootRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {Array.from(new Array(max)).map(renderRatingItems)}

            {valueRounded}
        </RatingRoot>
    )
}
