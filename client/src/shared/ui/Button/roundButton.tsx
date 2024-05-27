import styles from "./roundButton.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const RoundButton = ({ children, className, ...props }: Props) => {
  return (
    <div className={`${styles.round} ${className}`} {...props}>
      {children}
    </div>
  );
};
