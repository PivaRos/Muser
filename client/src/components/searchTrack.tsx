import React, { useEffect, useState } from "react";
import {track} from '../interfaces';


interface props {
    track:track;
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack : track;
}

 export const TrackSearch = (props : props) => {

    const changeTrack = () => {
        props.setTrack(props.track);
    };  

    return (
        <li className="li-search" onClick={changeTrack}><div className="search-track-div">
            <h4>{props.track.name}</h4>
            <h6>{props.track.author}</h6>
        </div></li>
    );
};
