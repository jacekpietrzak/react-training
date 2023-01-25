import { useRef } from "react";

const Player = ({ source }) => {
  /** tag html video ma swoje metody. W tym przypadku zostaly uzyte metody play i pause. Mozna zobaczyc jakie ma jeszcze inne metody googlujac tag video */
  const playerRef = useRef();
  const play = () => playerRef.current.play();
  const pause = () => playerRef.current.pause();

  console.log(playerRef);

  return (
    <div>
      <video ref={playerRef} src={source} controls width="600px">
        Sorry, your browser does not support embedded videos.
      </video>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};

export default Player;
