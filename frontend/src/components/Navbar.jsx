import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets/DocEase_logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-40 cursor-pointer"
        src={logo}
        alt="Logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/" onClick={() => setShowMenu(false)}>
          <li className="py-1">HOME</li>
        </NavLink>

        <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>

        <NavLink to="/about" onClick={() => setShowMenu(false)}>
          <li className="py-1">ABOUT</li>
        </NavLink>

        <NavLink to="/contact" onClick={() => setShowMenu(false)}>
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">

            <img
              className="w-10 rounded-full"
              src={userData.image}
              alt=""
            />

            <div className="text-md font-semibold border border-gray-300 border-[2px] rounded-full">
              <p className="px-4">{userData.name}</p>
            </div>

            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt=""
            />

            {/* Dropdown */}
            <div className="absolute top-0 right-0 pt-14 hidden group-hover:block z-20">
              <div className="min-w-48 bg-white rounded-lg shadow-lg flex flex-col gap-2 p-4 text-gray-600">

                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>

                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer hover:text-black"
                >
                  My Appointments
                </p>

                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>

              </div>
            </div>

          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-primary text-white px-8 py-3 rounded-full"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 overflow-hidden ${
          showMenu ? "w-full" : "w-0"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6">

          <img
            className="w-36"
            src={assets.logo}
            alt=""
          />

          <img
            onClick={() => setShowMenu(false)}
            className="w-7 cursor-pointer"
            src={assets.cross_icon}
            alt=""
          />

        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col text-lg font-medium">

          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
            className="px-5 py-3 border-b"
          >
            Home
          </NavLink>

          <NavLink
            to="/doctors"
            onClick={() => setShowMenu(false)}
            className="px-5 py-3 border-b"
          >
            All Doctors
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setShowMenu(false)}
            className="px-5 py-3 border-b"
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setShowMenu(false)}
            className="px-5 py-3 border-b"
          >
            Contact
          </NavLink>

          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="mx-5 mt-5 bg-primary text-white py-3 rounded-full"
            >
              Create Account
            </button>
          )}
        </ul>

      </div>
    </div>
  );
};

export default Navbar;