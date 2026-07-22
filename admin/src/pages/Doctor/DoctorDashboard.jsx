import React from "react";

const DoctorDashboard = () => {
  return (
    <div className="w-full p-6">

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Doctor Dashboard
      </h1>

      <p className="text-gray-500 mt-1">
        Welcome back, Doctor 👋
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {/* Appointments */}
        <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
            📅
          </div>

          <h2 className="text-3xl font-bold mt-5">26</h2>

          <p className="text-gray-500 mt-1">
            Total Appointments
          </p>
        </div>

        {/* Patients */}
        <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-3xl">
            👨‍⚕️
          </div>

          <h2 className="text-3xl font-bold mt-5">18</h2>

          <p className="text-gray-500 mt-1">
            Total Patients
          </p>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition">
          <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-3xl">
            💰
          </div>

          <h2 className="text-3xl font-bold mt-5">₹12,500</h2>

          <p className="text-gray-500 mt-1">
            Total Earnings
          </p>
        </div>

      </div>

      {/* Latest Appointments */}

      <div className="bg-white rounded-xl border shadow-sm mt-10 overflow-hidden">

        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Latest Appointments
          </h2>
        </div>

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between px-6 py-4 border-b last:border-none hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">

              <img
                src="https://ui-avatars.com/api/?name=Patient"
                alt=""
                className="w-12 h-12 rounded-full"
              />

              <div>
                <h3 className="font-medium">
                  Arnav Gupta
                </h3>

                <p className="text-sm text-gray-500">
                  General Checkup
                </p>
              </div>

            </div>

            <div className="text-right">
              <p className="font-medium">
                10:30 AM
              </p>

              <p className="text-sm text-gray-500">
                Today
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default DoctorDashboard;