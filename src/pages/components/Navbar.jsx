import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { appContext } from "../../App";
import { signInWithGoogle, signOut } from "../../firebase";
import Uploadmusic from "./Uploadmusic";
import NoLogin from "./NoLogin";

const Navbar = () => {
  const { user, setUser, navigate, add, setAdd, search, setSearch } =
    useContext(appContext);
  return (
    <main className="w-full flex-1">
      <div className="text-white/70 flex justify-center text-2xl">
        <h1>Music Player</h1>
      </div>
      <div className="w-full p-5 flex justify-center items-center flex-initial  "></div>
      <div className="w-full flex flex-row gap-3 items-center ">
        <div className="">
          {user ? (
            <Icon
              onClick={() => signOut(navigate)}
              icon="uit:signout"
              className="text-white/80 w-7 h-7"
            />
          ) : (
            <div>
              <Icon
                onClick={() => {
                  signInWithGoogle();
                }}
                icon="mdi:google"
                className="text-white/80 hover:text-red-500/80 rounded-full transition-all  w-7 h-7"
              />
            </div>
          )}
        </div>
        <button className=" ml-8 mr-8 w-full border-white/70 border-2 flex justify-center items-center h-12 ">
          <Icon
            icon="material-symbols:search"
            className="ml-3 h-5 w-5 text-white/80"
          />
          <input
            className={`outline-none bg-zinc-900 p-3  h-11 w-full text-white/80 `}
            type="text"
            placeholder=""
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </button>
        <button>
          <Icon
            onClick={() => setAdd(true)}
            icon="material-symbols:add"
            className="w-7 h-7 text-white/80"
          />
        </button>
      </div>
    </main>
  );
};

export default Navbar;
