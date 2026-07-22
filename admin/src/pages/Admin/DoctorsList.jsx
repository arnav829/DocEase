import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        All Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden  hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover bg-blue-50 hover:bg-primary transition-all duration-300 "
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>

              <p className="text-sm text-blue-600 font-medium mt-1">
                {item.speciality}
              </p>

              <div className="flex items-center justify-between mt-5">
                <span className="text-gray-600 text-sm">Available</span>

                <input
                  onChange={()=>changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  
                  
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;