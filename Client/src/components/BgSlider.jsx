import React, { useState } from "react";

const BackgroundCompare = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="px-4 py-10">
      <h1 className="text-center text-2xl md:text-3xl xl:text-4xl mt-1 font-semibold bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">
        Remove background with <br /> Quality and Accuracy
      </h1>

      <div className="relative mt-10 w-full max-w-3xl mx-auto">
        <div className="relative w-full h-auto">
          <img
            src="/image_w_bg.png"
            className="w-full block"
            alt="With Background"
          />
          <img
            src="/image_wo_bg.png"
            className="w-full block absolute top-0 left-0"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            alt="Without Background"
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-white rounded-full pointer-events-none"
            style={{
              left: `${sliderPosition}%`,
              transform: "translateX(-50%)",
            }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={handleSliderChange}
          className="w-full mt-6 appearance-none h-2 bg-gray-300 rounded-lg "
        />
      </div>
    </div>
  );
};

export default BackgroundCompare;
