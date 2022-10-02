import React, { useEffect, useState } from 'react'
import { User } from '../../interfaces';
import TrackListRich from '../../components/trackListRich';
import {track} from '../../interfaces';


interface props{
    user:User | null | undefined;
    setTrack: React.Dispatch<React.SetStateAction<track>>, 
    activeTrack:track;
    
}

const Home = (props:props) => {
    
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
        <div className="page" id="home">
            {!props.user && <h2>Welcome To Muser !</h2>}
            {props.user && <h2>Welcome {props.user.username}</h2>}
            <TrackListRich activeTrack={props.activeTrack} likedByUser={[]} tracks={Tracklist} setTrack={props.setTrack} />
        </div>
    );  
}

export default Home;
