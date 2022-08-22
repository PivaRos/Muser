

import React, {  useState, useEffect } from 'react'
import Discover from "../pages/Discover/Discover";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Player from './player/Player';
import Sidebar from "./Sidebar";
import Notfound from '../pages/Notfound/Notfound';




export const Wrapper =  () => {
    
    const [track, setTrack] = useState({
        src:"",
        name:"",
        author:"",
        icon:"",
        likes:0,
        ID:0
    });



    useEffect(()=> {
        fetch('http://localhost:5000/song').then((res) => {
            if (res)
            {
                res.json().then(data => {
                    if(data){
                    setTrack(data);
                
                    }
                }).catch((err) => console.error(err));
            }
            else
            {
            console.log({message : "no res object"});
            }
        }).catch((err) => {

        });
    }, [])
    return (
        <div id="wrapper">
            <Router>
                <Navbar />
                <Sidebar/>
                <div id="content">
                <Routes>
                    <Route path="/discover" element={<Discover setTrack={setTrack} />} />
                    <Route  path="/" element={<Home />} />
                    <Route path='*' element={<Notfound/>}/>
                </Routes>
            
                </div>

                
                <Player track={track}/>
            </Router>
        </div>
    );
}
export default Wrapper;