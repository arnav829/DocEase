import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {

  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-12 sm:py-16 text-gray-800">


      <h1 className="text-2xl sm:text-3xl font-medium text-center">
        Find by Speciality
      </h1>


      <p className="w-full sm:w-2/3 md:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors
      </p>



      <div className="flex gap-5 pt-5 w-full overflow-x-auto sm:justify-center px-4 sm:px-0 scrollbar-hide">


        {
          specialityData.map((item,index)=>(

            <Link 
              onClick={()=>scrollTo(0,0)}
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500"
              key={index}
              to={`/doctors/${item.speciality}`}
            >

              <div className="rounded-full bg-blue-50 p-1">

                <img 
                  className="w-16 sm:w-20 md:w-24 mb-2"
                  src={item.image}
                  alt={item.speciality}
                />

              </div>


              <p className="text-center">
                {item.speciality}
              </p>


            </Link>

          ))
        }


      </div>


    </div>
  )
}

export default SpecialityMenu