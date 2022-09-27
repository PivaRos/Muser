import React, { useEffect, useState } from "react";
import Emptyheart from "../svgs/emptyheart";
import Filledheart from "../svgs/filledheart";
import {track} from '../interfaces';
import { NavLink } from "react-router-dom";
import { AuthorComponent } from "./authorComponent";
import { response } from "express";


interface props {
    track:track;
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack : track;
}

const url = "https://localhost:5000";
const TrackRow = (props : props) => {
const [liClasses, setLiClasses] = useState("track-li ");
const [Loved, setLoved] = useState(false);
const changeTrack = () => {
    props.setTrack(props.track)

}



useEffect(() => {
    let options = {
        method:"GET"
    }
    fetch(url+"/user/private", options).then(response => {
        response.json().then(data => {
            if (data.includes(props.track._id))
            {
                console.log("is liked");
            }
        }); 
    })

    if (JSON.stringify(props.track) === JSON.stringify(props.activeTrack))
    {
        setLiClasses("track-li active-track");
    }
    else
    {
        setLiClasses("track-li");
    }

}, [props.activeTrack, props.track])

const toggleLoved = () => {
    if (Loved)
    {
        //switch back

        setLoved(!Loved);
    }
    else
    {
        //switch back
        setLoved(!Loved);
    }
}

    return (
    <li className={liClasses} >
        <div className="li-div" onClick={changeTrack}>
            <label className="track-name">{props.track.name}</label>
            <div className="author-div">
            {props.track.author && props.track.author.map((author, index) => (
                <AuthorComponent key={index} author={author} />
            ))}
            </div>
        </div>
        
        <div onClick={toggleLoved} className="heart-icon">{Loved &&<Filledheart/> || <Emptyheart/> }</div>
    </li>);
};

export default TrackRow