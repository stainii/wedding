import {createRoot} from "react-dom/client";
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";

const app = document.getElementById("app");
const root = createRoot(app);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
