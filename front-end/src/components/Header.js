import * as styles from "../styles/Header.module.css";
import menuLogo from "../public/header/menu_logo.png";
import arrowDown from "../public/header/arrow_down.gif";
import {useEffect, useState} from "react";

export function Header({fullScreen}) {

    const [arrowDownVisible, setArrowDownVisible] = useState(false);

    useEffect(() => {
        let timeoutRef;
        if (fullScreen) {
             timeoutRef = setTimeout(() => setArrowDownVisible(true), 5000);
        } else {
            setArrowDownVisible(false);
        }
        return () => {
            if (timeoutRef) {
                clearTimeout(timeoutRef);
            }
        }
    }, [fullScreen]);

    return (
        <section className={styles.polaroid + " " + (fullScreen ? styles.fullScreen : '')}>
            <div id="header" className={styles.photo}></div>
            <div className={styles.textInPhoto}></div>
            <div className={styles.textBelowPhoto}><img src={menuLogo}></img></div>
            <div className={`${styles.scrollDown} ${arrowDownVisible ? styles.active : ""}`}>
                <img src={arrowDown}/>
                <p>Scroll om verder te gaan</p>
            </div>
        </section>
    )

}
