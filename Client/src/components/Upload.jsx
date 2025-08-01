import React from "react";
import { assets } from "../assets/assets";

const Upload = () => {
  return (
    <div className="pb-16 mt-10">
      <h1 className="text-center text-2xl md:text-3xl xl:text-4xl  font-semibold bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent md:py-16">
        See how the magic.Try Now
      </h1>
      <div className="text-center mb-14">
        <input type="file" name="" id="upload1" hidden />
        <label
          htmlFor="upload1"
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
        >
          <img width={20} src={assets.upload_btn_icon} alt="" />
          <p className="text-white text-md font-bold">Upload your image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
