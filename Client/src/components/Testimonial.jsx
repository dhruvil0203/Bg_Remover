import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonial = () => {
  return (
    <div>
      {/* Title */}
      <h1 className="text-center text-2xl md:text-3xl xl:text-4xl mt-3 font-semibold bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent py-5">
        Customer Testimonia
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4">
        {testimonialsData.map((item, index) => (
          <div
            className="bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 duration-700"
            key={index}
          >
            <p className="text-md text-gray-500">”</p>
            <p className="text-md text-gray-500">{item.text}</p>
            <div className="flex items-center gap-3 mt-5">
              <img className="w-9 rounded-full" src={item.image} alt="" />
              <div>
                <p>{item.author}</p>
                <p className="text-sm text-gray-600">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
