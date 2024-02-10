import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { appContext } from "../../App";

const NoLogin = () => {
  const { setAdd } = useContext(appContext);
  return (
    <div className="text-white/80 absolute flex flex-col justify-center items-center p-14 gap-4 bg-zinc-800  w-full h-[400px]">
      <p className="text-xl first-letter:uppercase">have no account?</p>
      <button
        onClick={() => {
          setAdd(false);
        }}
        className="flex flex-row items-center w-full h-12 bg-zinc-900 justify-center rounded-md gap-3 hover:gap-6 transition-all"
      >
        continue <Icon icon="mdi:arrow-right" className="w-7 h-7" />
      </button>
    </div>
  );
};

export default NoLogin;
