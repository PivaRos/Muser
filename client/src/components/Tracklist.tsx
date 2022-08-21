import { type } from "@testing-library/user-event/dist/type";
import React from "react";

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
        <div>
            <h2>tracklist</h2>
            <ul>
                    {props.tracks.map((track) => {
                    return <li>{track.name}</li>
                })}
                </ul>
        </div>
    );
}

export default TracklistComp;