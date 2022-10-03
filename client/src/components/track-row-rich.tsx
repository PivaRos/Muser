import React, { useEffect, useState } from "react";
import {track} from '../interfaces';
import { AuthorComponent } from "./authorComponent";
import { TrackPlaying } from "./track-playing";


interface props {
    track:track;
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack : track;
    liked : boolean;
    playing:boolean;
    setPlaying:React.Dispatch<React.SetStateAction<boolean>>;
}

const url = "https://localhost:5000";

const TrackRowRich = (props : props) => {

const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
const [liClasses, setLiClasses] = useState("track-li-rich");
const [Loved, setLoved] = useState(props.liked);
const [likes, setLikes] = useState(props.track.likes);
const changeTrack = () => {
    props.setTrack(props.track)
    props.setPlaying(true); 

}





useEffect(() => {
    if (JSON.stringify(props.track) === JSON.stringify(props.activeTrack))
    {
        setLiClasses("track-li-rich active-track-rich");
    }
    else
    {
        setLiClasses("track-li-rich");
    }

}, [props.activeTrack, props.track])


const toggleLoved = () => {
    if (Loved)
    {
        //from like to unlike

        setLoved(false);
        setLikes(likes-1);
    }
    else
    {
        //from unlike to like
        setLikes(likes+1);
        setLoved(true);

    }
}

    useEffect(() => {
        if (JSON.stringify(props.activeTrack) === JSON.stringify(props.track) && props.playing)
        {
            setIsCurrentlyPlaying(true);
        }
        else
        {
            setIsCurrentlyPlaying(false);
        }
    },[props.playing, props.activeTrack])

    return (
    <li className={liClasses} >
        <div className="li-div-rich" onClick={changeTrack}>
            <img src={"http://localhost:5000/music-images/"+props.track.icon}/>
            <label className="track-name-rich">{props.track.name}</label>
            <div className="author-div-rich">
            {props.track.author && props.track.author.map((author, index) => (
                <AuthorComponent key={index} author={author} />
            ))}
            <TrackPlaying setIsCurrentPlaying={setIsCurrentlyPlaying} playing={props.playing} setPlaying={props.setPlaying} isCurrentlyPlaying={isCurrentlyPlaying} setTrack={props.setTrack}/>

            </div>
        </div>
        </li>);
};

export default TrackRowRich