import React from "react";

interface props {
    track:{
        src:string;
        name:string;
        author:string;
        likes:number;
        ID:number;
    }
}

const TrackRow = (props : props) => {
    return (<li className="track-li"><div className="li-div"><label className="track-name">{props.track.name}</label><label className="track-author">{props.track.author}</label></div></li>);
};

export default TrackRow