import React, { useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../../App";
import { Icon } from "@iconify/react";
import { beforeAuthStateChanged } from "firebase/auth";
import Player from "./Player";
import PlayerNoLoop from "./PlayerNoLoop";

const MusicList = () => {
  const [loop, setLoop] = useState(false);
  const { setAdd, user, userdata, currentMusic, setCurrentMusic, search } =
    useContext(appContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [List, setList] = useState([]);
  useEffect(() => {
    setList(
      userdata?.musics.filter((music) =>
        music.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [userdata?.musics, search, userdata]);
  return (
    <div className="bg-zinc-900 w-full text-white/80 flex flex-col gap-3 mt-4">
      {List?.map((music) => (
        <div className="w-full flex flex-col gap-3 p-2 " key={music.music_url}>
          <div className="items-center flex flex-row gap-4 w-full justify-between">
            <div className="">
              <h1>{music.name}</h1>
            </div>
            <div>
              <button>
                <Icon
                  icon="aterial-symbols:delete-outline"
                  className="w-5 h-5 text-white/80"
                />
              </button>
              <button
                onClick={() => {
                  loop != music.music_url
                    ? setLoop(music.music_url)
                    : setLoop(false);
                }}
                className={`border-white border-2 hover:bg-white hover:text-zinc-900 ${
                  loop == music.music_url ? "bg-white text-zinc-900" : ""
                } transition-all p-2 flex flex-row items-center gap-3`}
              >
                <p className="ml-3">Loop</p>{" "}
                <Icon icon="teenyicons:loop-outline" className="mr-3 w-4 h-4" />
              </button>
            </div>
          </div>
          {loop == music.music_url ? (
            <Player
              props={{
                music: music.music_url,
              }}
            />
          ) : (
            <PlayerNoLoop
              props={{
                music: music.music_url,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MusicList;
