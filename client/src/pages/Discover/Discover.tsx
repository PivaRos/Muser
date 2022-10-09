
import React, { useEffect, useState } from "react";
import TracklistComp from '../../components/Tracklist';
import {track, User} from '../../interfaces';
import s from "./Discover.module.css"

const url = "http://localhost:5000";

interface props {
    setTrack: React.Dispatch<React.SetStateAction<track>>, 
    activeTrack:track;
    user:User | null | undefined; 
}

const Discover = (props: props) => {
    const [likedByUser,setLikedByUser] = useState(props.user?.likedtracks || [""]);
    const [Tracklist, setTrackList] = useState<track[]>([{
        src:"",
        author:[""],
        name:"",
        icon:"",
        likes:0,
        _id:""
    }]);
    const [Loading, setLoading] = useState(true);

    
    useEffect(()=> {
        fetch(url+'/track/list').then((res) => {
            if (res)
            {
                res.json().then(data => {
                    if(data){
                        setTrackList(data);
                        setLoading(false);
                        
                
                    }
                }).catch();
            }
            else
            {

            }
        }).catch((err) => {

        });
    }, [])

    useEffect(() => {
        if(props.user?.likedtracks)
        {

            setLikedByUser(props.user.likedtracks || []);
        }
        else
        {
            setLikedByUser([]);
        }
    }, [props.user])



    return (
        <div className="page" id={s.content}>
            <h2 id={s.label}>Discover</h2>
            {Loading && <h2 className={s.loading}>loading...</h2>}
            {!Loading && <TracklistComp user={props.user} likedByUser={likedByUser} activeTrack={props.activeTrack} setTrack={props.setTrack} tracks={Tracklist}/>}
        </div>
    )
}

export default Discover;