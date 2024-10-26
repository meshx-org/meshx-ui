import React from 'react'
import { FormGroupProps } from './FormGroup.types'
import { Text } from '@meshx/mxui-text'
import styled from 'styled-components'
import { sx } from '@meshx/mxui-core'
import styles from './FormGroup.module.scss'

const Label = styled.label`
    margin-bottom: calc(12px * 0.5);
    font-size: var(--theme-font-size-1);
`

const FormHelperText = styled.div`
    color: var(--theme-text-secondary);
    font-size: var(--theme-font-size-0);
    margin-top: calc(12px * 0.5);
`

const TextMuted = styled.span`
    color: var(--theme-text-secondary);
`

const FormContent = styled.div``

function FormGroup(props: FormGroupProps, ref: any) {
    const { children, helperText, label, labelFor, labelInfo, subLabel } = props

    return (
        <div className={styles.FormGroup} css={sx(props)} ref={ref}>
            {label && (
                <Text htmlFor={labelFor}>
                    {label} <Text sx={{ color: 'text.secondary' }}>{labelInfo}</Text>
                </Text>
            )}
            {subLabel && <div className={styles.FormGroupSubLabel}>{subLabel}</div>}
            <FormContent>
                {children}
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormContent>
        </div>
    )
}

/**
 * A InfoBar is a content container that displays non-editable content separate from other content on the screen.
 * Often this is used to display preformatted text, such as code/markup examples on a documentation page.
 */
const _FormGroup = React.forwardRef(FormGroup)
export { _FormGroup as FormGroup }
