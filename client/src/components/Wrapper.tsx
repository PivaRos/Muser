

import React, {  useState, useEffect } from 'react'
import Discover from "../pages/Discover/Discover";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Player from './player/Player';
import Sidebar from "./Sidebar";
import Notfound from '../pages/Notfound/Notfound';
import {track} from '../interfaces';



export const Wrapper =  () => {
    
    const [track, setTrack] = useState({
        src:"",
        name:"",
        author:"",
        icon:"",
        likes:0,
        ID:0
    });
    const [trackChange, setTrackChange] = useState({
        src:"",
        name:"",
        author:"",
        icon:"",
        likes:0,
        ID:0
    });
    const [prevTrackStack, setPrevTrackStack] = useState<track[]>([]);
    const [nextTrackStack, setNextTrackStack] = useState<track[]>([]);
    const [NextAndPrevTrack, setNextAndPrevTrack] = useState(0);
    const url = "http://localhost:5000/";

    useEffect(() => {
        if (NextAndPrevTrack === 1)
        {

            let ttrack = nextTrackStack.pop();
            if (ttrack)
            {
                console.log("local next");
                prevTrackStack.push(track)
                console.log(ttrack);    
                setTrack(ttrack);

            }
            else
            {
                console.log("new next");
                const body = {
                    exclude:[prevTrackStack, nextTrackStack]
                }
                const options = {
                    method:"POST",
                    body:JSON.stringify(body)
                }
                fetch(url+"track/exclude", options).then((response) => {
                    response.json().then((data) => {
                        prevTrackStack.push(track);
                        setTrack(data);
                    }).catch(() => {

                    });
                }).catch(() => {

                });
            }
        }
        if(NextAndPrevTrack === -1)
        {
            //change to prev from stack
           let tracks = prevTrackStack.pop();
            if (tracks)
            {
                nextTrackStack.push(track);
                setTrack(tracks);
            }
        }
        setNextAndPrevTrack(0);

    }, [NextAndPrevTrack])




    useEffect(() => {
        //logic to change track
        prevTrackStack.push(track);
        setTrack(trackChange);
    }, [trackChange])


    useEffect(()=> {
        fetch(url+'song').then((res) => {
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
                <Sidebar setTrack={setTrackChange} activeTrack={track}/>
                <div id="content">
                <Routes>
                    <Route path="/discover" element={<Discover activeTrack={track} setTrack={setTrackChange} />} />
                    <Route  path="/" element={<Home />} />
                    <Route path='*' element={<Notfound/>}/>
                </Routes>
            
                </div>

                
                <Player setNextAndBack={setNextAndPrevTrack} track={track}/>
            </Router>
        </div>
    );
}
export default Wrapper;