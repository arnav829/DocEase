import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {

  return (

    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8">


      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">



        {/* Image */}

        <div className="w-full md:w-1/2">

          <img
            src={assets.contact_image}
            alt="Contact"
            className="w-full rounded-xl object-cover"
          />

        </div>





        {/* Contact Details */}

        <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-center md:text-left">



          <div>


            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              OUR OFFICE
            </h2>



            <p className="text-gray-600 text-sm sm:text-base">
              123 Healthcare Avenue
            </p>


            <p className="text-gray-600 text-sm sm:text-base">
              Mumbai, Maharashtra, India
            </p>


          </div>





          <div className="space-y-2">


            <p className="text-gray-700 font-medium">
              +91 8463859392
            </p>


            <p className="text-gray-700 font-medium">
              DocEase@gmail.com
            </p>


          </div>






          <div>


            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              CAREERS AT DOCEASE
            </h2>



            <p className="text-gray-600 text-sm sm:text-base leading-6">
              Join our passionate team and help transform healthcare through
              technology and innovation.
            </p>


          </div>






          <button

            onClick={() => window.open(
              'https://en.wikipedia.org/wiki/Hospital',
              '_blank'
            )}

            className="border border-gray-900 px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-fit mx-auto md:mx-0"

          >

            EXPLORE

          </button>



        </div>



      </div>


    </div>

  );

};


export default Contact;