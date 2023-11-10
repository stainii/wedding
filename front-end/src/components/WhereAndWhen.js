import * as styles from "../styles/WhereAndWhen.module.css";
import {Polaroid} from "./Polaroid";
import photo1 from 'url:../public/03_IMG_7069.jpeg';
import photo2 from 'url:../public/19_IMG_1102.jpeg';
import photo3 from 'url:../public/34_IMG_6439.jpeg';
import toast from 'url:../public/icons/toast-party.svg';
import calendar from 'url:../public/icons/calendar.svg';
import location from 'url:../public/icons/location.svg';
import email from 'url:../public/icons/email.svg';
import {PolaroidPhoto} from "./PolaroidPhoto";
import {PolaroidFront} from "./PolaroidFront";

export default function WhereAndWhen() {

    return (
        <section className={styles.whereAndWhen}>
            <div className={styles.infoGrid}>
                <div className={styles.text}>
                    <p>Dat gaan we vieren!</p>
                    <p className={styles.date}>
                        <img className={styles.icon} src={calendar}/>
                        <span>Zaterdag 29 juni 2024</span>
                    </p>
                    <p className={styles.date}>
                        <img className={styles.icon} src={toast}/>
                        <span>We starten om 14:00</span>
                    </p>

                    <a href="https://goo.gl/maps/aJVJ7wCN4zxc8Yzj8"
                       className={styles.locationGrid}>
                        <img className={styles.icon} src={location}/>
                        <span>Domaine La Carrière</span>
                        <address>
                            <span className={styles.noWrap}>Rue d'Arbre 36</span><br/>
                            <span className={styles.noWrap}>5537 Bioul</span>
                        </address>
                    </a>

                    <p className={styles.presentGrid}>
                        <img className={styles.icon} src={email}/>
                        <span>Cadeautip</span>
                        <span className={styles.small}>BE10 0018 1207 6804</span>
                    </p>
                </div>

                <div className={styles.polaroid}>
                    <div className={styles.polaroid1}>
                        <Polaroid rotate="20deg"
                                  orientation="landscape">
                            <PolaroidFront>
                                <PolaroidPhoto photo={photo1}></PolaroidPhoto>
                            </PolaroidFront>
                        </Polaroid>
                    </div>
                    <div className={styles.polaroid2}>
                        <Polaroid rotate="-5deg"
                                  orientation="landscape">
                            <PolaroidFront>
                                <PolaroidPhoto photo={photo2}></PolaroidPhoto>
                            </PolaroidFront>
                        </Polaroid>
                    </div>
                    <div className={styles.polaroid3}>
                        <Polaroid rotate="25deg"
                                  orientation="landscape">
                            <PolaroidFront>
                                <PolaroidPhoto photo={photo3}></PolaroidPhoto>
                            </PolaroidFront>
                        </Polaroid>
                    </div>
                </div>
            </div>
        </section>
    );

}
