

import React, { useState, useEffect } from 'react'
import Discover from "../pages/Discover/Discover";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Player from './player/Player';
import Sidebar from "./Sidebar";
import Notfound from '../pages/Notfound/Notfound';
import { Playlist, track, User } from '../interfaces';
import { AuthorComp } from '../pages/Author/Author';
import { LoginPage } from '../pages/Login/LoginPage';
import { ProfilePage } from '../pages/Profile/ProfilePage';




export const Wrapper = () => {

    const [user, setUser] = useState<User | null>();
    const [Playlists, setPlaylists] = useState<Playlist[] | undefined | null>();
    const [track, setTrack] = useState({
        src: "",
        name: "",
        author: [""],
        icon: "",
        likes: 0,
        _id: ""
    });
    const [trackChange, setTrackChange] = useState({
        src: "",
        name: "",
        author: [""],
        icon: "",
        likes: 0,
        _id: ""
    });
    const [playing, setPlaying] = useState(false);
    const [prevTrackStack, setPrevTrackStack] = useState<track[]>([]);
    const [nextTrackStack, setNextTrackStack] = useState<track[]>([]);
    const [GlobalMessage, setGlobalMessage] = useState<string>("");

    const [NextAndPrevTrack, setNextAndPrevTrack] = useState(0);
    const url = process.env.REACT_APP_url;

    const [ExcludeForNext, setExcludeForNext] = useState<any[]>([]);

    useEffect(() => {
        if (NextAndPrevTrack === 1) {

            let ttrack = nextTrackStack.pop();
            if (ttrack) {
                prevTrackStack.push(track)
                setTrack(ttrack);

            }
            else {
                prevTrackStack.push(track);
                if (ExcludeForNext.length > 5) {
                    setExcludeForNext([]);
                }

                ExcludeForNext.push(track._id);
                const body = {
                    exclude: ExcludeForNext
                }
                const options = {
                    method: "POST",
                    body: JSON.stringify(body)
                }
                fetch(url + "/track/exclude", options).then((response) => {
                    response.json().then((data) => {
                        setTrack(data);
                    }).catch(() => {

                    });
                }).catch(() => {

                });
            }
        }
        if (NextAndPrevTrack === -1) {
            //change to prev from stack
            let tracks = prevTrackStack.pop();
            if (tracks?._id !== "") {
                nextTrackStack.push(track);
                tracks && setTrack(tracks);
            }
        }
        setNextAndPrevTrack(0);

    }, [NextAndPrevTrack])




    useEffect(() => {
        //logic to change track
        prevTrackStack.push(track);
        setTrack(trackChange);
    }, [trackChange])


    useEffect(() => {
        //Check if user loggedin
       const sessionid = getCookie("SessionID");
       const actionid = getCookie("ActionID");
       if (actionid) // need to add validation for action value
       {
        
       }
       if (sessionid) // need to add validation for session value
       {
        
        //user loggedin
        const options = {
            method:"GET",
            headers:{
                "Authorization":sessionid
            }
        }
        fetch(url+"/user/private", options).then(response => {
            response.json().then(data => {
                setUser(data);
            }).catch(() => {
               delete_cookie("SessionID");
            })
        }).catch(() => {
           delete_cookie("SessionID");
        });
       }
       else
       {
        //user is not loggedin. display default
       }
        
        //Get first random track
        fetch(url + '/track').then((res) => {
            if (res) {
                res.json().then(data => {
                    if (data) {
                        setTrack(data[0]);

                    }
                }).catch((err) => console.error(err));
            }
            else {
                console.log({ message: "no res object" });
            }
        }).catch((err) => {

        });

        let current_cookie = getCookie("SessionID");
        setInterval(function() {
            if (current_cookie !== getCookie("SessionID"))
            {
                if (current_cookie === null)
                {

                    current_cookie = getCookie("SessionID");
                }
                else{
                    setUser(null);
                    current_cookie = getCookie("SessionID");
                }
            }
        }, 1000); 
        return () => {
            
        };
       

    }, [])


    useEffect(() => {
        if (!user && Playlists)
        {
            for(var i = 0; i < Playlists.length; i++) {

                if (Playlists[i].name === "Liked Songs") {
                    if (Playlists.length === 1)
                    {
                        setPlaylists(null);
                        break;
                    }
                    else
                    {
                    var tempPlaylists = Playlists;
                    tempPlaylists.splice(i,1);
                    setPlaylists(tempPlaylists);
                    break;
                    }
                }
            }
        }

        if (Playlists)
        {
            if (user && user.likedtracks && user.likedtracks.length  > 2 )
            {

                var found = false;
                for(var i = 0; i < Playlists.length; i++) {
                    if (Playlists[i].name === "Liked Songs") {
                        found = true;
                        break;
                    }
                }

                if(!found){
                const options = {
                    method:"POST",
                    body:JSON.stringify({tracks:user?.likedtracks})
                }
                fetch(url+"/track/listById", options).then(response => {
                    response.json().then(data => {
                        if (!Playlists)
                        {
                            let clone = [];
                            clone.push({name:"Liked Songs", tracks:data, icon:null});
                            setPlaylists(clone);
                        }
                        else
                        {
                            let clone = Playlists
                            clone.push({name:"Liked Songs", tracks:data, icon:null});
                            setPlaylists(clone);
                        }

                        console.log(Playlists);
                    })
                })
                }
            }
        }
        else
        {
            if (user && user.likedtracks && user.likedtracks.length  > 2 )
            {

                const options = {
                    method:"POST",
                    body:JSON.stringify({tracks:user?.likedtracks})
                }
                fetch(url+"/track/listById", options).then(response => {
                    response.json().then(data => {
                            let clone = [];
                            clone.push({name:"Liked Songs", tracks:data, icon:null});
                            setPlaylists(clone);
                    })
                    
                })

            }
        }


        if (user)
        {

            let eventSource = new EventSource(url+"/event/init/"+getCookie("SessionID"));

            
            eventSource.onopen = () => {
                console.log("opened ! ");
                
            }

            eventSource.onmessage = function(event) {
                console.log("New message", event.data);
                // will log 3 times for the data stream above
            }
        }
        
    }, [user])


    return (
        <div id="wrapper">
            <Router>
                <h3>{GlobalMessage}</h3>
                <Navbar user={user} />
                <Sidebar setTrack={setTrackChange} activeTrack={track} />
                <div id="content">
                    <Routes>
                        <Route path="/discover" element={<Discover setUser={setUser} user={user} activeTrack={track} setTrack={setTrackChange} />} />
                        <Route path="/profile/:username" element={<ProfilePage user={user} setUser={setUser}/>}/>
                        <Route path='/author/:authorName' element={<div><AuthorComp setUser={setUser} user={user} activeTrack={track} setTrack={setTrackChange} /></div>} />
                      {!user &&  <Route path="/login" element={<LoginPage setUser={setUser}/>} />}
                        <Route path="/" element={<Home setUser={setUser} setPlayList={setPlaylists} playLists={Playlists} setPlaying={setPlaying} playing={playing} activeTrack={track}  setTrack={setTrack} user={user} />} />
                        <Route path='*' element={<Notfound />} />

                    </Routes>

                </div>


                <Player setTrack={setTrack} setUser={setUser} user={user} playing={playing} setPlaying={setPlaying} setNextAndBack={setNextAndPrevTrack} track={track} />
            </Router>
        </div>
    );
}


function getCookie(name: string): string|null {
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}

function delete_cookie(name:string) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

export default Wrapper;