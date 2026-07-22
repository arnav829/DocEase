import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {

  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)

  console.log(userData)

  if (!userData) {
    return <div className="text-center mt-10">Loading...</div>;
  }



  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    
    try {
      
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post( backendUrl + '/api/user/update-profile', formData,{ headers: { token:token}});

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else { 

        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData &&  (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">

      {
        isEdit
        ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-40" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 bg-gray-300 border border-[3px] border-gray-500 rounded-lg absolute bottom-12 right-12" src={image ? '' : assets.upload_icon } alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
        : <img
          src={userData.image}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
        />
      }

      {/* Profile Image */}
      <div className="flex flex-col items-center">
        

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="mt-5 border rounded-lg px-3 py-2 text-xl font-semibold text-center w-64"
          />
        ) : (
          <h2 className="text-3xl font-bold mt-5">{userData.name}</h2>
        )}
      </div>

      <hr className="my-8" />

      {/* Contact Information */}
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        CONTACT INFORMATION
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">

        {/* Email */}
        <p className="font-semibold">Email</p>
        <p className="text-blue-600">{userData.email}</p>

        {/* Phone */}
        <p className="font-semibold">Phone</p>

        {isEdit ? (
          <input
            type="text"
            value={userData.phone}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="border rounded-lg px-3 py-2"
          />
        ) : (
          <p>{userData.phone}</p>
        )}

        {/* Address */}
        <p className="font-semibold">Address</p>

        {isEdit ? (
          <div className="space-y-2">
            <input
              type="text"
              value={userData.address.line1}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line1: e.target.value,
                  },
                }))
              }
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              type="text"
              value={userData.address.line2}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line2: e.target.value,
                  },
                }))
              }
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
        ) : (
          <div>
            <p>{userData.address.line1}</p>
            <p>{userData.address.line2}</p>
          </div>
        )}

        {/* Gender */}
        <p className="font-semibold">Gender</p>

        {isEdit ? (
          <select
            value={userData.gender}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
            className="border rounded-lg px-3 py-2"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        ) : (
          <p>{userData.gender}</p>
        )}

        {/* DOB */}
        <p className="font-semibold">Date of Birth</p>

        {isEdit ? (
          <input
            type="date"
            value={userData.dob}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                dob: e.target.value,
              }))
            }
            className="border rounded-lg px-3 py-2"
          />
        ) : (
          <p>{userData.dob}</p>
        )}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        {!isEdit ? (
    <button onClick={() => setIsEdit(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition duration-300"> Edit Profile</button>
      ) : (
    <button onClick={updateUserProfileData} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition duration-300">
      Save Information
    </button>
  )}
      </div>
    </div>
  );
};

export default MyProfile;