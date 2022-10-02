import React, { useEffect, useState } from "react";
import {track} from '../interfaces';
import { AuthorComponent } from "./authorComponent";


interface props {
    track:track;
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack : track;
    liked : boolean;
}

const url = "https://localhost:5000";
const TrackRowRich = (props : props) => {
const [liClasses, setLiClasses] = useState("track-li-rich");
const [Loved, setLoved] = useState(props.liked);
const [likes, setLikes] = useState(props.track.likes);
const changeTrack = () => {
    props.setTrack(props.track)

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

        setLoved(!Loved);
        setLikes(likes-1);
    }
    else
    {
        //from unlike to like
        setLikes(likes+1);
        setLoved(!Loved);

    }
}

    return (
    <li className={liClasses} >
        <div className="li-div-rich" onClick={changeTrack}>
            <img src={"http://localhost:5000/music-images/"+props.track.icon}/>
            <label className="track-name-rich">{props.track.name}</label>
            <div className="author-div-rich">
            {props.track.author && props.track.author.map((author, index) => (
                <AuthorComponent key={index} author={author} />
            ))}
            </div>
        </div>
        </li>);
};

export default TrackRowRich