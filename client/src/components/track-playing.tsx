import { useEffect, useState } from "react";
import { track } from "../interfaces";
const Playsvg = require("../svgs/play.svg");
const Pausesvg = require("../svgs/pause.svg");

interface props{
    isCurrentlyPlaying:boolean;
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    setPlaying:React.Dispatch<React.SetStateAction<boolean>>;
    playing:boolean;
    setIsCurrentPlaying:React.Dispatch<React.SetStateAction<boolean>>;

}

export const TrackPlaying = (props:props) => {


    const [playicon, setPlayicon] = useState(Playsvg);

    useEffect(() => {
        if (props.isCurrentlyPlaying)
        {
            console.log(`i am playing`)
            setPlayicon(Pausesvg);
        }
        else
        {
            console.log(`not playing`);

            setPlayicon(playicon);
        }
    }, [props.playing])


   const TogglePlay = () => {
    if (props.isCurrentlyPlaying)
    {

    }
    else
    {

    }
   }

    return (<div onClick={TogglePlay} className="track-playing-rich">   
      <img className="player-button rich-button" id="playimg" src={playicon.default} />
    </div>);
}