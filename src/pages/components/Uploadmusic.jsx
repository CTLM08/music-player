import { Icon } from "@iconify/react";
import React, { useContext, useRef, useState } from "react";
import { appContext } from "../../App";
import { v4 } from "uuid";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

const Uploadmusic = () => {
  const { setAdd, user, userdata } = useContext(appContext);
  const uploadMusicRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [nameOfMusic, setNameOfMusic] = useState(null);
  const [music, setMusic] = useState(null);

  function uploadMusic(musicref_) {
    if (music == null) return;
    const id = v4();
    const musicRef = ref(storage, `musics/${musicref_.name + id}`);
    const ref_ = doc(firestore, "user", user.uid);
    setLoading(true);
    uploadBytes(musicRef, musicref_).then(async () => {
      await updateDoc(ref_, {
        musics: arrayUnion({
          name: nameOfMusic,
          music_url: `https://firebasestorage.googleapis.com/v0/b/music-app-6e317.appspot.com/o/${encodeURIComponent(
            musicRef.fullPath
          )}?alt=media`,
        }),
      }).then(() => {
        setLoading(false);
        setAdd(false);
      });
    });
  }

  return (
    <div className="text-white/80 fixed top-0 left-0 flex flex-col p-14 gap-4 bg-zinc-800/50  w-full h-full justify-center items-center  ">
      <div className="flex flex-col gap-4 bg-zinc-800 p-14 w-[80%]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl">Upload New Music</h1>
          <button
            onClick={() => {
              setAdd(false);
            }}
          >
            <Icon icon="fluent-mdl2:cancel" className="w-6 h-6" />
          </button>
        </div>
        <div>
          <p>music name:</p>
          <input
            value={nameOfMusic}
            onChange={(e) => {
              setNameOfMusic(e.target.value);
            }}
            className="w-full mt-2 bg-zinc-900 h-12 rounded-md text-white/80 p-3 outline-none"
          />
        </div>
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={uploadMusicRef}
          onChange={(e) => {
            console.log(e.target.files[0].name);
            setMusic(e.target.files[0]);
          }}
        />
        <button
          onClick={() => uploadMusicRef.current.click()}
          type="button"
          className="rounded-md bg-zinc-900 h-12 w-full flex flex-row items-center gap-3 justify-center hover:gap-6 transition-all "
        >
          {music ? music.name : "Upload File"}
          <Icon icon="material-symbols-light:upload" className="w-7 h-7" />
        </button>
        <button
          onClick={() => uploadMusic(music)}
          className="rounded bg-zinc-900 hover:bg-white hover:text-zinc-900 transition-all hover:gap-6  h-12 w-full flex items-center justify-center flex-row gap-3"
        >
          {loading ? (
            <Icon icon="line-md:loading-loop" className="w-6 h-6" />
          ) : (
            <div className="rounded bg-zinc-900 hover:bg-white hover:text-zinc-900 transition-all hover:gap-6  h-12 w-full flex items-center justify-center flex-row gap-3">
              Upload music
              <Icon icon="mdi:arrow-right" className="w-7 h-7" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Uploadmusic;
