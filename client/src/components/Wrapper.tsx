

import React, { useState, useEffect } from 'react'
import Discover from "../pages/Discover/Discover";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Player from './player/Player';
import Sidebar from "./Sidebar";
import Notfound from '../pages/Notfound/Notfound';
import { track } from '../interfaces';
import { AuthorComp } from '../pages/Author/Author';




export const Wrapper = () => {

    const [track, setTrack] = useState({
        src: "",
        name: "",
        author: [""],
        icon: "",
        likes: 0,
        _id: ""
    });
    const [trackChange, setTrackChange] = useState({
        src: "",
        name: "",
        author: [""],
        icon: "",
        likes: 0,
        _id: ""
    });
    const [prevTrackStack, setPrevTrackStack] = useState<track[]>([]);
    const [nextTrackStack, setNextTrackStack] = useState<track[]>([]);
    const [NextAndPrevTrack, setNextAndPrevTrack] = useState(0);
    const url = "http://localhost:5000";

    const [ExcludeForNext, setExcludeForNext] = useState<any[]>([]);


    useEffect(() => {
        if (NextAndPrevTrack === 1) {

            let ttrack = nextTrackStack.pop();
            if (ttrack) {
                prevTrackStack.push(track)
                setTrack(ttrack);

            }
            else {
                prevTrackStack.push(track);
                if (ExcludeForNext.length > 5) {
                    setExcludeForNext([]);
                }

                ExcludeForNext.push(track._id);
                const body = {
                    exclude: ExcludeForNext
                }
                const options = {
                    method: "POST",
                    body: JSON.stringify(body)
                }
                fetch(url + "/track/exclude", options).then((response) => {
                    response.json().then((data) => {
                        setTrack(data);
                    }).catch(() => {

                    });
                }).catch(() => {

                });
            }
        }
        if (NextAndPrevTrack === -1) {
            //change to prev from stack
            let tracks = prevTrackStack.pop();
            if (tracks?._id !== "") {
                nextTrackStack.push(track);
                tracks && setTrack(tracks);
            }
        }
        setNextAndPrevTrack(0);

    }, [NextAndPrevTrack])




    useEffect(() => {
        //logic to change track
        prevTrackStack.push(track);
        setTrack(trackChange);
    }, [trackChange])


    useEffect(() => {
        fetch(url + '/track').then((res) => {
            if (res) {
                res.json().then(data => {
                    if (data) {
                        setTrack(data[0]);

                    }
                }).catch((err) => console.error(err));
            }
            else {
                console.log({ message: "no res object" });
            }
        }).catch((err) => {

        });
    }, [])
    return (
        <div id="wrapper">
            <Router>
                <Navbar />
                <Sidebar setTrack={setTrackChange} activeTrack={track} />
                <div id="content">
                    <Routes>
                        <Route path="/discover" element={<Discover activeTrack={track} setTrack={setTrackChange} />} />
                        <Route path='/author/:authorName' element={<div><AuthorComp author={{ name: "" }} /></div>} />
                        <Route path="/" element={<Home />} />
                        <Route path='*' element={<Notfound />} />
                    </Routes>

                </div>


                <Player setNextAndBack={setNextAndPrevTrack} track={track} />
            </Router>
        </div>
    );
}
export default Wrapper;