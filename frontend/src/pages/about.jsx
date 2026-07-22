import React from 'react';
import { assets } from '../assets/assets';

const About = () => {

  return (

    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8">


      {/* Heading */}

      <div>

        <p className="text-2xl sm:text-3xl text-center font-semibold text-gray-500">
          ABOUT US
        </p>



        {/* About Section */}

        <div className="my-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">


          <img
            className="w-full sm:w-[80%] md:w-[360px] rounded-xl object-cover"
            src={assets.about_image}
            alt="About DocEase"
          />



          <div className="flex flex-col justify-center gap-5 md:w-2/3 text-sm sm:text-base text-gray-600 leading-7 text-center md:text-left">


            <p>
              DocEase is a modern healthcare platform designed to simplify the
              process of finding trusted doctors and booking appointments online.
              Our mission is to make quality healthcare accessible, convenient,
              and hassle-free for everyone.
            </p>


            <p>
              With DocEase, patients can easily explore doctors, check availability,
              and schedule appointments from anywhere, anytime.
            </p>


          </div>


        </div>


      </div>




      {/* Why Choose Us */}


      <div className="mt-12 sm:mt-16">


        <h2 className="text-center md:text-left text-2xl sm:text-3xl font-semibold">

          <span className="text-gray-400">
            WHY 
          </span>

          <span className="text-gray-800">
            {" "}CHOOSE US
          </span>

        </h2>




        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">



          <div className="border border-gray-300 rounded-xl p-6 sm:p-8 cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300">

            <p className="text-lg font-semibold text-gray-800 mb-4">
              EFFICIENCY
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-6">
              Quickly find verified doctors and book appointments without long waiting times.
            </p>

          </div>





          <div className="border border-gray-300 rounded-xl p-6 sm:p-8 cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300">

            <p className="text-lg font-semibold text-gray-800 mb-4">
              CONVENIENCE
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-6">
              Manage your healthcare appointments easily from anywhere at any time.
            </p>

          </div>





          <div className="border border-gray-300 rounded-xl p-6 sm:p-8 cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300">

            <p className="text-lg font-semibold text-gray-800 mb-4">
              PERSONALIZATION
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-6">
              Get healthcare experiences tailored according to your needs and preferences.
            </p>

          </div>



        </div>


      </div>


    </div>

  );
};


export default About;