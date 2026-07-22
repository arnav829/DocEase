import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className="bg-primary rounded-xl mb-6 mx-3 sm:mx-5 md:mx-10 px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row overflow-hidden">

            <div className="flex-1 py-8 sm:py-10 md:py-14 lg:py-20 text-center md:text-left">

                <div className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                    <p>Book Appointment</p>
                    <p className="mt-2 sm:mt-4">With 100+ Trusted Doctors</p>
                </div>

                <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-white text-gray-600 text-sm sm:text-base px-7 sm:px-10 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-300">
                    Create Account
                </button>

            </div>

            <div className="flex justify-center md:justify-end items-end w-full md:w-1/2 lg:w-[420px]">
                <img className="w-[80%] sm:w-[60%] md:w-full max-w-md object-contain" src={assets.appointment_img} alt="appointment" />
            </div>

        </div>
    )
}

export default Banner