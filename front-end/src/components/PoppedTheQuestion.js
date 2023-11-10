import * as styles from "../styles/PoppedTheQuestion.module.css";
import {Polaroid} from "./Polaroid";
import photo from 'url:../public/proposal.jpg'
import {PolaroidPhoto} from "./PolaroidPhoto";
import {PolaroidFront} from "./PolaroidFront";

export default function PoppedTheQuestion() {

    return (
        <section className={styles.poppedTheQuestion}>
            <div className={styles.polaroid}>
                <Polaroid rotate="353deg">
                    <PolaroidFront>
                        <PolaroidPhoto photo={photo} text={'13 november 2021'}></PolaroidPhoto>
                    </PolaroidFront>
                </Polaroid>
            </div>

            <div className={styles.text}>
                <p className={styles.textSmall}>
                    Stijn stelde dé vraag...
                </p>
                <p className={styles.textBig}>
                    en Shaary gaf het juiste antwoord!
                </p>
            </div>
        </section>
    )
}
