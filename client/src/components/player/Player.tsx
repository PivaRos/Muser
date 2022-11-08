import React, { useEffect, useRef, useState } from "react";
import { track, User } from '../../interfaces';
import '../../css/player.css';
import '../../css/player-mobile.css';
import { AuthorComponent } from "../authorComponent";
import { TimeView } from "../TimeViewer";
import Filledheart from "../../svgs/filledheart";
import Emptyheart from "../../svgs/emptyheart";
const Playsvg = require("../../svgs/play.svg");
const Pausesvg = require("../../svgs/pause.svg");
const Forwardsvg = require("../../svgs/forward.svg");
const Backwardsvg = require("../../svgs/backward.svg");
const Volume1 = require("../../svgs/volume1.svg");
const Volume05 = require("../../svgs/volume0.5.svg");
const Volume0 = require("../../svgs/volume0.svg");



interface props {
  track: track;
  tracks?: {

  };
  setTrack: React.Dispatch<React.SetStateAction<track>>;
  setNextAndBack: React.Dispatch<React.SetStateAction<number>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

const Player = (props: props) => {
  const [currentSvg, setCurrentSvg] = useState(Volume1);
  const [Loading, setLoading] = useState(true);
  const audioPlayer = useRef(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(+audioPlayer.current.duration);
  const [volume, setVolume] = useState(1);
  const [playicon, setPlayicon] = useState(Playsvg);
  const url = process.env.REACT_APP_url;
  const urlsrc = url + "/upload/file/";
  const urlicon = url + "/upload/file/";
  const [wasPlaying, setWasPlaying] = useState(false);
  const [lockedButton, setLockedButton] = useState(false);


  const [loadingLike, SetloadingLike] = useState(false);

  const [Loved, setLoved] = useState(false);
  const [likes, setLikes] = useState(props.track.likes);


  //global main stuff here 
  useEffect(() => {
    if (getCookie("Volume") !== null) {
      let volume = getCookie("Volume") || 1;
      setVolume(+volume);
    }
    else {
      setLoved(false);
    }
  }, [])

  useEffect(() => {
    updateLiked();
  }, [props.user])



  const Toggleplay = () => {
    if (!Loading) {
      props.setPlaying(!props.playing);
    }
    else {
      setLoading(false);
      props.setPlaying(!props.playing);
    }
  };

  const Next = () => {
    if (!lockedButton) {
      setLockedButton(true);
      props.setNextAndBack(1);
      setLockedButton(false);
    }
  };

  const Previous = () => {
    setLockedButton(true);
    props.setNextAndBack(-1);
    setLockedButton(false);
  };


  useEffect(() => {
    if (props.playing) {
      try {
        audioPlayer.current.play();
      } catch {
      }

      setPlayicon(Pausesvg.default);
    }
    else {
      audioPlayer.current.pause();
      setPlayicon(Playsvg.default);
    }
  }, [props.playing])
  useEffect(() => {
    audioPlayer.current.volume = volume;

    if (audioPlayer.current.volume > 0.5 && currentSvg !== Volume1) {
      setCurrentSvg(Volume1);
    }
    else if (audioPlayer.current.volume === 0 && currentSvg !== Volume0) {
      setCurrentSvg(Volume0);
    }
    else if (audioPlayer.current.volume <= 0.5 && currentSvg !== Volume05) {
      setCurrentSvg(Volume05);
    }
  }, [volume])


  const toggleLoved = async () => {
    if (!loadingLike) // if not already doing somth
    {
      SetloadingLike(true);
      if (Loved) {
        //from like to unlike
        //code here
        const options = {
          method: "PUT",
          headers: {
            "Authorization": getCookie("SessionID") || ""
          },
          body: JSON.stringify({
            trackid: props.track._id
          })
        }
        const response = await fetch(url + "/user/track/unlike", options);
        if (response.status === 200) {
          setLoved(!Loved);
          //update local user
          if (props.user) {
            for (let i = 0; i < props.user.likedtracks.length; i++) {
              if (props.user.likedtracks[i] === props.track._id) {
                let clone = props.user;
                clone.likedtracks.splice(i, 1);
                props.setUser(clone);
                let cloneTrack = props.track;
                cloneTrack.likes -= 1;
                props.setTrack(cloneTrack);
              }

            }
          }
        }
        else {
          //message here
        }
        SetloadingLike(false);
      }
      else {
        //from unlike to like
        // code here
        const options = {
          method: "PUT",
          headers: {
            "Authorization": getCookie("SessionID") || ""
          },
          body: JSON.stringify({
            trackid: props.track._id
          })
        }
        const response = await fetch(url + "/user/track/like", options);
        if (response.status === 200) {
          setLoved(!Loved);
          //update local user
          if (props.user) {

            let clone = props.user;
            clone.likedtracks.push(props.track._id);
            props.setUser(clone);
            let cloneTrack = props.track;
            cloneTrack.likes += 1;
            props.setTrack(cloneTrack);
          }
        }
        else {
          //message
        }
        setLoading(false);
      }
    }
  }



  const onPlaying = () => {
    setDuration(audioPlayer.current.duration)
    setCurrentTime(audioPlayer.current.currentTime);
  };

  const volumeChange = (e: any) => {
    setVolume(+e.target.value / 100);
    setCookie("Volume", `${+e.target.value / 100}`, 1);

  }

  const Ended = () => {
    Next();
  }


  const LoadedData = () => {
    setCurrentTime(0);
    setDuration(audioPlayer.current.duration);
    if (wasPlaying) {
      props.setPlaying(true);
    }
    else {
      props.setPlaying(false);
    }
  }

  const updateLiked = () => {
    setLikes(props.track.likes);
    let found = false;
    props.user && props.user.likedtracks.map((track) => {
      if (track === props.track._id) {
        found = true;
        setLoved(true);
      }
    })
    !found && setLoved(false);
  }


  useEffect(() => {

    updateLiked();

    if (props.playing) {
      props.setPlaying(false);
      setWasPlaying(true);

    }
    else {
      setWasPlaying(false);
    }
  }, [props.track])

  return (
    <div id="player">

      <div id="track-data">
        {props.track.icon && <img className="icon" id="track-icon" src={urlicon + props.track.icon} alt="" /> || <img className="icon" id="track-icon" src={urlicon + "default.png"} alt="" />}
        <div id="track-text">
          <span id="track-name">{props.track.name}</span><br />
          {props.track.author.map((author, index) => (
            <AuthorComponent key={index} author={author} />
          ))}
        </div>
        {props.user && <div onClick={toggleLoved} className="heart-icon liked-icon-player">{Loved ? <Filledheart /> : <Emptyheart />}<span className="track-list-likes-counter">{likes}</span></div> || <span className="track-list-likes-counter">{likes}</span>}
      </div>

      <audio
        src={props.track.src && urlsrc + props.track.src}
        ref={audioPlayer}
        onTimeUpdate={onPlaying}
        onEnded={Ended}
        onCanPlay={LoadedData}
      ></audio>
      {audioPlayer.current.duration && <span className="time-viewer time-viewer-passed">{!isNaN(duration) && <TimeView seconds={currentTime} />}</span> || <></>}
      <input
        className="slider"
        id="timeSlider"
        type="range"
        min="1"
        max={duration && +duration || 100}
        step="1"
        value={currentTime}
        readOnly
      />
      {audioPlayer.current.duration && <span className="time-viewer time-viewer-left">{(!isNaN(duration) && duration) && <TimeView seconds={Math.round(duration) - Math.round(currentTime)} />}</span> || <></>}
      <img className="player-button" id="backwardsvg" src={Backwardsvg.default} alt="" onClick={Previous} />
      <img className="player-button" id="playimg" src={playicon} alt="" onClick={Toggleplay} />
      <img className="player-button" id="forwardsvg" src={Forwardsvg.default} alt="" onClick={Next} />
      <div id="volume-div">
        <img className="player-svg" id="volume-svg" src={currentSvg.default} alt="" />
        <input
          className="slider"
          id="volumeSlider"
          type="range"
          min={0}
          max={100}
          step="1"
          value={volume * 100}
          onChange={volumeChange} />
      </div>
      <div>
      </div>
    </div>

  )
}

export default Player;

function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}


function getCookie(name: string): string | null {
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

function setCookie(cName: string, cValue: string, expDays: number) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}