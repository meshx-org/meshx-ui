import { LinkButtonProps } from './LinkButton.types'

function LinkButton<T>({ children, ...props }: LinkButtonProps<T>) {
    return children
}

export { LinkButton }
