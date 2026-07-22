import React from 'react';
import { assets } from '../assets/assets';

const about = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8">

      {/* Heading */}
      <div>
        <p className="text-2xl sm:text-3xl text-center font-semibold text-gray-500">
          ABOUT US
        </p>

        {/* About Section */}
        <div className="my-10 flex flex-col md:flex-row items-center gap-10 md:gap-12">
          <img
            className="w-full max-w-sm md:max-w-[360px] rounded-lg"
            src={assets.about_image}
            alt="About"
          />

          <div className="flex flex-col justify-center gap-5 md:w-2/3 text-sm sm:text-base text-gray-600">
            <p>
              DocEase is a modern healthcare platform designed to simplify the process of finding trusted doctors and booking appointments online. Our mission is to make quality healthcare accessible, convenient, and hassle-free for everyone, anytime and anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-16">
        <h2 className="text-center md:text-left text-2xl sm:text-3xl font-semibold">
          <span className="text-gray-400">WHY </span>
          <span className="text-gray-800">CHOOSE US</span>
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="border border-gray-300 rounded-lg p-8 cursor-pointer">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              EFFICIENCY
            </p>

            <p className="text-gray-600 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Alias, deleniti.
            </p>
          </div>

          <div className="border border-gray-300 rounded-lg p-8 cursor-pointer">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              CONVENIENCE
            </p>

            <p className="text-gray-600 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Alias, deleniti.
            </p>
          </div>

          <div className="border border-gray-300 rounded-lg p-8 cursor-pointer">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              PERSONALIZATION
            </p>

            <p className="text-gray-600 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Alias, deleniti.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default about;