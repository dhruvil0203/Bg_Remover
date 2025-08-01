import React from "react";

const Result = () => {
  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[70vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Original Image */}
          <div className="flex flex-col items-center">
            <p className="font-semibold text-gray-600 mb-3 text-xl">Original</p>
            <div className="w-full h-[400px] rounded-md overflow-hidden flex items-center justify-center  ">
              <img
                className="object-contain w-full h-full"
                src="/image_w_bg.png"
                alt="Original with background"
              />
            </div>
          </div>

          {/* Background Removed */}
          <div className="flex flex-col items-center">
            <p className="font-semibold text-gray-600 mb-3 text-2xl">
              Background Removed
            </p>

            <div className="w-full h-[400px] rounded-md overflow-hidden flex items-center justify-center relative ">
              <img src="/image_wo_bg.png" alt="" />
              {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="border-4 border-violet-500 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
          <button className="px-8 py-2.5 text-violet-600 text-md border border-violet-600 rounded-full hover:scale-105 transition-all duration-700">
            Try another image
          </button>
          <a
            href=""
            className="px-8 py-2.5 text-white  text-md bg-gradient-to-r from-violet-600 to-fuchsia-400 rounded-full font-semibold hover:scale-105 transition-all duration-700"
          >
            Download image
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
