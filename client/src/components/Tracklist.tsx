import React from "react";
import '../css/tracklist.css';
import TrackRow from "./track-row";
import {track, User} from '../interfaces';




interface props {
    tracks: track[];
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack: track;
    likedByUser:string[];
    user:User | null | undefined;
    settings:{
        withAuthor:boolean;
    }
}

const TracklistComp = (props: props) => {
    return (
        <div className="tracklist">
            <ul className="track-ul">
                {
                    props.tracks.map((track) => {
                        let liked = false;
                        if (props.likedByUser.includes(track._id))
                        {
                            liked = true;
                        }
                        return <TrackRow settings={props.settings} user={props.user} key={track._id} liked={liked} activeTrack={props.activeTrack} setTrack={props.setTrack} track={track} />
                    })
                }
            </ul>
        </div>
    );
}

export default TracklistComp;