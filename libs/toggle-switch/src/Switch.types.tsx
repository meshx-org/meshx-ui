type ChangeHandler = (value: boolean) => void

export interface SwitchProps {
    value?: boolean
    defaultValue?: boolean
    onChange?: ChangeHandler
    disabled?: boolean
}
