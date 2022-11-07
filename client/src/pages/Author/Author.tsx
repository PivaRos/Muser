import React, { useEffect, useState } from "react"
import { track, User } from '../../interfaces';
import { useParams } from "react-router-dom";
import TracklistComp from "../../components/Tracklist";

interface props {
    setTrack: React.Dispatch<React.SetStateAction<track>>,
    activeTrack: track;
    user : User | null | undefined;
    setUser:React.Dispatch<React.SetStateAction<User | null | undefined>>;
}


export const AuthorComp = (props: props) => {
    const url = process.env.REACT_APP_url;
    let { authorName } = useParams();
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([]);
    authorName = authorName?.replaceAll("-", " ");
    useEffect(() => {
        fetch(url + "/author/" + authorName).then(response => {
            response.json().then(data => {
                setTracks(data);
                setLoading(false);
            })
        })
    }, [authorName])




    return (<div className="page" id="page-author">
        <h1>{authorName}</h1>
        <div >
            {loading && <h2 className="loading">loading...</h2>}
            <h3 id="author-from-label">More From Him:</h3>
            <TracklistComp setUser={props.setUser} settings={{withAuthor:false}} user={props.user} tracks={tracks} setTrack={props.setTrack} activeTrack={props.activeTrack} />
        </div>
    </div>);
}