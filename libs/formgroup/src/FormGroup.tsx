import React from 'react'
import { FormGroupProps } from './FormGroup.types'
import styled from 'styled-components'

const FormGroupStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 calc(12px * 1.5);
`

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

const FormGroupSubLabel = styled.div`
    color: var(--theme-text-secondary);
    font-size: var(--theme-font-size-0);
    margin-bottom: calc(12px * 0.5);
`

export function FormGroup(props: FormGroupProps) {
    const { children, helperText, label, labelFor, labelInfo, subLabel } = props

    return (
        <FormGroupStyled>
            {label && (
                <Label htmlFor={labelFor}>
                    {label} <TextMuted>{labelInfo}</TextMuted>
                </Label>
            )}
            {subLabel && <FormGroupSubLabel>{subLabel}</FormGroupSubLabel>}
            <FormContent>
                {children}
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormContent>
        </FormGroupStyled>
    )
}

FormGroup.displayName = `FormGroup`
