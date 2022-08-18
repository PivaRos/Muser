import React, { useEffect, useRef, useState } from "react";
import styles from '../../css/player.module.css';
import Playsvg from '../../svgs/play.svg';
import Pausesvg from '../../svgs/pause.svg';




const Player = () => {
  const audioPlayer = useRef();
  const [ended, setEnded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playicon, setPlayicon] = useState(Playsvg);
  const url = 'http://localhost:5000/';
  const rendered = useRef(1);

  const Toggleplay = () => {
    setPlaying(!playing);
  };
  useEffect(() => {
    console.log(rendered.current);
    rendered.current = rendered.current +1;
  },[])

  useEffect(() => {
    if (playing) {
      audioPlayer.current.play();
      setPlayicon(Pausesvg);
    }
    else {
      audioPlayer.current.pause();
      setPlayicon(Playsvg);
    }
  }, [playing])

  useEffect(() => {
    audioPlayer.current.volume =volume;
  }, [volume])

  useEffect(() => {
    audioPlayer.src = url;
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
      />

              <img src={playicon} onClick={Toggleplay} />
              <input
        className={`${styles.slider}` }
        id={styles.volumeSlider}
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume * 100}
        onChange={(e) => { setVolume(e.target.value / 100); }} />
      <div>
      </div>
    </div>

  )
}

export default Player;