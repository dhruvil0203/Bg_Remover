import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/">
        <img className="w-32 sm:w-44" src={assets.logo} alt="logo" />
      </Link>
      {isSignedIn ? (
        <div className="">
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => {
            openSignIn({});
          }}
          className="bg-zinc-800 text-white hover:cursor-pointer flex items-center gap-4 px-2 py-2 sm:px-8 sm:py-3 rounded-full text-md"
        >
          Get Started{" "}
          <img src={assets.arrow_icon} alt="" className="w-3 sm:w-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
