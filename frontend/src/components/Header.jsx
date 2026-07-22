import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-xl mx-3 sm:mx-5 md:mx-10 lg:mx-14 px-5 sm:px-8 md:px-10 lg:px-20 overflow-hidden">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-5 py-10 sm:py-12 md:py-[8vw] md:mb-[-20px]">

        <p className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold leading-tight text-center md:text-left">
          Book Appointment
          <br />
          With Trusted Doctors
        </p>


        <div className="flex flex-col sm:flex-row items-center gap-3 text-white text-sm font-light text-center sm:text-left">
          <img className="w-24 sm:w-28" src={assets.group_profiles} alt="profiles" />
          <p>
            Simply browse through our executive list of trusted doctors.
          </p>
        </div>


        <a href="#speciality" className="flex items-center gap-2 bg-white px-7 sm:px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300">
          Book Appointment
          <img className="w-4" src={assets.arrow_icon} alt="arrow" />
        </a>

      </div>



      {/* RIGHT SIDE */}
      <div className="md:w-1/2 flex items-end justify-center md:justify-end">
        <img className="w-full sm:w-[90%] md:w-full h-auto object-contain rounded-lg" src={assets.header_img} alt="doctor" />
      </div>


    </div>
  )
}

export default Header