

import React from 'react'
import Discover from "../pages/Discover/Discover";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Player from './player/Player';
import Sidebar from "./Sidebar";



export const Wrapper = () => {
    return (
        <div id="wrapper">
            <Router>
                <Navbar />
                <Sidebar/>
                <Routes>
                    <Route path="/discover" element={<Discover />} />
                </Routes>
                <Routes>
                    <Route  path="/" element={<Home />} />
                </Routes>
                <Player/>
            </Router>
        </div>
    );
}
export default Wrapper;