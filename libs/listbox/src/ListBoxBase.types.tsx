export interface FormGroupProps {
    /** Group contents. */
    children?: React.ReactNode

    /**
     * Whether form group should appear as non-interactive.
     * Remember that `input` elements must be disabled separately.
     */
    disabled?: boolean

    /** Optional helper text. The given content will be wrapped in Classes.FORM_HELPER_TEXT and displayed beneath children. Helper text color is determined by the intent. */
    helperText: React.ReactNode

    /** Whether to render the label and children on a single line. */
    inline?: boolean

    /** Label of this form group. */
    label?: React.ReactNode

    /**
     * `id` attribute of the labelable form element that this `FormGroup` controls,
     * used as `<label for>` attribute.
     */
    labelFor?: string

    /**
     * Optional secondary text that appears after the label.
     */
    labelInfo?: React.ReactNode

    /**
     * Optional text for `label`. The given content will be wrapped in
     * `Classes.FORM_GROUP_SUB_LABEL` and displayed beneath `label`. The text color
     * is determined by the `intent`.
     */
    subLabel?: React.ReactNode
}
