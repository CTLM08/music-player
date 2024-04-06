import { Icon } from "@iconify/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./pages/components/Navbar";
export const appContext = createContext({
  user: null,
  setUser: () => {},
  userdata: null,
  setUserdata: () => {},
  navigate: () => {},
  add: null,
  setAdd: () => {},
  currentMusic: null,
  setCurrentMusic: () => {},
  search: "",
  setSearch: () => {},
  deleteMusic: null,
  setDeleteMusic: () => {},
});

const App = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [add, setAdd] = useState(null);
  const [deleteMusic, setDeleteMusic] = useState(null);
  const [user, setUser] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [currentMusic, setCurrentMusic] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setUser(_user);
        navigate("/");
        getDoc(doc(firestore, "user", _user.uid)).then((_doc) => {
          setUserdata(_doc.data());
        });
      } else {
        setUser(null);
      }
    });
  }, [user, userdata]);
  return (
    <appContext.Provider
      value={{
        user,
        setUser,
        userdata,
        setUserdata,
        navigate,
        add,
        setAdd,
        currentMusic,
        setCurrentMusic,
        search,
        setSearch,
        deleteMusic,
        setDeleteMusic,
      }}
    >
      <div
        className={`bg-zinc-900 p-5 flex justify-center items-center h-screen w-full transition-all flex-col`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
};

export default App;
