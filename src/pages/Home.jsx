import { Icon } from "@iconify/react";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import { signInWithGoogle, signOut } from "../firebase";
import Uploadmusic from "./components/Uploadmusic";
import NoLogin from "./components/NoLogin";
import MusicList from "./components/MusicList";

const Home = () => {
  const { user, setUser, navigate, add, setAdd } = useContext(appContext);

  return (
    <main className="w-full flex-initial flex h-full  relative overflow-y-auto">
      {user ? <MusicList /> : ""}
      {add && user ? <Uploadmusic /> : add && !user ? <NoLogin /> : ""}
    </main>
  );
};

export default Home;
