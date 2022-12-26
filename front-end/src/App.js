import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import {Header} from "./components/Header";
import {useEffect, useState} from "react";

export function App() {

    const [intro, setIntro] = useState(true);

    useEffect(() => {
        setIntro(document.documentElement.scrollTop < 5)
        window.addEventListener("scroll", e => {
            setIntro(e.target.documentElement.scrollTop < 5)
        })
    }, []);

    return (
        <>
            <Header fullScreen={intro}></Header>
            <Routes>
                <Route path="" element={<Home></Home>}/>
            </Routes>
        </>
    )
}
