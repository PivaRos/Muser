import React, { useEffect, useState } from "react";
import Emptyheart from "../svgs/emptyheart";
import Filledheart from "../svgs/filledheart";
import { track } from '../interfaces';
import { AuthorComponent } from "./authorComponent";


interface props {
    track: track;
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack: track;
    liked: boolean;
}

const TrackRow = (props: props) => {
    const [liClasses, setLiClasses] = useState("track-li ");
    const [Loved, setLoved] = useState(props.liked);
    const [likes, setLikes] = useState(props.track.likes);
    const changeTrack = () => {
        props.setTrack(props.track)

    }



    useEffect(() => {
        if (JSON.stringify(props.track) === JSON.stringify(props.activeTrack)) {
            setLiClasses("track-li active-track");
        }
        else {
            setLiClasses("track-li");
        }

    }, [props.activeTrack, props.track])


    const toggleLoved = () => {
        if (Loved) {
            //from like to unlike

            setLoved(!Loved);
            setLikes(likes - 1);
        }
        else {
            //from unlike to like
            setLikes(likes + 1);
            setLoved(!Loved);

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

            <div onClick={toggleLoved} className="heart-icon">{Loved ? <Filledheart /> : <Emptyheart />}<span>{likes}</span></div>
        </li>);
};

export default TrackRow