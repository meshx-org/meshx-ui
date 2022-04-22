type ChangeHandler = (value: boolean) => void

export interface ToggleSwitchProps {
    checked?: boolean
    defaultChecked?: boolean
    onChange?: ChangeHandler
}
