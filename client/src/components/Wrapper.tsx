

import React, {  useState, useEffect } from 'react'
import Discover from "../pages/Discover/Discover";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Player from './player/Player';
import Sidebar from "./Sidebar";
import Notfound from '../pages/Notfound/Notfound';
import {track} from '../interfaces'



export const Wrapper =  () => {
    
    const [trackList, setTrackList] = useState<track[]>([{
        src:"",
        name:"",
        author:"",
        icon:"",
        likes:0,
        ID:0
    }]);
    const [changeTrack, setChangeTrack] = useState(0);
    const [currentTrack, setCurrentTrack] = useState<track>({
        src:"",
        name:"",
        author:"",
        icon:"",
        likes:0,
        ID:0
    });
    const [trackIndex, setTrackIndex] = useState(0);

    useEffect(() => {
        if (changeTrack === 1)
        {
            console.log(trackList.length);
            console.log(trackIndex);
            if(trackList.length-1 > trackIndex)
            {
            //forward one track
            setCurrentTrack(trackList[trackIndex+1]);
            setTrackIndex(trackIndex+1);
            }
        }
        if (changeTrack === -1)
        {
            if (trackIndex > 0)
            {
            //back one track
            setCurrentTrack(trackList[trackIndex-1]);
            setTrackIndex(trackIndex-1);

            }
        }
        setChangeTrack(0);
    },[changeTrack])


    useEffect(()=> {
        fetch('http://localhost:5000/').then((res) => {
            if (res)
            {
                res.json().then((data:track[]) => {
                    data && setTrackList(data);
                    data && setCurrentTrack(data[0]); 
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
                <Sidebar setTrack={setCurrentTrack} activeTrack={currentTrack}/>
                <div id="content">
                <Routes>
                    <Route path="/discover" element={<Discover activeTrack={currentTrack} setTrack={setCurrentTrack} />} />
                    <Route  path="/" element={<Home />} />
                    <Route path='*' element={<Notfound/>}/>
                </Routes>
            
                </div>

                
                <Player setChangeTrack={setChangeTrack} track={currentTrack}/>
            </Router>
        </div>
    );
}
export default Wrapper;