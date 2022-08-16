import React from "react";
import ReactAudioPlayer from 'react-audio-player';




const Player = () => {

    return (
        <ReactAudioPlayer  src="http://localhost:5000/"  volume={0.1} autoPlay controls controlsList={"nodownload noplaybackrate"}  />
    )
}

export default Player;