import * as styles from '../styles/Button.module.css';

export default function Button({enabled = true, children}) {
    return <button className={styles.button} disabled={!enabled} role="button">{children}</button>
}
