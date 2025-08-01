import React from "react";
import { assets } from "../assets/assets";

const Steps = () => {
  return (
    <div className="px-4 lg:px-20 py-20 xl:py-40">
      <h1 className="text-center text-2xl md:text-3xl xl:text-4xl mt-3 font-semibold bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">
        Steps to remove background
        <br />
        image in seconds
      </h1>
      <div className="mt-16 xl:mt-24 overflow-x-auto">
        <div className="flex flex-col sm:flex-row gap-6 px-4 pr-8">
          {/* Step 1 */}
          <div className="min-w-[300px] flex items-start gap-4 bg-white drop-shadow-md p-7 rounded hover:scale-105 transition duration-500">
            <img className="w-12" src={assets.upload_icon} alt="Upload" />
            <div>
              <p className="text-xl font-medium">Upload image</p>
              <p className="text-sm text-neutral-400 mt-1 leading-tight">
                This is demo text, will replace it later.
                <br />
                This is demo...
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="min-w-[300px] flex items-start gap-4 bg-white drop-shadow-md p-7 rounded hover:scale-105 transition duration-500">
            <img className="w-12" src={assets.remove_bg_icon} alt="Remove BG" />
            <div>
              <p className="text-xl font-medium">Remove background</p>
              <p className="text-sm text-neutral-400 mt-1 leading-tight">
                This is demo text, will replace it later.
                <br />
                This is demo...
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="min-w-[300px] flex items-start gap-4 bg-white drop-shadow-md p-7 rounded hover:scale-105 transition duration-500">
            <img className="w-12" src={assets.download_icon} alt="Download" />
            <div>
              <p className="text-xl font-medium">Download image</p>
              <p className="text-sm text-neutral-400 mt-1 leading-tight">
                This is demo text, will replace it later.
                <br />
                This is demo...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
