import * as styles from "../styles/PolaroidPhoto.module.css";
import {useEffect, useRef} from "react";

export function PolaroidPhoto({photo, text}) {

    const textBelowPhoto = useRef(null);

    let resizeObserver = new ResizeObserver((el) => {
        //dress();
    });

    let dress = () => {
        let height = textBelowPhoto.current.clientHeight
        textBelowPhoto.current.style.fontSize = height - (height/5) + "px";
    };

    useEffect(() => {
        dress();
        resizeObserver.observe(textBelowPhoto.current);
        return () => resizeObserver.unobserve(textBelowPhoto.current);
    }, []);

    return (
        <>
            <div className={styles.photo}>
                <img src={photo}/>
            </div>
            <div ref={textBelowPhoto} className={styles.textBelowPhoto}>
                {text}
            </div>
        </>
    )

}
