import React, { useContext, useState } from "react";
import { appContext } from "../../App";
import { Icon } from "@iconify/react";
import { beforeAuthStateChanged } from "firebase/auth";

const MusicList = () => {
  const [loop, setLoop] = useState(false);
  const { setAdd, user, userdata } = useContext(appContext);
  return (
    <div className="bg-zinc-900 w-full text-white/80 flex flex-col gap-3 mt-4">
      {userdata?.musics?.map((music) => (
        <div className="w-full flex flex-col gap-3 p-2 ">
          <div className="items-center flex flex-row gap-4 w-full justify-between">
            <h1>{music.name}</h1>
            <button
              onClick={() => {
                !loop ? setLoop(music.music_url) : setLoop(false);
              }}
              className={`border-white border-2 hover:bg-white hover:text-zinc-900 ${
                loop == music.music_url ? "bg-white text-zinc-900" : ""
              } transition-all p-2 flex flex-row items-center gap-3`}
            >
              <p className="ml-3">Loop</p>{" "}
              <Icon icon="teenyicons:loop-outline" className="mr-3 w-4 h-4" />
            </button>
          </div>
          {loop == music.music_url ? (
            <audio
              loop
              controls
              src={music.music_url}
              className="w-full"
            ></audio>
          ) : (
            <audio controls src={music.music_url} className="w-full"></audio>
          )}
        </div>
      ))}
    </div>
  );
};

export default MusicList;
