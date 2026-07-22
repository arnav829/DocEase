import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const contact = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-start gap-10">
  
  {/* Image */}
  <div className="w-full md:w-1/2">
    <img
      src={assets.contact_image}
      alt="Contact"
      className="w-full rounded-lg "
    />
  </div>

  {/* Contact Details */}
  <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">

    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        OUR OFFICE
      </h2>

      <p className="text-gray-600">
        123 Healthcare Avenue
      </p>

      <p className="text-gray-600">
        Mumbai, Maharashtra, India
      </p>
    </div>

    <div className="space-y-2">
      <p className="text-gray-700 font-medium">
        +91 8463859392
      </p>

      <p className="text-gray-700 font-medium">
        docEase@gmail.com
      </p>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        CAREERS AT DOCEASE
      </h2>

      <p className="text-gray-600">
        Join our passionate team and help transform healthcare through technology and innovation.
      </p>
    </div>

    <button
      onClick={() => window.open('https://en.wikipedia.org/wiki/Hospital', '_blank')}
      className="border border-gray-900 px-8 py-3 rounded-full hover:bg-black hover:text-white transition w-fit"
    >
      EXPLORE
    </button>

  </div>
</div>
  );
};

export default contact;