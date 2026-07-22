import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className="md:mx-10 mx-5">

      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-[3fr_1fr_1fr] gap-10 lg:gap-14 my-10 mt-24 lg:mt-40 text-sm">

        <div>
          <h1 onClick={()=>{navigate('/'); window.scrollTo({top:0,behavior:'smooth'})}} className="mb-5 duration-300 transition-all text-4xl sm:text-5xl text-blue-400 hover:text-blue-700 font-bold cursor-pointer">
            DocEase
          </h1>

          <p className="w-full lg:w-2/3 text-gray-400 leading-6">
            <span className="block text-xl sm:text-2xl font-bold cursor-pointer hover:text-gray-600 duration-300 transition-all">
              Healthcare for Good Today. Tomorrow. Always
            </span>
          </p>
        </div>


        <div>
          <p className="text-xl font-semibold text-gray-800 mb-5">
            SERVICES
          </p>

          <ul className="flex flex-col gap-2 text-gray-500 font-semibold">
            <li><Link onClick={()=>window.scrollTo(0,0)} to="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link onClick={()=>window.scrollTo(0,0)} to="/about" className="hover:text-primary transition">About Us</Link></li>
            <li><Link onClick={()=>window.scrollTo(0,0)} to="/contact" className="hover:text-primary transition">Contact Us</Link></li>
          </ul>
        </div>


        <div>
          <p className="text-xl font-semibold text-gray-800 mb-5">
            Get In Touch
          </p>

          <ul className="flex flex-col gap-2 text-gray-500">
            <li>
              <a href="tel:+9148489394494393" className="hover:text-primary transition">
                +91-XXXXXXXXXX
              </a>
            </li>

            <li>
              <a href="mailto:aihbsnngojn@gmail.com" className="hover:text-primary transition">
                DocEase@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>


      <hr />

      <p className="text-center text-xs sm:text-sm text-gray-600 p-4">
        Copyright © 2026 DocEase. All rights reserved.
      </p>

    </div>
  );
};

export default Footer;