import { StyleProps, Validation, InputBase } from '@meshx/mxui-core'
import { ReactNode } from 'react'
import { AriaSwitchProps } from 'react-aria'

export type RenderProps<T> = {
    /** The children of the component. A function may be provided to alter the children based on component state. */
    children?: ReactNode | ((values: T) => ReactNode)
}

export interface ToggleProps extends InputBase, Validation<boolean> /*, FocusableProps*/ {
    /**
     * The label for the element.
     */
    children?: ReactNode
    /**
     * Whether the element should be selected (uncontrolled).
     */
    defaultSelected?: boolean
    /**
     * Whether the element should be selected (controlled).
     */
    isSelected?: boolean
    /**
     * Handler that is called when the element's selection state changes.
     */
    onChange?: (isSelected: boolean) => void
    /**
     * The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).
     */
    value?: string
}

export interface AriaToggleProps extends ToggleProps {
    //FocusableDOMProps,
    //AriaLabelingProps,
    //AriaValidationProps,
    /*InputDOMProps*/
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     */
    'aria-controls'?: string
}

export interface BaseCheckboxProps extends ToggleProps {
    /**
     * Indeterminism is presentational only.
     * The indeterminate visual representation remains regardless of user interaction.
     */
    isIndeterminate?: boolean
}

export interface AriaCheckboxProps extends BaseCheckboxProps, AriaToggleProps {}

export interface CheckboxProps extends AriaCheckboxProps, StyleProps {
    /**
     * This prop sets the emphasized style which provides visual prominence.
     */
    isEmphasized?: boolean

    autoFocus?: boolean
}
