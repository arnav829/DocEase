import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {


  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const slotDateFormat =  (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  
  const navigate = useNavigate()
  

  const getUserAppointments = async () => {
    try {
      
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
      }


    } catch (error) {
      
      console.log(error)
      toast.error(error.message)

    }
  }

 const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post( backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
    if (data.success) {
      toast.success(data.message);
      getUserAppointments()
      getDoctorsData()
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
}
  
}


  const initPay = (order) => {


    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
          console.log(response)

          try {
            
            const {data} = await axios.post(backendUrl + '/api/user/verify-razorpay', response, {headers: {token}})
            if(data.success){
              getUserAppointments()
              navigate('/my-appointments')
            }

          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
      }
    }

    const rzp = new window.Razorpay(options)

    rzp.open()

  }

  const appointmentRazorpay = async (appointmentId) => {

    try {

      const {data}  = await axios.post(backendUrl + '/api/user/payment-razorpay',{appointmentId}, {headers: {token}})

      if(data.success){
        initPay(data.order)
      }

    } catch (error) {
      
    }


  }



  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])

  return (
    <div className="px-4 sm:px-10 md:px-20 py-8">
      <p className="pb-4 text-lg font-medium text-gray-700 border-b"> My Appointments </p>

      <div>
        {appointments.map((item, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[0.8fr_2fr_1fr] gap-6 py-6 border-b">
            {/* Doctor Image */}
            <div className="flex justify-center sm:justify-start">
              <img className="w-36 h-36 rounded-lg bg-indigo-50 object-cover" src={item.docData.image} alt={item.name} />
            </div>

            {/* Doctor Details */}
            <div className="text-sm text-gray-600">
              <p className="text-lg font-semibold text-gray-800"> {item.docData.name} </p>

              <p className="text-primary font-medium mt-1"> {item.docData.speciality} </p>

              <div className="mt-3">
                <p className="font-medium text-gray-700">Address</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
              </div>

              <p className="mt-3">
                <span className="font-medium text-gray-700"> Date & Time: </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col justify-end gap-3">
              {!item.cancelled ? (
                <>
                  {item.payment  && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50 ">Paid</button>}


                  {!item.payment && <button onClick={()=>appointmentRazorpay(item._id)} className="w-full border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white transition-all duration-300">
                    Pay Online
                  </button>}
                  

                  <button
                    onClick={() => cancelAppointment(item._id)}
                   className="w-full border border-red-400 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300">
                    Cancel Appointment
                  </button>
                </> ) : (
               <button
                  disabled
                  className="w-full border border-gray-400 bg-gray-100 text-gray-500 py-2 rounded-md cursor-not-allowed">
                  Appointment Cancelled
               </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;