import React, { useContext, useEffect, useState } from "react";
import { AppContext }  from '../context/AppContext'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext)

  const navigate = useNavigate()

  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
          const {data} = await axios.post(backendUrl + '/api/user/register', {name, password, email})
          if(data.success){
            localStorage.setItem('token', data.token)
            setToken(data.token)
          } else {
            toast.error(data.message)
          }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login', { password, email})
          if(data.success){
            localStorage.setItem('token', data.token)
            setToken(data.token)
          } else {
            toast.error(data.message)
          }
      }
    } catch (error) {
      toast.error(error.message)
    }

    
  };



  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])


  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 w-[90%] sm:max-w-md border rounded-xl text-zinc-600 p-8 shadow-lg">

        <div className="text-center">
          <p className="text-3xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>

          <p className="text-sm mt-2">
            Please{" "}
            {state === "Sign Up" ? "sign up" : "log in"} to book an appointment.
          </p>
        </div>

        {/* Name appears only in Sign Up */}
        {state === "Sign Up" && (
          <div>
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={state === "Sign Up"}
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {state === "Login" && (
          <p className="text-sm text-primary cursor-pointer">
            Forgot Password?
          </p>
        )}

        <button
          type="submit"
          className="bg-primary text-white py-3 rounded-md"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary cursor-pointer font-medium"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary cursor-pointer font-medium"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;