import * as styles from "../styles/Polaroid.module.css";
import React, {useEffect, useRef} from "react";
import {PolaroidFront} from "./PolaroidFront";
import {PolaroidBack} from "./PolaroidBack";

export function Polaroid({children, rotate, orientation = "portrait", flip = false}) {

    // nice ratios to scale the polaroid according to the container size
    const EXAMPLE_WIDTH = 400;
    const EXAMPLE_HEIGHT = 500;
    const EXAMPLE_BORDER = 20;
    const EXAMPLE_BORDER_BOTTOM = 50;

    const heightToWidth = orientation === "landscape" ? (EXAMPLE_WIDTH / EXAMPLE_HEIGHT) : (EXAMPLE_HEIGHT / EXAMPLE_WIDTH);
    const borderToWidth = EXAMPLE_BORDER / EXAMPLE_WIDTH;
    const borderBottomToWidth = EXAMPLE_BORDER_BOTTOM / EXAMPLE_WIDTH;

    const widthToHeight = orientation === "landscape" ? (EXAMPLE_HEIGHT / EXAMPLE_WIDTH) : (EXAMPLE_WIDTH / EXAMPLE_HEIGHT);
    const borderToHeight = EXAMPLE_BORDER / EXAMPLE_HEIGHT;
    const borderBottomToHeight = EXAMPLE_BORDER_BOTTOM / EXAMPLE_HEIGHT;

    const polaroidElement = useRef(null);

    // create an observer that notifies us when the container of the polaroid has changed its size
    let resizeObserver = new ResizeObserver((el) => {
        dress();
    });

    let dress = () => {
        let section = polaroidElement.current;

        // create the polaroid effect based on the container that this polaroid is in
        let expectedWidth = section.parentElement.clientWidth;
        let expectedHeight = section.parentElement.clientHeight;



        if (expectedWidth < 100 || expectedHeight < 100) {
            setTimeout(dress, 100);
            return;
        }

        if (expectedWidth * heightToWidth <= expectedHeight) {
            section.style.width = expectedWidth + "px";
            section.style.height = (expectedWidth * heightToWidth) + "px";
            section.style.borderWidth = (expectedWidth * borderToWidth) + "px";
            section.style.borderBottomWidth = (expectedWidth * borderBottomToWidth) + "px";
        }

        if (expectedWidth * heightToWidth >= expectedHeight) {
            section.style.width = (expectedHeight * widthToHeight) + "px";
            section.style.height = expectedHeight + "px";
            section.style.borderWidth = (expectedHeight * borderToHeight) + "px";
            section.style.borderBottomWidth = (expectedHeight * borderBottomToHeight) + "px";
        }
    }

    // init
    useEffect(() => {
        dress();
        resizeObserver.observe(polaroidElement.current.parentElement);
        return () => resizeObserver.unobserve(polaroidElement.current.parentElement);
    }, []);


    let childrenOnTheFront = React.Children.map(children, (child) => {
        if (child.type === PolaroidFront) {
            return child;
        } else {
            return null;
        }
    });

    let childrenOnTheBack = React.Children.map(children, (child) => {
        if (child.type === PolaroidBack) {
            return child;
        } else {
            return null;
        }
    });

    const determinePolaroidClassName = () => {
        let polaroidClassName = styles.polaroid;

        if (flip) {
            polaroidClassName += " " + styles.flipped;
        }
        return polaroidClassName;
    }

    return (
        <section ref={polaroidElement} className={determinePolaroidClassName()}
                 style={{transform: 'rotate(' + rotate + ')'}}>

            <div className={styles.front}>
                {childrenOnTheFront}
            </div>

            <div className={styles.back}>
                {childrenOnTheBack}
            </div>

        </section>
    )

}
