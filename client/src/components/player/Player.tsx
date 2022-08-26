import React, { useEffect, useRef, useState } from "react";
import {track} from '../../interfaces';
import '../../css/player.css';
import '../../css/player-mobile.css';
const Playsvg = require("../../svgs/play.svg");
const Pausesvg = require("../../svgs/pause.svg");
const Forwardsvg = require("../../svgs/forward.svg");
const Backwardsvg = require("../../svgs/backward.svg");


  
interface props {
  track:track;
  setChangeTrack:React.Dispatch<React.SetStateAction<number>>;
}

const Player = (props: props) => {
  const [Loading, setLoading] = useState(true);
  const audioPlayer = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(+audioPlayer.current.duration);
  const [volume, setVolume] = useState(1);
  const [playicon, setPlayicon] = useState(Playsvg);
  const urlsrc = "http://localhost:5000/music/";
  const urlicon = "http://localhost:5000/music-images/";
  const [wasPlaying, setWasPlaying] = useState(false);



//global main stuff here 
 


  const Toggleplay = () => {
    if(!Loading)
    {
      setPlaying(!playing);
    }
    else
    {
     if (!isEmpty(audioPlayer.current.src) && audioPlayer.current.src !== "http://localhost:5000/music" && audioPlayer.current.src !== "http://localhost:3000/")
     {
      setLoading(false);
      setPlaying(!playing);
     }
    }
  };

  const Next = () => {
    props.setChangeTrack(1);
  };

  const Previous = () => {
    props.setChangeTrack(-1);
  };


  useEffect(() => {
    if (playing) {
      audioPlayer.current.play();
      setPlayicon(Pausesvg.default);
    }
    else {
      audioPlayer.current.pause();      
      setPlayicon(Playsvg.default);
    }
  }, [playing])

  useEffect(() => {
    audioPlayer.current.volume = volume;
  }, [volume])





  const onPlaying = () => {
    setDuration(audioPlayer.current.duration)
    setCurrentTime(audioPlayer.current.currentTime);
  };

  const volumeChange = (e: any) => {
    setVolume(+e.target.value / 100);
  }

  
  const LoadedData = () => {
 
   if (wasPlaying)
   {
    setPlaying(true);
   }
   else
   {
    setPlaying(false);
   }
  }

  useEffect(() => {
    if(playing)
    {
      setPlaying(false);
      setWasPlaying(true);
      audioPlayer.current.load();
    }
    else
    {
      setWasPlaying(false);
      audioPlayer.current.load();
    }
  }, [props.track])

  return (
    <div id="player">
      
      <div id="track-data">
      {props.track.icon && <img className="icon" id="track-icon" src={urlicon+ props.track.icon} alt=""/>}
      <div id="track-text">
        <span id="track-name">{props.track.name}</span><br/>
        <span id="track-author">{props.track.author}</span>
        </div>
      </div>

      <audio
        src={ urlsrc+props.track.src}
        ref={audioPlayer}
        onTimeUpdate={onPlaying}
        onEnded={Toggleplay}
        onCanPlay={LoadedData}
      ></audio>
      <input
        className="slider"
        id="timeSlider"
        type="range"
        min="1"
        max={duration}
        step="1"
        value={currentTime}
        readOnly
      />
      <img className="player-button" id="backwardsvg" src={Backwardsvg.default} alt="" onClick={Previous}/>
      <img className="player-button" id="playimg" src={playicon} alt="" onClick={Toggleplay} />
      <img className="player-button" id="forwardsvg" src={Forwardsvg.default} alt="" onClick={Next}/>
      <input
        className="slider"
        id="volumeSlider"
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume * 100}
        onChange={volumeChange} />
      <div>
      </div>
    </div>

  )
}

export default Player;

function isEmpty(value:any) {
  return value === undefined || value === null || value === '';
}