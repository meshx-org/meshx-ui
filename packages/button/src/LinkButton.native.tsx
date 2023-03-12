import { LinkButtonProps } from './Button.types'

function LinkButton<T>({ children, ...props }: LinkButtonProps<T>) {
    return children
}

export { LinkButton }
