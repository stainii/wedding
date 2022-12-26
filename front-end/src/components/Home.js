import PoppedTheQuestion from "./PoppedTheQuestion";
import WhereAndWhen from "./WhereAndWhen";
import * as styles from "../styles/Home.module.css";
import RSVP from "./RSVP";
import {useState} from "react";

export default function Home() {

    let [dark, setDark] = useState(false);


    return <div id="home" className={styles.container}>
        <PoppedTheQuestion></PoppedTheQuestion>

        <WhereAndWhen></WhereAndWhen>

        <div className={styles.blanket}></div>

        <div className={styles.darkBackground + ' ' + (dark ? styles.active : '')}></div>

        <RSVP onRequestForThemeChange={dark => setDark(dark)}></RSVP>
    </div>
}
