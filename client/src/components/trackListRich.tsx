import React from "react";
import '../css/tracklistrich.css';
import TrackRowRich from "./track-row-rich";
import {track} from '../interfaces';



interface props{
    tracks: track[];
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack: track;
    likedByUser:string[];
}

 const TrackListRich = (props:props) => {
    return (
        <div className="tracklistrich">
            <ul className="track-ul-rich">
                {
                    props.tracks.map((track) => {
                        if (track.icon){
                        let liked = false;
                        if (props.likedByUser.includes(track._id))
                        {
                            liked = true;
                        }
                        return <TrackRowRich key={track._id} liked={liked} activeTrack={props.activeTrack} setTrack={props.setTrack} track={track} />
                        }
                    })
                }
            </ul>
        </div>
    );
}

export default TrackListRich;