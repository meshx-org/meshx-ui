type ChangeHandler = (value: boolean) => void

export interface ToggleSwitchProps {
    value?: boolean
    defaultValue?: boolean
    onChange?: ChangeHandler
    disabled?: boolean
}
