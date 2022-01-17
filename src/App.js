import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {Fragment} from "react";

function App() {
    return (
        <Fragment>
            <Navbar/>
            <Home />
        </Fragment>
    );
}

export default App;
