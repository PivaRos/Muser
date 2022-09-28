
import React, { useEffect, useState } from "react";
import TracklistComp from '../../components/Tracklist';
import {track} from '../../interfaces';
import s from "./Discover.module.css"



interface props {
    setTrack: React.Dispatch<React.SetStateAction<track>>, 
    activeTrack:track;
}

const Discover = (props: props) => {
    const [Tracklist, setTrackList] = useState<track[]>([{
        src:"",
        author:[""],
        name:"",
        icon:"",
        likes:0,
        _id:""
    }]);
    const [Loading, setLoading] = useState(true);
    const url = "http://localhost:5000";

    
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



    return (
        <div className="page" id={s.content}>
            <h2 id={s.label}>Discover</h2>
            {Loading && <h2 className={s.loading}>loading...</h2>}
            {!Loading && <TracklistComp likedByUser={[]} activeTrack={props.activeTrack} setTrack={props.setTrack} tracks={Tracklist}/>}
        </div>
    )
}

export default Discover;