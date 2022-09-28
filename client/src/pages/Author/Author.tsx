import React, { useEffect, useState } from "react"
import { author, track } from '../../interfaces';
import { useParams } from "react-router-dom";
import TracklistComp from "../../components/Tracklist";

interface props {
    setTrack: React.Dispatch<React.SetStateAction<track>>, 
    activeTrack:track;
}


export const AuthorComp = (props: props) => {
    const url = "http://localhost:5000";
    let { authorName } = useParams();
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([]);
    authorName = authorName?.replaceAll("-", " ");
    useEffect(() => {
        fetch(url + "/author/"+ authorName).then(response => {
            response.json().then(data => {
                setTracks(data);
                setLoading(false);
            })
        })
    }, [authorName])
    


    return (<div className="page" id="page-author">
        <h1>{authorName}</h1>
        <div >
            <h3 id="author-from-label">More From Him:</h3>
                <TracklistComp likedByUser={[]} tracks={tracks} setTrack={props.setTrack} activeTrack={props.activeTrack }/>
            </div>
    </div>);
}