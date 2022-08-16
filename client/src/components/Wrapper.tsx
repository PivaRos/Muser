

import React from 'react'
import Discover from "./Discover";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";


export const Wrapper = () => {
    return (
        <div id="wrapper">
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <Routes>
                    <Route path="/discover" element={<Discover />} />
                </Routes>
            </Router>
        </div>
    );
}
export default Wrapper;