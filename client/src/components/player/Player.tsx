import React, { useEffect, useRef, useState } from "react";
import styles from '../../css/player.module.css';
const Playsvg = require("../../svgs/play.svg");
const Pausesvg = require("../../svgs/pause.svg");


interface props {
  track?: {
    src : string;
    name : string;
    author: string;
    logo:string;

  }
}

const Player = (props?: props) => {
  const audioPlayer = useRef(new Audio());
  const [ended, setEnded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(+audioPlayer.current.duration);
  const [seekValue, setSeekValue] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playicon, setPlayicon] = useState(Playsvg);
  const url = 'http://localhost:5000/';


  const Toggleplay = () => {
    setPlaying(!playing);
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
    setSeekValue(
      (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
    );
  };

  const volumeChange = (e: any) => {
    setVolume(+e.target.value / 100);
  }

  return (
    <div id={styles.player}>
      <audio
        src={url}
        ref={audioPlayer}
        onTimeUpdate={onPlaying}
        onEnded={Ended}
      ></audio>
      <input
        className={styles.slider}
        id={styles.timeSlider}
        type="range"
        min="1"
        max={duration}
        step="1"
        value={currentTime}
        readOnly
      />
      
      <img src={playicon} onClick={Toggleplay} />
      <input
        className={`${styles.slider}`}
        id={styles.volumeSlider}
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