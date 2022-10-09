import React, { useEffect, useState } from "react";
import Emptyheart from "../svgs/emptyheart";
import Filledheart from "../svgs/filledheart";
import { track, User } from '../interfaces';
import { AuthorComponent } from "./authorComponent";

const url = "http://localhost:5000";

interface props {
    track: track;
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack: track;
    liked: boolean;
    user:User | null | undefined;
}

const TrackRow = (props: props) => {
    const [liClasses, setLiClasses] = useState("track-li ");
    const [Loved, setLoved] = useState(props.liked);
    const [likes, setLikes] = useState(props.track.likes);
    const [loading, setLoading] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const changeTrack = () => {
        props.setTrack(props.track)

    }

    useEffect(() => {
        if (props.user)
        {
            setIsLoggedin(true);
        }
        else
        {
            setIsLoggedin(false);
        }
    }, [props.user])



    useEffect(() => {
        if (JSON.stringify(props.track) === JSON.stringify(props.activeTrack)) {
            setLiClasses("track-li active-track");
        }
        else {
            setLiClasses("track-li");
        }

    }, [props.activeTrack, props.track])


    const toggleLoved = async () => {
        if (!loading) // if not already doing somth
        {
            console.log("hello")
            setLoading(true);
            if (Loved) {
                //from like to unlike
                //code here
                const options = {
                    method:"PUT",
                    headers: {
                        "Authorization": getCookie("SessionID") || ""
                    },
                    body:JSON.stringify({
                        trackid:props.track._id
                    })
                }
                const response = await fetch(url+ "/user/track/unlike", options);
                if (response.status === 200)
                {
                    setLoved(!Loved);
                    setLikes(likes - 1);
                }
                else
                {
                    //message here
                }
                setLoading(false);
            }
            else {
                //from unlike to like
                // code here
                const options = {
                    method:"PUT",
                    headers: {
                        "Authorization": getCookie("SessionID") || ""
                    },
                    body:JSON.stringify({
                        trackid:props.track._id
                    })
                }
                const response = await fetch(url+ "/user/track/like", options);
                if (response.status === 200)
                {
                    setLikes(likes + 1);
                    setLoved(!Loved);
                }
                else
                {
                    //message
                }
                setLoading(false);  
            }
        }
    }

    return (
        <li className={liClasses} >
            <div className="li-div" onClick={changeTrack}>
                <label className="track-name">{props.track.name}</label>
                <div className="author-div">
                    {props.track.author && props.track.author.map((author, index) => (
                        <AuthorComponent key={index} author={author} />
                    ))}
                </div>
                <label className="duration"></label>
            </div>

           {props.user && <div onClick={toggleLoved} className="heart-icon">{Loved ? <Filledheart /> : <Emptyheart />}<span className="track-list-likes-counter">{likes}</span></div> || <span className="track-list-likes-counter">{likes}</span>}
        </li>);
};

export default TrackRow

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