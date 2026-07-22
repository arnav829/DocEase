import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const MyAppointments = () => {


  const { backendUrl, token, getDoctorsData } = useContext(AppContext);


  const [appointments,setAppointments] = useState([]);


  const navigate = useNavigate();



  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];





  const slotDateFormat = (slotDate)=>{

    const dateArray = slotDate.split("_");

    return (
      dateArray[0] +
      " " +
      months[Number(dateArray[1])] +
      " " +
      dateArray[2]
    );

  };






  const getUserAppointments = async()=>{


    try{


      const {data}=await axios.get(

        backendUrl+"/api/user/appointments",

        {
          headers:{token}
        }

      );



      if(data.success){

        setAppointments(
          data.appointments.reverse()
        );

      }



    }
    catch(error){

      toast.error(error.message);

    }


  };







  const cancelAppointment = async(id)=>{


    try{


      const {data}=await axios.post(

        backendUrl+"/api/user/cancel-appointment",

        {
          appointmentId:id
        },

        {
          headers:{token}
        }

      );



      if(data.success){

        toast.success(data.message);

        getUserAppointments();

        getDoctorsData();

      }
      else{

        toast.error(data.message);

      }


    }
    catch(error){

      toast.error(error.message);

    }

  };








  const initPay = (order)=>{


    const options={


      key:import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount:order.amount,

      currency:order.currency,

      name:"DocEase",

      description:"Appointment Payment",

      order_id:order.id,


      handler:async(response)=>{


        try{


          const {data}=await axios.post(

            backendUrl+"/api/user/verify-razorpay",

            response,

            {
              headers:{token}
            }

          );



          if(data.success){

            getUserAppointments();

            navigate("/my-appointments");

          }



        }
        catch(error){

          toast.error(error.message);

        }


      }


    };



    const razorpay = new window.Razorpay(options);

    razorpay.open();


  };







  const appointmentRazorpay = async(id)=>{


    try{


      const {data}=await axios.post(

        backendUrl+"/api/user/payment-razorpay",

        {
          appointmentId:id
        },

        {
          headers:{token}
        }

      );



      if(data.success){

        initPay(data.order);

      }



    }
    catch(error){

      toast.error(error.message);

    }

  };







  useEffect(()=>{

    if(token){

      getUserAppointments();

    }

  },[token]);








  return (


    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8">



      <p className="pb-4 text-xl font-semibold text-gray-700 border-b">

        My Appointments

      </p>






      {
        appointments.length===0

        ?

        <div className="text-center py-20 text-gray-500">

          No appointments found.

        </div>


        :



        <div>


          {
            appointments.map((item,index)=>(


              <div

                key={index}

                className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr_220px] gap-6 py-8 border-b"


              >




                {/* Doctor Image */}

                <div className="flex justify-center md:justify-start">


                  <img

                    className="w-40 h-40 rounded-xl object-cover bg-indigo-50"

                    src={item.docData.image}

                    alt={item.docData.name}

                  />


                </div>






                {/* Details */}


                <div className="text-sm text-gray-600">


                  <p className="text-xl font-semibold text-gray-800">

                    {item.docData.name}

                  </p>



                  <p className="text-primary font-medium mt-1">

                    {item.docData.speciality}

                  </p>





                  <div className="mt-4">


                    <p className="font-medium text-gray-700">

                      Address

                    </p>


                    <p>
                      {item.docData.address.line1}
                    </p>


                    <p>
                      {item.docData.address.line2}
                    </p>


                  </div>





                  <p className="mt-4">


                    <span className="font-medium text-gray-700">

                      Date & Time:

                    </span>


                    {" "}

                    {slotDateFormat(item.slotDate)}

                    {" | "}

                    {item.slotTime}


                  </p>



                </div>








                {/* Actions */}


                <div className="flex flex-col justify-center gap-3">


                  {
                    !item.cancelled

                    ?

                    <>


                    {
                      item.payment

                      ?

                      <button

                        className="py-2 rounded-lg bg-indigo-50 text-gray-600"

                      >

                        Paid

                      </button>


                      :


                      <button

                        onClick={()=>appointmentRazorpay(item._id)}

                        className="py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition"

                      >

                        Pay Online

                      </button>

                    }





                    <button


                      onClick={()=>cancelAppointment(item._id)}


                      className="py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"

                    >

                      Cancel Appointment


                    </button>



                    </>


                    :



                    <button

                      disabled

                      className="py-2 rounded-lg border bg-gray-100 text-gray-500 cursor-not-allowed"

                    >

                      Appointment Cancelled

                    </button>


                  }



                </div>




              </div>


            ))
          }


        </div>


      }



    </div>


  );


};


export default MyAppointments;