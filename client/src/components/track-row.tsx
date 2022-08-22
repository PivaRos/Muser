import React, { useState } from "react";
import Emptyheart from "../svgs/emptyheart";
import Filledheart from "../svgs/filledheart";


interface props {
    track:{
        src:string;
        name:string;
        author:string;
        likes:number;
        icon:string;
        ID:number;
    },
    setTrack: React.Dispatch<React.SetStateAction<{
        src: string;
        name: string;
        author: string;
        icon: string;
        likes: number;
        ID: number;
    }>>
}

const TrackRow = (props : props) => {

const [Loved, setLoved] = useState(false);
const changeTrack = () => {
    props.setTrack(props.track)

}

const toggleLoved = () => {
    setLoved(!Loved);
}

    return (
    <li className="track-li" onClick={changeTrack}>
        <div className="li-div">
            <label className="track-name">{props.track.name}</label>
            <label className="track-author">{props.track.author}</label>
        </div>
        
        <div onClick={toggleLoved} className="heart-icon">{Loved &&<Filledheart/> || <Emptyheart/> }</div>
    </li>);
};

export default TrackRow