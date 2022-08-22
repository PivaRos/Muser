import React from "react";

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

const changeTrack = () => {
    props.setTrack(props.track)
}

    return (
    <li className="track-li" onClick={changeTrack}>
        <div className="li-div">
            <label className="track-name">{props.track.name}</label>
            <label className="track-author">{props.track.author}</label>
        </div>
    </li>);
};

export default TrackRow