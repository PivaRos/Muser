import { useEffect, useState } from "react";
import { track } from "../../interfaces";
const Playsvg = require("../../svgs/play.svg");
const Pausesvg = require("../../svgs/pause.svg");

interface props {
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    track: track;
    setTrack: React.Dispatch<React.SetStateAction<track>>;
    activeTrack: track;
    playing: boolean;
    cssClass: string;
}

export const TrackPlaying = (props: props) => {
    const [playicon, setPlayicon] = useState(Playsvg);


    const TogglePlay = () => {
        if (JSON.stringify(props.activeTrack) === JSON.stringify(props.track) && props.playing) {
            //pause 
            props.setPlaying(false);
            setPlayicon(Playsvg);

        }
        else {
            //resume
            if (JSON.stringify(props.activeTrack) !== JSON.stringify(props.track)) {
                props.setTrack(props.track);
            }
            props.setPlaying(true);
            setPlayicon(Pausesvg);
        }
    }


    useEffect(() => {
        if (JSON.stringify(props.activeTrack) === JSON.stringify(props.track) && props.playing) {
            setPlayicon(Pausesvg);
        }

    }, []);

    useEffect(() => {
        if (JSON.stringify(props.activeTrack) === JSON.stringify(props.track) && !props.playing) {
            setPlayicon(Playsvg);
        }
        else if (JSON.stringify(props.activeTrack) === JSON.stringify(props.track) && props.playing)
        {
            setPlayicon(Pausesvg);
        }

    }, [props.playing]);

    useEffect(() => {
        if (JSON.stringify(props.activeTrack) !== JSON.stringify(props.track)) {
            setPlayicon(Playsvg);
        }
    }, [props.activeTrack]);

    return (<div onClick={TogglePlay} className={"track-playing-rich " + props.cssClass}>
        <img className="player-button rich-button playimg" src={playicon.default} />
    </div>);
}