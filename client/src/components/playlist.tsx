import { useEffect, useState } from "react";
import { track, User } from "../interfaces";
import TracklistComp from "./Tracklist";
import "../css/playlist.css";
import { TrackPlaying } from "./track-list-rich/track-playing";

const url = "http://localhost:5000"

interface props{
    name:string;
    tracks:track[] | string[];
    settings:{
        display:"LIST" | "BOX"
    }
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack: track;
    user:User | null | undefined;
    setUser:React.Dispatch<React.SetStateAction<User | null | undefined>>;
    
}

export const PlaylistComp = (props:props) => {
    const [classNames, setClassNames] = useState("");
    const [tracks, setTracks] = useState<any>();
    
    useEffect(() => {
        if (props.settings.display === "BOX")
        {
            setClassNames("playlist-box track-li-rich")
        }
        else
        {
            setClassNames("playlist-list")
        }
        if (typeof props.tracks[0] === 'string')
        {
           const options = {
            method:"POST",
            body:JSON.stringify({
                tracks:props.tracks
            })
           }
            fetch(url+"/track/listById", options).then(response => {
                response.json().then(data => {
                    setTracks(data);
                }).catch();
            }).catch();
        }
        else
        {
            setTracks(props.tracks);
        }
    }, []);

    useEffect(() => {
        if (props.settings.display === "BOX")
        {
            setClassNames("playlist-box");
        }
        else
        {
            setClassNames("playlist-list");
        }
    }, [props.settings]);
    
    return (<div className={classNames}>
        {props.settings.display === "LIST" && <div> 
            <h3>{props.name} Playlist !</h3>
            <TracklistComp setUser={props.setUser} tracks={tracks} setTrack={props.setTrack} activeTrack={props.activeTrack} user={props.user} settings={{withAuthor:true}} />        
        </div>}
        {props.settings.display === "BOX" && <div>
        <label className="playlist-box-label">{ props.name} Playlist</label>
            
        </div>}
    </div>);
}