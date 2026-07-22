import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets/DocEase_logo.png";

const Navbar = () => {

  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);


  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-gray-300 px-3 sm:px-5 md:px-10 lg:px-14">

      {/* Logo */}
      <img onClick={()=>navigate("/")} className="w-32 sm:w-36 md:w-40 cursor-pointer" src={logo} alt="logo" />


      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 lg:gap-8 text-sm font-medium">

        <NavLink to="/" className={({isActive})=>isActive?"text-primary":""}>
          <li className="py-1">HOME</li>
        </NavLink>

        <NavLink to="/doctors" className={({isActive})=>isActive?"text-primary":""}>
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>

        <NavLink to="/about" className={({isActive})=>isActive?"text-primary":""}>
          <li className="py-1">ABOUT</li>
        </NavLink>

        <NavLink to="/contact" className={({isActive})=>isActive?"text-primary":""}>
          <li className="py-1">CONTACT</li>
        </NavLink>

      </ul>



      {/* Right Section */}
      <div className="flex items-center gap-3">

        {token ? (

          <div className="flex items-center gap-2 cursor-pointer group relative">

            <img className="w-9 h-9 rounded-full object-cover" src={userData.image} alt="profile" />

            <div className="hidden sm:block text-sm font-semibold border border-gray-300 rounded-full">
              <p className="px-4 py-1">
                {userData.name}
              </p>
            </div>


            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />


            {/* Dropdown */}
            <div className="absolute top-8 right-0 pt-5 hidden group-hover:block z-30">

              <div className="min-w-48 bg-white rounded-lg shadow-lg flex flex-col gap-3 p-4 text-gray-600">

                <p onClick={()=>navigate("/my-profile")} className="cursor-pointer hover:text-black">
                  My Profile
                </p>

                <p onClick={()=>navigate("/my-appointments")} className="cursor-pointer hover:text-black">
                  My Appointments
                </p>

                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>

              </div>

            </div>

          </div>

        ) : (

          <button onClick={()=>navigate("/login")} className="hidden md:block bg-primary text-white px-7 lg:px-8 py-3 rounded-full">
            Create Account
          </button>

        )}



        {/* Mobile Menu Button */}
        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden cursor-pointer" src={assets.menu_icon} alt="menu" />

      </div>



      {/* Mobile Overlay */}
      {
        showMenu && (
          <div onClick={()=>setShowMenu(false)} className="fixed inset-0 bg-black/30 z-40 md:hidden"></div>
        )
      }



      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full bg-white z-50 w-[85%] sm:w-[70%] md:hidden transition-transform duration-300 ${showMenu ? "translate-x-0" : "translate-x-full"}`}>

        
        {/* Menu Header */}
        <div className="flex items-center justify-between px-5 py-6 border-b">

          <img className="w-36" src={logo} alt="logo"/>

          <img onClick={()=>setShowMenu(false)} className="w-7 cursor-pointer" src={assets.cross_icon} alt="close"/>

        </div>



        {/* Menu Links */}
        <ul className="flex flex-col text-lg font-medium">


          <NavLink onClick={()=>setShowMenu(false)} to="/" className="px-5 py-4 border-b">
            Home
          </NavLink>


          <NavLink onClick={()=>setShowMenu(false)} to="/doctors" className="px-5 py-4 border-b">
            All Doctors
          </NavLink>


          <NavLink onClick={()=>setShowMenu(false)} to="/about" className="px-5 py-4 border-b">
            About
          </NavLink>


          <NavLink onClick={()=>setShowMenu(false)} to="/contact" className="px-5 py-4 border-b">
            Contact
          </NavLink>



          {!token && (
            <button onClick={()=>{navigate("/login");setShowMenu(false)}} className="mx-5 mt-6 bg-primary text-white py-3 rounded-full">
              Create Account
            </button>
          )}


        </ul>

      </div>


    </div>
  );
};

export default Navbar;