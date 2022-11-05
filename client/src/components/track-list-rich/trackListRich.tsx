import React, { useState } from "react";
import '../../css/tracklistrich.css';
import TrackRowRich from "./track-row-rich";
import { Playlist, track, User } from '../../interfaces';
import { PlaylistComp } from "../playlist";



interface props {
    tracks: track[];
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack: track;
    likedByUser: string[];
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    Playlists:Playlist[] | null | undefined;
    user:User | null | undefined;
    setUser:React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

const TrackListRich = (props: props) => {
    const [classes, setClasses] = useState("");
    return (
        <div id="tracklistrich" className="tracklistrich">
            <ul id="track-ul-rich" className={"track-ul-rich "+classes}>
                {props.Playlists && props.Playlists.map((playlist, key) => {
                    console.log(playlist);
                    return <li key={key} className="track-li-rich"><div className="li-div-rich"><PlaylistComp setUser={props.setUser} name={playlist.name} tracks={playlist.tracks} activeTrack={props.activeTrack} setTrack={props.setTrack} settings={{display:"BOX"}} user={props.user} /></div>   </li>
                })}

                {
                    
                    props.tracks.map((track) => {
                        if (track.icon) {
                            let liked = false;
                            if (props.likedByUser.includes(track._id)) {
                                liked = true;
                            }
                            
                            return <TrackRowRich setPlaying={props.setPlaying} playing={props.playing} key={track._id} liked={liked} activeTrack={props.activeTrack} setTrack={props.setTrack} track={track} />
                        }
                        return "";
                        
                    })
                    
                    
                }
            </ul>
            
        </div>
    );
}

export default TrackListRich;