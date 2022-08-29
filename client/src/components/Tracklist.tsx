import React from "react";
import '../css/tracklist.css';
import TrackRow from "./track-row";
import {track} from '../interfaces';




interface props {
    tracks: track[];
    setTrack: React.Dispatch<React.SetStateAction<{
        src: string;
        name: string;
        author: string;
        icon: string;
        likes: number;
        ID: number;
    }>>;
    activeTrack: track;
}

const TracklistComp = (props: props) => {
    return (
        <div className="tracklist">
            <ul className="track-ul">
                {props.tracks.map((track) => (
                    <TrackRow key={track.ID} activeTrack={props.activeTrack} setTrack={props.setTrack} track={track} />
                ))}
            </ul>
        </div>
    );
}

export default TracklistComp;