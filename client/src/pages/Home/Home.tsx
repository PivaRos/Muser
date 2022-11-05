import React, { useEffect, useState } from 'react'
import { Playlist, User } from '../../interfaces';
import TrackListRich from '../../components/track-list-rich/trackListRich';
import { track } from '../../interfaces';
import "../../css/home.css";
import { PlaylistComp } from '../../components/playlist';


interface props {
    user: User | null | undefined;
    setTrack: React.Dispatch<React.SetStateAction<track>>,
    activeTrack: track;
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    playLists:Playlist[]| undefined| null;
    setPlayList:React.Dispatch<React.SetStateAction<Playlist[] | undefined | null>>;
    setUser:React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

const Home = (props: props) => {


    const [Tracklist, setTrackList] = useState<track[]>([{
        src: "",
        author: [""],
        name: "",
        icon: "",
        likes: 0,
        _id: ""
    }]);
    const [Loading, setLoading] = useState(true);
    const url = "http://localhost:5000";


    useEffect(() => {

    const container = document.getElementById("track-ul-rich") ;
    console.log("started");
    // where "container" is the id of the container
    if(container){
    container.addEventListener("wheel", function (e) {

        container.scrollLeft += e.deltaY/1.01;
  });
  }

   return () => {
    if (container){
    container.removeEventListener("wheel", (e) => {});
    }
   };
}, [])

    useEffect(() => {
        fetch(url + '/track/list').then((res) => {
            if (res) {
                res.json().then(data => {
                    if (data) {
                        setTrackList(data);
                        setLoading(false);


                    }
                }).catch();
            }
            else {

            }
        }).catch((err) => {

        });
    }, [])

    return (
        <div className="page" id="home">
            {!props.user && <h2 id='head-title'>Welcome To Muser !</h2>}
            {Loading && <h2 className="loading">loading...</h2>}
            {props.user && <h2 id='head-title'>Welcome {props.user.username}</h2>}  
            <TrackListRich setUser={props.setUser} user={props.user} Playlists={props.playLists} setPlaying={props.setPlaying} playing={props.playing} activeTrack={props.activeTrack} likedByUser={[]} tracks={Tracklist} setTrack={props.setTrack} />
            
        </div>
    );
}

export default Home;
