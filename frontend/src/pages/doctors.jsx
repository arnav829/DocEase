import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {

  const { speciality } = useParams();

  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  const navigate = useNavigate();


  const specialityList = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist"
  ];


  const applyFilter = () => {

    if(speciality){
      setFilterDoc(
        doctors.filter((doc)=>doc.speciality === speciality)
      );
    }
    else{
      setFilterDoc(doctors);
    }

  };


  useEffect(()=>{
    applyFilter();
  },[doctors,speciality]);



  return (

    <div className="mx-4 sm:mx-6 md:mx-10">


      <p className="text-gray-700 hover:text-black text-sm font-semibold cursor-pointer">
        Browse through the doctors specialist.
      </p>



      <div className="flex flex-col lg:flex-row gap-6 mt-6">


        {/* SPECIALITY FILTER */}

        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:w-64 flex-shrink-0">


          {
            specialityList.map((item,index)=>(

              <p

                key={index}

                onClick={()=>{

                  speciality === item
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item}`)

                }}

                className={`min-w-fit lg:w-full px-4 py-2 border border-gray-300 rounded cursor-pointer text-sm transition-all hover:bg-blue-50 hover:text-black
                  
                ${
                  speciality === item
                  ? "bg-indigo-100 text-black font-semibold"
                  : "text-gray-600"
                }

                `}
              >

                {item}

              </p>

            ))
          }


        </div>





        {/* DOCTORS GRID */}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">


          {
            filterDoc.map((item)=>(


              <div

                key={item._id}

                onClick={()=>navigate(`/appointment/${item._id}`)}

                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-white hover:-translate-y-2 transition-all duration-500"

              >


                <img

                  className="w-full h-60 object-cover bg-blue-50"

                  src={item.image}

                  alt={item.name}

                />



                <div className="p-4">


                  <div className={`flex items-center gap-2 text-sm ${
                    item.available
                    ? "text-green-500"
                    : "text-red-500"
                  }`}>



                    <p className={`w-2 h-2 rounded-full ${
                      item.available
                      ? "bg-green-500"
                      : "bg-red-500"
                    }`}>
                    </p>



                    <p>
                      {
                        item.available
                        ? "Available"
                        : "Not Available"
                      }
                    </p>


                  </div>




                  <p className="text-gray-900 text-lg font-medium truncate">
                    {item.name}
                  </p>


                  <p className="text-gray-600 text-sm">
                    {item.speciality}
                  </p>



                </div>


              </div>


            ))
          }


        </div>


      </div>


    </div>

  );
};

export default Doctors;