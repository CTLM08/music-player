import React, { useRef, useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import moment from "moment";
import { appContext } from "../../App";
const PlayerNoLoop = ({ props }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const { currentMusic, setCurrentMusic } = useContext(appContext);
  const [currentTime, setCurrentTime] = useState(0);
  const togglePlay = (music) => {
    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(music);
    }
  };
  useEffect(() => {
    if (currentMusic != props.music) {
      playerRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentMusic]);
  return (
    <div className="w-full">
      <div className="w-full flex-row flex items-center gap-3">
        <audio
          src={props.music}
          className=""
          ref={playerRef}
          preload="metadata"
          onLoadedMetadata={() => {
            setDuration(playerRef.current?.duration || 0);
          }}
          onTimeUpdate={() => {
            setCurrentTime(playerRef.current?.currentTime || 0);
          }}
        ></audio>

        <button
          className=""
          onClick={() => {
            setCurrentMusic(props.music);
            togglePlay(props.music);
          }}
        >
          <Icon
            icon={isPlaying ? "akar-icons:pause" : "akar-icons:play"}
            className="w-5 h-5 text-white/80"
          />
        </button>
        <input
          type="range"
          value={currentTime}
          max={duration}
          className="w-full bg-zinc-800 h-1 rounded-md overflow-hidden appearance-none"
          onChange={(e) => {
            if (playerRef.current) {
              playerRef.current.currentTime = Number(e.target.value);
              setCurrentTime(Number(e.target.value));
            }
          }}
        />
        <span className="text-sm">
          {moment.utc(duration * 1000).format("mm:ss")}
        </span>
      </div>
    </div>
  );
};

export default PlayerNoLoop;
