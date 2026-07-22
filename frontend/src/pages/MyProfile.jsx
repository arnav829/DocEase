import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const MyProfile = () => {


  const {
    userData,
    setUserData,
    token,
    backendUrl,
    loadUserProfileData
  } = useContext(AppContext);



  const [isEdit,setIsEdit] = useState(false);

  const [image,setImage] = useState(false);




  if(!userData){

    return (

      <div className="text-center mt-20 text-gray-500">

        Loading...

      </div>

    );

  }







  const updateUserProfileData = async()=>{


    try{


      const formData = new FormData();


      formData.append(
        "name",
        userData.name
      );


      formData.append(
        "phone",
        userData.phone
      );


      formData.append(
        "address",
        JSON.stringify(userData.address)
      );


      formData.append(
        "gender",
        userData.gender
      );


      formData.append(
        "dob",
        userData.dob
      );



      if(image){

        formData.append(
          "image",
          image
        );

      }




      const {data}=await axios.post(

        backendUrl+"/api/user/update-profile",

        formData,

        {
          headers:{
            token
          }
        }

      );



      if(data.success){


        toast.success(data.message);


        await loadUserProfileData();


        setIsEdit(false);


        setImage(false);


      }
      else{


        toast.error(data.message);


      }



    }
    catch(error){

      toast.error(error.message);

    }


  };







  return (


    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8">



      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-5 sm:p-8">






        {/* Profile Image */}


        <div className="flex flex-col items-center">



          {
            isEdit

            ?

            <label htmlFor="image" className="cursor-pointer">

              <div className="relative">


                <img

                  className="w-32 h-32 rounded-full object-cover opacity-70"

                  src={
                    image
                    ? URL.createObjectURL(image)
                    : userData.image
                  }

                  alt="profile"

                />



                <img

                  className="absolute bottom-1 right-1 w-9 bg-white rounded-full p-1 border"

                  src={assets.upload_icon}

                  alt="upload"

                />



              </div>


              <input

                id="image"

                hidden

                type="file"

                onChange={(e)=>setImage(e.target.files[0])}

              />


            </label>


            :


            <img

              src={userData.image}

              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"

              alt="profile"

            />


          }





          {
            isEdit

            ?

            <input

              value={userData.name}

              onChange={(e)=>
                setUserData(prev=>({
                  ...prev,
                  name:e.target.value
                }))
              }

              className="mt-5 border rounded-lg px-4 py-2 text-center text-xl font-semibold w-full sm:w-64"

            />


            :


            <h2 className="text-3xl font-bold mt-5">

              {userData.name}

            </h2>


          }



        </div>






        <hr className="my-8"/>





        <h3 className="text-xl font-semibold text-gray-700 mb-6">

          CONTACT INFORMATION

        </h3>







        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">





          <p className="font-semibold">
            Email
          </p>


          <p className="text-blue-600 break-all">
            {userData.email}
          </p>






          <p className="font-semibold">
            Phone
          </p>



          {
            isEdit

            ?

            <input

              value={userData.phone}

              onChange={(e)=>
                setUserData(prev=>({
                  ...prev,
                  phone:e.target.value
                }))
              }

              className="border rounded-lg px-3 py-2"

            />


            :

            <p>
              {userData.phone || "Not Provided"}
            </p>


          }







          <p className="font-semibold">
            Address
          </p>



          {
            isEdit

            ?

            <div className="space-y-2">

              <input

                value={userData.address.line1}

                onChange={(e)=>
                  setUserData(prev=>({
                    ...prev,
                    address:{
                      ...prev.address,
                      line1:e.target.value
                    }
                  }))
                }

                className="border rounded-lg px-3 py-2 w-full"

              />


              <input

                value={userData.address.line2}

                onChange={(e)=>
                  setUserData(prev=>({
                    ...prev,
                    address:{
                      ...prev.address,
                      line2:e.target.value
                    }
                  }))
                }

                className="border rounded-lg px-3 py-2 w-full"

              />


            </div>


            :


            <div>

              <p>
                {userData.address.line1}
              </p>

              <p>
                {userData.address.line2}
              </p>

            </div>


          }







          <p className="font-semibold">
            Gender
          </p>



          {
            isEdit

            ?

            <select

              value={userData.gender}

              onChange={(e)=>
                setUserData(prev=>({
                  ...prev,
                  gender:e.target.value
                }))
              }

              className="border rounded-lg px-3 py-2"

            >

              <option>
                Male
              </option>

              <option>
                Female
              </option>

              <option>
                Other
              </option>


            </select>


            :

            <p>
              {userData.gender}
            </p>

          }






          <p className="font-semibold">
            Date of Birth
          </p>




          {
            isEdit

            ?

            <input

              type="date"

              value={userData.dob}

              onChange={(e)=>
                setUserData(prev=>({
                  ...prev,
                  dob:e.target.value
                }))
              }

              className="border rounded-lg px-3 py-2"

            />


            :

            <p>
              {userData.dob}
            </p>


          }



        </div>







        {/* BUTTON */}


        <div className="flex justify-center mt-10">


          {
            !isEdit

            ?


            <button

              onClick={()=>setIsEdit(true)}

              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full transition"

            >

              Edit Profile

            </button>



            :



            <button

              onClick={updateUserProfileData}

              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full transition"

            >

              Save Information

            </button>


          }



        </div>





      </div>



    </div>


  );

};


export default MyProfile;