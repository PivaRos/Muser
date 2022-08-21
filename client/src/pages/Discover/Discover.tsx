
import React, { useEffect, useRef, useState } from "react";
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

const Discover = () => {
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
                        console.log(Tracklist);     
                
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
            <h1>hello with Discover </h1>
            {Loading && <h2 className="loading">loading...</h2>}
            {!Loading && <TracklistComp tracks={Tracklist}/>}
        </div>
    )
}

export default Discover;