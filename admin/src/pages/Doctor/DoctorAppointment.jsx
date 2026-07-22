import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <h2 className="mb-4 text-lg font-semibold">All Appointments</h2>

      <div className="bg-white border rounded text-sm">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr] py-3 px-6 border-b bg-gray-50 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
        </div>

        {/* Appointments */}
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr] gap-3 md:gap-0 items-center py-4 px-6 border-b hover:bg-gray-50"
          >
            <p>{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            <p>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  item.payment
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.payment ? "Paid" : "Pending"}
              </span>
            </p>

            <p>{item.userData.age} Years</p>

            <p>
              {item.slotDate}
              <br />
              <span className="text-gray-500">{item.slotTime}</span>
            </p>

            <p>${item.amount}</p>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;