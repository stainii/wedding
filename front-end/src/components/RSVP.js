import * as styles from "../styles/RSVP.module.css";
import {Polaroid} from "./Polaroid";
import photo from 'url:../public/tibo-zonnebril.jpg'
import {PolaroidBack} from "./PolaroidBack";
import {useEffect, useRef, useState} from "react";
import Button from "./Button";
import Turnstone from "turnstone";

export default function RSVP({onRequestForThemeChange}) {

    const [flip, setFlip] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const [names, setNames] = useState("");
    const [kidsNames, setKidsNames] = useState("");
    const [vegetarian, setVegetarian] = useState("");
    const [foodAllergies, setFoodAllergies] = useState("");
    let [songRequest, setSongRequest] = useState(null);
    const [unvalidatedSongRequest, setUnvalidatedSongRequest] = useState(null);
    const [audio, setAudio] = useState(null);
    const [registered, setRegistered] = useState(false);
    const [text, setText] = useState('');
    const [validForm, setValidForm] = useState(false);
    const songRequestElement = useRef();

    // region text
    useEffect(() => {
        if (registered) {
            setText('We kijken er naar uit!');
        }
    }, [registered]);
    // endregion

    // region form
    useEffect(() => {
        setValidForm(names && names !== '' && kidsNames && names !== '' && vegetarian && vegetarian !== '' && foodAllergies && foodAllergies !== '');
    }, [names, kidsNames, vegetarian, foodAllergies]);

    const sendResponse = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!songRequest && unvalidatedSongRequest && unvalidatedSongRequest !== '') {
            const songRequests = await searchOnSpotify(unvalidatedSongRequest);
            songRequest = songRequests ? songRequests[0] : null;
            console.debug("Updated song, selected ", songRequest);
        }

        const responseDto = {
            names: names,
            kidsNames: kidsNames,
            vegetarian: vegetarian,
            foodAllergies: foodAllergies,
            songRequest: songRequest
        }
        const response = await fetch("api/response", {
            method: 'POST',
            body: JSON.stringify(responseDto),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            alert('De registratie is niet gelukt. Kan je nog eens proberen?');
            return;
        }
        setRegistered(true);
        setFlip(false);
        console.debug("Received response", response);
    };
    // endregion

    // region flip and theme
    const updateFlipAndTheme = () => {
        let el = document.getElementsByClassName(styles.polaroid)[0];
        let belowFlipPoint = el.getBoundingClientRect().top < document.documentElement.clientHeight - el.getBoundingClientRect().height / 2;

        if (!flip && belowFlipPoint) {
            setFlip(true);
        }

        if (registered) {
            setFlip(false);
            setDarkTheme(false);
        }

        if (darkTheme && !belowFlipPoint) {
            setDarkTheme(false);
        }
    }

    useEffect(() => {
            updateFlipAndTheme();

            onRequestForThemeChange(darkTheme);

            if (!registered) {
                setAudio(_ => {
                    stopAudio().then();
                    return null;
                });
            }

            const listener = () => updateFlipAndTheme();
            document.addEventListener("scroll", listener);

            return () => {
                document.removeEventListener("scroll", listener);
            }
        }, [registered, darkTheme]
    );
    // endregion

    // region song request
    useEffect(() => {
        if (songRequest) {
            setAudio(prevAudio => {
                if (prevAudio) {
                    stopAudio().then();
                }
                return new Audio(songRequest.previewUrl);
            });
        }
    }, [songRequest]);

    useEffect(() => {
        if (audio) {
            playAudio();
        }
    }, [audio])

    const onFocusNewSongRequestElement = () => {
        setDarkTheme(true);
    }

    const turnstoneStyle = {
        input: songRequest ? styles.filledIn : styles.textField,
        listbox: styles.listbox,
        item: styles.item,
        highlightedItem: styles.highlightedItem,
        typeahead: styles.typeahead
    }

    const updateSongRequest = (songRequest) => {
        console.debug("Selecting song ", songRequest);
        setSongRequest(songRequest);
    }

    async function searchOnSpotify(query) {
        const resultAsString = await fetch(
            `api/song?query=${query}`
        );
        let resultAsJson = await resultAsString.json();
        resultAsJson.forEach(r => r.display = `${r.title} - ${r.artist}`);
        return resultAsJson;
    }

    const listbox = {
        displayField: 'display',
        data: searchOnSpotify,
        searchType: 'startsWith',
    }

    const playAudio = () => {
        if (!audio) {
            return;
        }
        if (audio.paused) {
            audio.volume = 0;
            audio.play();
            let increaseVolume = setInterval(() => {
                audio.volume += .1;
                if (audio.volume + .1 > 1.0) {
                    audio.volume = 1; // yep, because JavaScript can't do simple additions of .1 reliably...
                    clearInterval(increaseVolume);
                }
            }, 100);
            let stopAfter10Seconds = setTimeout(stopAudio, 10_000);
        } else {
            stopAudio().then(playAudio);
        }
    }

    const stopAudio = () => {
        return new Promise(resolve => {
            let s = setInterval(() => {
                if (!audio) {
                    clearInterval(s);
                    resolve();
                    return;
                }
                if (!audio.paused) {
                    audio.volume -= 0.1;
                    if (audio.volume - .1 < 0.0) {
                        audio.volume = 0; // yep, because JavaScript can't do simple subtractions of .1 reliably...
                        clearInterval(s);
                        audio.pause();
                        resolve();
                    }
                }
            }, 100);
        });
    }
    // endregion

    return (
        <section className={styles.rsvp}>
            <div className={styles.polaroid}>
                <Polaroid photo={photo}
                          flip={flip}>
                    {text}
                    <PolaroidBack>
                        <form onSubmit={sendResponse} className={styles.form}>
                            <label className={styles.label}>Hoe heten jullie?
                                <input type="text"
                                       value={names}
                                       onChange={(e) => setNames(e.target.value)}
                                       className={styles.textField + " " + (names.length > 0 ? styles.filledIn : '')}
                                       autoFocus={flip}/>
                            </label>
                            <label className={styles.label}>Komen de kids mee?
                                <input type="text"
                                       value={kidsNames}
                                       onChange={(e) => setKidsNames(e.target.value)}
                                       className={styles.textField + " " + (kidsNames.length > 0 ? styles.filledIn : '')}/>
                            </label>
                            <label className={styles.label}>
                                Verzoeknummer op de dansvloer?
                                <Turnstone
                                    id='search'
                                    name='search'
                                    typeahead={true}
                                    clearButton={false}
                                    debounceWait={250}
                                    maxItems={5}
                                    noItemsMessage="Geen nummer gevonden op Spotify"
                                    listbox={listbox}
                                    styles={turnstoneStyle}
                                    onFocus={onFocusNewSongRequestElement}
                                    onChange={setUnvalidatedSongRequest}
                                    onSelect={updateSongRequest}
                                    onTab={updateSongRequest}
                                    ref={songRequestElement}
                                />
                            </label>
                            <label className={styles.label}>Eten jullie vegetarisch?
                                <input type="text"
                                       value={vegetarian}
                                       onChange={(e) => setVegetarian(e.target.value)}
                                       className={styles.textField + " " + (vegetarian.length > 0 ? styles.filledIn : '')}/>
                            </label>
                            <label className={styles.label}>Hebben julie voedselallergieën?
                                <input type="text"
                                       value={foodAllergies}
                                       onChange={(e) => setFoodAllergies(e.target.value)}
                                       className={styles.textField + " " + (foodAllergies.length > 0 ? styles.filledIn : '')}/>
                            </label>
                            <div className={styles.button}>
                                <Button enabled={validForm}>Bevestigen</Button>
                            </div>
                        </form>
                    </PolaroidBack>
                </Polaroid>
            </div>
        </section>
    );

}
