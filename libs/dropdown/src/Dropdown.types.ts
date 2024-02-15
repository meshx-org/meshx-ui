import { AriaSelectProps } from 'react-aria'

export type Alignment = 'start' | 'end'

export type DropdownProps<C extends React.ElementType, T> = {
    children?: React.ReactNode

    /** Alignment of the menu relative to the input target.
     * @default 'start'
     */
    align?: Alignment

    /**
     * Direction the menu will render relative to the Picker.
     * @default 'bottom'
     */
    direction?: 'bottom' | 'top'

    /** Width of the menu. By default, matches width of the trigger. Note that the minimum width of the dropdown is always equal to the trigger's width. */
    menuWidth?: number

    /** Whether the element should receive focus on render. */
    autoFocus?: boolean

    /**
     * Whether the menu should automatically flip direction when space is limited.
     * @default true
     */
    shouldFlip?: boolean

    as?: C
} & React.ComponentPropsWithoutRef<C> &
    AriaSelectProps<T>
