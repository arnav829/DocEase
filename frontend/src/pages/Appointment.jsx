import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // Fetch doctor information
  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  // Generate available slots
  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });


        let day = currentDate.getDate()
        let month = currentDate.getMonth()
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime
        
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if(isSlotAvailable){
            timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }


        

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]))

    }

  };


  const bookAppointment = async (req, res) => {
    if(!token){
      toast.warn('Login to book Appointment')
      return navigate('/login')
    }

    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {headers:{token}} )
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchDocInfo();
    setSlotIndex(0);
    setSlotTime('');
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);


  return (
    docInfo && (
      <div>
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 h-72 object-cover rounded-lg" src={docInfo.image} alt="" />
          </div>

          <div className="flex-1 border border-gray-300 rounded-lg px-8 py-6 bg-white">
            <p className="flex items-center gap-2 text-3xl font-semibold">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-2 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="border px-2 py-0.5 rounded-full text-xs">
                {docInfo.experience}
              </button>
            </div>

            <div className="mt-4">
              <p className="flex items-center gap-1 font-medium">
                About
                <img src={assets.info_icon} alt="" />
              </p>

              <p className="text-sm text-gray-500 mt-2 max-w-[700px]">
                {docInfo.about}
              </p>
            </div>

            <p className="mt-4 font-medium text-gray-600">
              Appointment Fee :
              <span className="text-gray-800">
                {' '}
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
          <p className='text-lg font-medium'>Booking Slots</p>

          {/* Days */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer border ${
                    slotIndex === index
                      ? 'bg-primary text-white'
                      : 'border-gray-300'
                  }`}
                >
                  <p>
                    {item.length > 0 &&
                      item[0].datetime.toLocaleDateString('en-US', {
                        weekday: 'short',
                      })}
                  </p>

                  <p>{item.length > 0 && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    slotTime === item.time
                      ? 'bg-primary text-white'
                      : 'text-gray-500 border border-gray-300'
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Button */}
          <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book an Appointment
          </button>
        </div>

        {/* --------- Listing related doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />


      </div>
    )
  );
};

export default Appointment;