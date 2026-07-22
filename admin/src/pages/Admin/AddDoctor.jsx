import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios"
import { toast } from "react-toastify";

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setfees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')


  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if(!docImg){
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
      "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
      })
    );

    formData.forEach((value, key)=>{
      console.log(`${key} : ${value}`);
    })

    const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{aToken} })
    if(data.success){
      toast.success(data.message)
      setDocImg(false)
      setName('')
      setPassword('')
      setEmail('')
      setAddress1('')
      setAddress2('')
      setDegree('')
      setAbout('')
      setfees('')
    } else {
      toast.error(data.message)
      
    }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }



  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded-lg shadow-sm w-full max-w-5xl">
        {/* Upload Image */}
        <div className="flex items-center gap-4 mb-8 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 rounded-full bg-gray-100 object-cover"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>

          <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />

          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <p className="mb-1">Doctor Name</p>
              <input
                onChange={(e)=> setName(e.target.value)}
                value={name}
                className="w-full border rounded-md px-3 py-2 outline-primary"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div>
              <p className="mb-1">Doctor Email</p>
              <input
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                className="w-full border rounded-md px-3 py-2 outline-primary"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <p className="mb-1">Doctor Password</p>
              <input
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                className="w-full border rounded-md px-3 py-2 outline-primary"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div>
              <p className="mb-1">Experience</p>
              <select onChange={(e)=> setExperience(e.target.value)} value={experience} className="w-full border rounded-md px-3 py-2 outline-primary">
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} {i === 0 ? "Year" : "Years"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Fees</p>
              <input
                onChange={(e)=> setfees(e.target.value)}
                value={fees}
                className="w-full border rounded-md px-3 py-2 outline-primary"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <p className="mb-1">Speciality</p>
              <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className="w-full border rounded-md px-3 py-2 outline-primary">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">
                  Gastroenterologist
                </option>
              </select>
            </div>

            <div>
              <p className="mb-1">Education</p>
              <input
                onChange={(e)=> setDegree(e.target.value)}
                value={degree}
                className="w-full border rounded-md px-3 py-2 outline-primary"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div>
              <p className="mb-1">Address</p>
              <input
                onChange={(e)=> setAddress1(e.target.value)}
                value={address1}
                className="w-full border rounded-md px-3 py-2 mb-2 outline-primary"
                type="text"
                placeholder="Address Line 1"
                required
              />

              <input
                onChange={(e)=> setAddress2(e.target.value)}
                value={address2}
                className="w-full border rounded-md px-3 py-2 outline-primary"
                type="text"
                placeholder="Address Line 2"
                required
              />
            </div>

            <div>
              <p className="mb-1">About Doctor</p>
              <textarea
                onChange={(e)=> setAbout(e.target.value)}
                value={about}
                className="w-full border rounded-md px-3 py-2 resize-none outline-primary"
                placeholder="Write about doctor"
                rows={5}
                required
              ></textarea>
            </div>
          </div>
        </div>

        <button

          type="submit"
          className="mt-8 bg-primary text-white px-10 py-3 rounded-full hover:opacity-90 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;