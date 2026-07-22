import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const { docId } = useParams();

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);


  const navigate = useNavigate();


  const [docInfo,setDocInfo] = useState(null);
  const [docSlots,setDocSlots] = useState([]);
  const [slotIndex,setSlotIndex] = useState(0);
  const [slotTime,setSlotTime] = useState('');



  const fetchDocInfo = () => {

    const doctor = doctors.find(
      (doc)=>doc._id === docId
    );

    setDocInfo(doctor);

  };




  const getAvailableSlots = async()=>{

    setDocSlots([]);

    let today = new Date();


    for(let i=0;i<7;i++){

      let currentDate = new Date(today);

      currentDate.setDate(today.getDate()+i);


      let endTime = new Date();

      endTime.setDate(today.getDate()+i);

      endTime.setHours(21,0,0,0);



      if(today.getDate() === currentDate.getDate()){

        currentDate.setHours(
          currentDate.getHours()>10
          ? currentDate.getHours()+1
          : 10
        );

        currentDate.setMinutes(
          currentDate.getMinutes()>30
          ? 30
          : 0
        );

      }
      else{

        currentDate.setHours(10);
        currentDate.setMinutes(0);

      }



      let timeSlots=[];



      while(currentDate < endTime){


        let formattedTime = currentDate.toLocaleTimeString([],{
          hour:'2-digit',
          minute:'2-digit'
        });



        let day=currentDate.getDate();

        let month=currentDate.getMonth()+1;

        let year=currentDate.getFullYear();



        let slotDate = day+"_"+month+"_"+year;



        const isAvailable = docInfo.slots_booked[slotDate] &&
        docInfo.slots_booked[slotDate].includes(formattedTime)
        ? false
        : true;



        if(isAvailable){

          timeSlots.push({
            datetime:new Date(currentDate),
            time:formattedTime
          });

        }



        currentDate.setMinutes(
          currentDate.getMinutes()+30
        );

      }



      setDocSlots(prev=>[
        ...prev,
        timeSlots
      ]);

    }

  };





  const bookAppointment = async()=>{


    if(!token){

      toast.warn("Login to book Appointment");

      return navigate("/login");

    }



    try{


      const date = docSlots[slotIndex][0].datetime;


      const slotDate = 
      date.getDate()+"_"+
      (date.getMonth()+1)+"_"+
      date.getFullYear();



      const {data}= await axios.post(
        backendUrl+"/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime
        },
        {
          headers:{token}
        }
      );



      if(data.success){

        toast.success(data.message);

        getDoctorsData();

        navigate("/my-appointments");

      }
      else{

        toast.error(data.message);

      }


    }
    catch(error){

      toast.error(error.message);

    }

  };




  useEffect(()=>{

    fetchDocInfo();

    setSlotIndex(0);

    setSlotTime('');

  },[doctors,docId]);





  useEffect(()=>{

    if(docInfo){

      getAvailableSlots();

    }

  },[docInfo]);





  return (

    docInfo && (

      <div className="mx-4 sm:mx-6 md:mx-10">



        {/* Doctor Info */}

        <div className="flex flex-col md:flex-row gap-5">


          <img 
            className="w-full sm:w-72 h-72 object-cover rounded-xl bg-primary mx-auto md:mx-0"
            src={docInfo.image}
            alt={docInfo.name}
          />




          <div className="flex-1 border border-gray-300 rounded-xl px-5 sm:px-8 py-6">


            <p className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold">

              {docInfo.name}

              <img className="w-5" src={assets.verified_icon}/>

            </p>




            <div className="flex flex-wrap items-center gap-2 text-sm mt-2 text-gray-600">

              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>


              <button className="border px-3 py-1 rounded-full text-xs">
                {docInfo.experience}
              </button>


            </div>





            <div className="mt-5">


              <p className="flex items-center gap-1 font-medium">

                About

                <img className="w-4" src={assets.info_icon}/>

              </p>



              <p className="text-sm text-gray-500 mt-2 leading-6">
                {docInfo.about}
              </p>


            </div>





            <p className="mt-4 font-medium text-gray-600">

              Appointment Fee :

              <span className="text-gray-800">

                {currencySymbol}{docInfo.fees}

              </span>


            </p>


          </div>


        </div>





        {/* Booking */}

        <div className="md:ml-72 md:pl-4 mt-8">


          <p className="text-lg font-medium">
            Booking Slots
          </p>




          <div className="flex gap-3 overflow-x-auto mt-4 pb-2">


            {
              docSlots.map((item,index)=>(

                <div

                  key={index}

                  onClick={()=>setSlotIndex(index)}

                  className={`min-w-16 px-4 py-5 rounded-full text-center cursor-pointer border
                  
                  ${
                    slotIndex===index
                    ?"bg-primary text-white"
                    :"border-gray-300"
                  }

                  `}

                >

                  <p>
                    {item[0]?.datetime.toLocaleDateString(
                      "en-US",
                      {weekday:"short"}
                    )}
                  </p>

                  <p>
                    {item[0]?.datetime.getDate()}
                  </p>


                </div>

              ))
            }


          </div>





          <div className="flex gap-3 overflow-x-auto mt-4 pb-2">


            {
              docSlots[slotIndex]?.map((item,index)=>(


                <p

                  key={index}

                  onClick={()=>setSlotTime(item.time)}

                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm cursor-pointer
                  
                  ${
                    slotTime===item.time
                    ?"bg-primary text-white"
                    :"border border-gray-300 text-gray-500"
                  }

                  `}

                >

                  {item.time.toLowerCase()}

                </p>


              ))
            }


          </div>





          <button

            onClick={bookAppointment}

            className="w-full sm:w-auto bg-primary text-white px-12 py-3 rounded-full mt-6"

          >

            Book an Appointment

          </button>


        </div>




        <RelatedDoctors 
          docId={docId}
          speciality={docInfo.speciality}
        />


      </div>

    )

  );

};


export default Appointment;