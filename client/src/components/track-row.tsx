import React, { useEffect, useState } from "react";
import Emptyheart from "../svgs/emptyheart";
import Filledheart from "../svgs/filledheart";


interface track {
    src:string;
    name:string;
    author:string;
    likes:number;
    icon:string;
    ID:number;
}

interface props {
    track:track;
    setTrack: React.Dispatch<React.SetStateAction<{
        src: string;
        name: string;
        author: string;
        icon: string;
        likes: number;
        ID: number;
    }>>;
    activeTrack : track;
}

const TrackRow = (props : props) => {
const [liClasses, setLiClasses] = useState("track-li ");
const [Loved, setLoved] = useState(false);
const changeTrack = () => {
    props.setTrack(props.track)

}
useEffect(() => {
if (JSON.stringify(props.track) === JSON.stringify(props.activeTrack))
{
    setLiClasses("track-li active-track");
}
else
{
    setLiClasses("track-li");
}

}, [props.activeTrack])
const toggleLoved = () => {
    setLoved(!Loved);
}

    return (
    <li className={liClasses}  onClick={changeTrack}>
        <div className="li-div">
            <label className="track-name">{props.track.name}</label>
            <label className="track-author">{props.track.author}</label>
        </div>
        
        <div onClick={toggleLoved} className="heart-icon">{Loved &&<Filledheart/> || <Emptyheart/> }</div>
    </li>);
};

export default TrackRow