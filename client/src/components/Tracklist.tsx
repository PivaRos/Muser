import React from "react";
import '../css/tracklist.css';
import TrackRow from "./track-row";


interface track  {
    src : string;
    icon:string;
    name:string;
    author:string;
    ID:number;
    likes:number;
}




interface props {
    tracks: track[];
}

const TracklistComp = (props : props) => {
    return (
        <div className="tracklist">
            <h2>Discover </h2>
            <ul className="track-ul">
                    {props.tracks.map((track) => {
                    return <TrackRow track={track}/>
                })}
                </ul>
        </div>
    );
}

export default TracklistComp;