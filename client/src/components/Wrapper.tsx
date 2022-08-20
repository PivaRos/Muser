

import React, { useRef } from 'react'
import Discover from "../pages/Discover/Discover";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Player from './player/Player';
import Sidebar from "./Sidebar";




export const Wrapper = () => {


    const track = useRef({
        src:"",
        name:"",
        author:"",
        logo:""
    });


    fetch('http://localhost:5000').then((res) => {
        if (res)
        {
            res.json().then(data => {
                if(data){
                track.current = data;
                }
            }).catch((err) => console.error(err));
        }
        else
        {
        console.log({message : "no res object"});
        }
    }).catch((err) => {
        console.log(err);
        
    });


    console.log( "wrapper "+track.current.src);
    return (
        <div id="wrapper">
            <Router>
                <Navbar />
                <Sidebar/>
                <div id="content">
                <Routes>
                    <Route path="/discover" element={<Discover />} />
                </Routes>
                <Routes>
                    <Route  path="/" element={<Home />} />
                </Routes>
                </div>

                
                <Player track={track.current}/>
            </Router>
        </div>
    );
}
export default Wrapper;