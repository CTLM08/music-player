import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";
import { appContext } from "../../App";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const DeleteMusic = () => {
  const {
    user,
    setUser,
    navigate,
    add,
    setAdd,
    deleteMusic,
    setDeleteMusic,
    userdata,
  } = useContext(appContext);
  const deleteMs = () => {
    console.log(1);
    setLoading(true);
    updateDoc(doc(firestore, "user", user.uid), {
      musics: userdata.musics.filter(
        (music) => music.music_url != deleteMusic.music_url
      ),
    }).then(() => {
      setLoading(false);
      setDeleteMusic(null);
    });
  };
  const [loading, setLoading] = useState(false);
  return (
    <div className="text-white/80 fixed top-0 left-0 flex flex-col p-14 gap-4 bg-zinc-800/50  w-full h-full justify-center items-center ">
      <div className="bg-zinc-800 w-[60%] h-[40%] p-5 rounded-md flex flex-col justify-center items-center text-white/80 gap-3">
        <h1 className="text-xl">Delete Music?</h1>
        <p className="text-white/60">
          Are you sure you want to delete this music?
        </p>
        <div className="flex flex-row items-center gap-3">
          <Icon icon="ph:warning-duotone" className="text-red-500 w-8 h-8" />
          <p className="text-red-400/80">This action cannot be undone.</p>
        </div>
        <div className="w-[50%] flex flex-row items-center gap-5">
          <button
            className="flex flex-row  items-center gap-2 bg-slate-500 p-2 rounded-md w-1/2 justify-center"
            onClick={() => setDeleteMusic(null)}
            disabled={loading}
          >
            <Icon icon="fluent-mdl2:cancel" className="w-5 h-5" />
            cancel
          </button>
          <>
            {loading ? (
              <div className="p-2 rounded-md w-1/2 flex justify-center items-center bg-red-500/80">
                <Icon icon="line-md:loading-loop" className="w-6 h-6" />
              </div>
            ) : (
              <button
                className="flex flex-row  items-center gap-2 bg-red-500/80 p-2 rounded-md w-1/2 justify-center"
                onClick={() => deleteMs()}
              >
                <Icon icon="fluent-mdl2:delete" className="w-5 h-5" />
                delete
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default DeleteMusic;
