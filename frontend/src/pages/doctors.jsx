import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((doc) => doc.speciality === speciality)
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-700 hover:text-black text-sm font-semibold cursor-pointer">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">

          <p
            onClick={() =>
              speciality === "General Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General Physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded cursor-pointer transition-all hover:bg-blue-50 hover:text-black hover:font-semibold ${
              speciality === "General Physician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            General Physician
          </p>

          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded cursor-pointer transition-all hover:bg-blue-50 hover:text-black hover:font-semibold ${
              speciality === "Gynecologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gynecologist
          </p>

          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded cursor-pointer transition-all hover:bg-blue-50 hover:text-black hover:font-semibold ${
              speciality === "Dermatologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Dermatologist
          </p>

          <p
            onClick={() =>
              speciality === "Pediatrician"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatrician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded cursor-pointer transition-all hover:bg-blue-50 hover:text-black hover:font-semibold ${
              speciality === "Pediatrician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Pediatrician
          </p>

          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded cursor-pointer transition-all hover:bg-blue-50 hover:text-black hover:font-semibold ${
              speciality === "Neurologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Neurologist
          </p>

          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded cursor-pointer transition-all hover:bg-blue-50 hover:text-black hover:font-semibold ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <img
                className="bg-blue-50 w-full"
                src={item.image}
                alt={item.name}
              />

              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></p>

                  <p>
                    {item.available ? "Available" : "Not Available"}
                  </p>
                </div>

                <p className="text-gray-900 text-lg font-medium">
                  {item.name}
                </p>

                <p className="text-gray-600 text-sm">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;