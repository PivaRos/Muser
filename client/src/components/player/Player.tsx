import React, { useEffect, useRef, useState } from "react";
import '../../css/player.css';
import '../../css/player-mobile.css';
const Playsvg = require("../../svgs/play.svg");
const Pausesvg = require("../../svgs/pause.svg");


interface props {
  track: {
    src : string;
    name : string;
    author: string;
    logo:string;

  }
}

const Player = (props: props) => {
  const [Loading, setLoading] = useState(true);
  const audioPlayer = useRef(new Audio());
  const [ended, setEnded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(+audioPlayer.current.duration);
  const [volume, setVolume] = useState(1);
  const [playicon, setPlayicon] = useState(Playsvg);
  const url = 'http://localhost:5000/music/1.mp3';

if (audioPlayer.current.src !== props.track.src)
{
  console.log("1"+props.track.src );
  console.log("2"+audioPlayer.current.src);
    audioPlayer.current.src = `http://localhost:5000/music/${props.track.src}`;
}

if (!isEmpty(audioPlayer.current.src) && audioPlayer.current.src != "http://localhost:5000/music/")
{
  setLoading(false);

}


  const Toggleplay = () => {
    if(!Loading)
    {
      setPlaying(!playing);
    }
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

  useEffect(() => {
    audioPlayer.current.src = url;
  }, [ended])

  const Ended = () => {
    setPlaying(false);
    setEnded(true);
  };




  const onPlaying = () => {
    setDuration(audioPlayer.current.duration)
    setCurrentTime(audioPlayer.current.currentTime);
  };

  const volumeChange = (e: any) => {
    setVolume(+e.target.value / 100);
  }

  return (
    <div id="player">
      <audio
        src={url}
        ref={audioPlayer}
        onTimeUpdate={onPlaying}
        onEnded={Ended}
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
      
      <img src={playicon} alt="" onClick={Toggleplay} />
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