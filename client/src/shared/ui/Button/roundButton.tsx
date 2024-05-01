import styles from './roundButton.module.css'

export const RoundButton = ({
    children, className, ...props
}: any) => {

    return (
        <div className={`${styles.round} ${className}`} {...props}>
            {children}
        </div>
    )
}