import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext);

  const navigate = useNavigate();


  const [state,setState] = useState("Sign Up");

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  const onSubmitHandler = async(event)=>{

    event.preventDefault();


    try{


      if(state==="Sign Up"){


        const {data}=await axios.post(
          backendUrl+"/api/user/register",
          {
            name,
            email,
            password
          }
        );


        if(data.success){

          localStorage.setItem("token",data.token);

          setToken(data.token);

        }
        else{

          toast.error(data.message);

        }


      }
      else{


        const {data}=await axios.post(
          backendUrl+"/api/user/login",
          {
            email,
            password
          }
        );


        if(data.success){

          localStorage.setItem("token",data.token);

          setToken(data.token);

        }
        else{

          toast.error(data.message);

        }


      }


    }
    catch(error){

      toast.error(error.message);

    }

  };




  useEffect(()=>{

    if(token){

      navigate("/");

    }

  },[token]);





  return (


    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6"
    >



      <div className="w-full max-w-md flex flex-col gap-5 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg bg-white">





        {/* Header */}

        <div className="text-center">


          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">

            {
              state==="Sign Up"
              ? "Create Account"
              : "Login"
            }

          </h1>



          <p className="text-sm text-gray-500 mt-2">

            Please {
              state==="Sign Up"
              ? "sign up"
              : "login"
            } to book an appointment.

          </p>


        </div>






        {
          state==="Sign Up" && (

            <div>

              <label className="text-sm text-gray-700">
                Full Name
              </label>


              <input

                className="w-full border border-gray-300 rounded-lg p-3 mt-1 outline-none focus:border-primary transition"

                type="text"

                placeholder="Enter your name"

                value={name}

                onChange={(e)=>setName(e.target.value)}

                required

              />

            </div>

          )
        }






        <div>


          <label className="text-sm text-gray-700">
            Email
          </label>


          <input

            className="w-full border border-gray-300 rounded-lg p-3 mt-1 outline-none focus:border-primary transition"

            type="email"

            placeholder="Enter your email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

          />


        </div>







        <div>


          <label className="text-sm text-gray-700">
            Password
          </label>


          <input

            className="w-full border border-gray-300 rounded-lg p-3 mt-1 outline-none focus:border-primary transition"

            type="password"

            placeholder="Enter your password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

          />


        </div>







        {
          state==="Login" && (

            <p className="text-sm text-primary cursor-pointer hover:underline">

              Forgot Password?

            </p>

          )
        }







        <button

          type="submit"

          className="bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-medium"

        >

          {
            state==="Sign Up"
            ? "Create Account"
            : "Login"
          }

        </button>








        {
          state==="Sign Up"

          ?

          <p className="text-sm text-gray-600 text-center">

            Already have an account?

            <span

              onClick={()=>setState("Login")}

              className="text-primary cursor-pointer font-medium ml-1 hover:underline"

            >

              Login here

            </span>


          </p>


          :


          <p className="text-sm text-gray-600 text-center">

            Don't have an account?


            <span

              onClick={()=>setState("Sign Up")}

              className="text-primary cursor-pointer font-medium ml-1 hover:underline"

            >

              Sign Up

            </span>


          </p>

        }



      </div>



    </form>


  );

};


export default Login;