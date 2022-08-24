
import React, { useEffect, useState } from "react";
import TracklistComp from '../../components/Tracklist';
import s from "./Discover.module.css"


interface track  {
    src : string;
    icon:string;
    name:string;
    author:string;
    ID:number;
    likes:number;
}

interface props {
    setTrack: React.Dispatch<React.SetStateAction<{
        src: string;
        name: string;
        author: string;
        icon: string;
        likes: number;
        ID: number;
    }>>, 
    activeTrack:track;
}

const Discover = (props: props) => {
    const [Tracklist, setTrackList] = useState<track[]>([{
        src:"",
        author:"",
        name:"",
        icon:"",
        likes:0,
        ID:0
    }]);
    const [Loading, setLoading] = useState(true);


    
    useEffect(()=> {
        fetch('http://localhost:5000/').then((res) => {
            if (res)
            {
                res.json().then(data => {
                    if(data){
                        setTrackList(data);
                        setLoading(false);
                        
                
                    }
                }).catch((err) => console.error(err));
            }
            else
            {
            console.log({message : "no res object"});
            }
        }).catch((err) => {

        });
    }, [])


    return (
        <div className="page" id={s.content}>
            <h2 id={s.label}>Discover</h2>
            {Loading && <h2 className={s.loading}>loading...</h2>}
            {!Loading && <TracklistComp activeTrack={props.activeTrack} setTrack={props.setTrack} tracks={Tracklist}/>}
        </div>
    )
}

export default Discover;