import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {

    const {
        dToken,
        profileData,
        getProfileData
    } = useContext(DoctorContext);

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken]);

    console.log(profileData);

    return (
  <div className="m-10">
    {profileData && (
      <div className="flex flex-col md:flex-row bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden">

        {/* Left Section */}
        <div className="hover:cursor-pointer md:w-1/3 flex justify-center items-center bg-gray-50 p-8">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="w-52 rounded-full border-2 border-gray-300 object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 p-8">
          

          <h2 className="text-3xl text-black font-bold text-gray-800 pb-10">
            {profileData.name}
          </h2>

          <hr />

          <p className="text-gray-500 mt-1">
            {profileData.speciality}
          </p>


          <div className="mt-6 space-y-3 text-gray-700">

            <div className="flex">
              <span className="font-semibold w-32">Email</span>
              <span>{profileData.email}</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Degree</span>
              <span>{profileData.degree}</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Experience</span>
              <span>{profileData.experience}</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Fees</span>
              <span>₹{profileData.fees}</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Address</span>
              <span>
                {profileData.address.line1}
                <br />
                {profileData.address.line2}
              </span>
            </div>

            <hr />

            <div>
              <span className="font-semibold">About</span>

              <p className="mt-2 text-gray-600 leading-7">
                {profileData.about}
              </p>
            </div>

          </div>

        </div>
      </div>
    )}
  </div>
  )
};

export default DoctorProfile;