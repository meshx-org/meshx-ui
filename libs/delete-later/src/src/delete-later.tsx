import styles from './delete-later.module.scss'

/* eslint-disable-next-line */
export interface DeleteLaterProps {}

export function DeleteLater(props: DeleteLaterProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to DeleteLater!</h1>
        </div>
    )
}

export default DeleteLater
