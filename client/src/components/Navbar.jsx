import React, { useState } from "react";
import logo from "../assets/Pizza-Slice-in-Tango-Colors.svg";
import { TiShoppingCart } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(0);

  const navLinks = ["Home", "About", "Location", "Communications"];
  return (
    <div>
      <section className="px-10 py-5 shadow flex items-center justify-between fixed bg-white z-1 w-full">
        <div>
          <Link
            to="/"
            className="w-fit text-2xl flex items-center gap-1 text-blue-400"
          >
            <img src={logo} alt="" className="object-center -rotate-20 w-15" />
            <p>Slice&Stack</p>
          </Link>
        </div>
        <div className="text-[0.85rem] hidden lg:block">
          <ul className="flex items-center gap-5">
            {navLinks.map((navLink, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center flex-col gap-0.5 text-red-500 group hover:cursor-pointer"
                  onClick={() => {
                    setIsClicked(index);
                  }}
                >
                  <span>{navLink}</span>
                  <span
                    className={`h-0.5 rounded w-0 bg-blue-400  group transition-all duration-500 ease-in-out ${
                      isClicked === index ? "w-full" : ""
                    }`}
                  ></span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button className="hover:cursor-pointer relative rounded-full p-2.5 text-center  bg-gray-300/40 backdrop-blur-md border border-white/30 shadow-lg text-blue-950">
                  <TiShoppingCart />
                  <span className="absolute -top-2 -right-1.5 text-center py-1 px-2 rounded-full text-[0.6rem] text-red-500 bg-blue-950 shadow-lg">
                    0
                  </span>
                </button>
                <button
                  onClick={() => {
                    user && setIsProfileMenuOpen((prev) => !prev);
                  }}
                  className="hover:cursor-pointer relative rounded-full w-8.5 h-8.5 text-center bg-gray-300 text-blue-950 lg:block overflow-hidden"
                >
                  <IoPerson
                    size={"1.9rem"}
                    className="absolute top-1.5 right-[2.3px]"
                  />
                </button>

                <p
                  onClick={() => {
                    user && setIsProfileMenuOpen((prev) => !prev);
                  }}
                  className="hover:cursor-pointer text-[0.85rem] w-fit text-red-500 px-2 pt-1 pb-1.5 text-center rounded-lg border border-blue-950 hidden md:block"
                >
                  {user ? "Welcome user Bongokuhle!" : "Join us now!"}
                </p>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="hover:cursor-pointer rounded-lg pt-1 pb-1.5 px-3 text-center text-blue-950 lg:hidden"
                >
                  <IoMenu size={"1.8rem"} />
                </button>
              </>
            ) : (
              <>
                <p className="hover:cursor-pointer text-[0.85rem] w-fit text-red-500 px-2 pt-1 pb-1.5 text-center rounded-lg border border-blue-950 hidden md:block">
                  {user ? "Welcome user Bongokuhle!" : "Join us now!"}
                </p>
                <button
                  onClick={() => setUser(true)}
                  className="hover:cursor-pointer rounded-lg pt-1 pb-1.5 px-3 text-center bg-red-500 text-blue-950 hidden lg:block"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="hover:cursor-pointer rounded-lg pt-1 pb-1.5 px-3 text-center text-blue-950 lg:hidden"
                >
                  <IoMenu size={"1.8rem"} />
                </button>
              </>
            )}
          </div>
        </div>

        <ul
          className={`absolute top-20 right-0 bg-white z-20 w-screen flex items-start flex-col gap-1 lg:hidden text-[0.85rem] ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="text-start pt-1 pb-1.5 w-full hover:bg-blue-950 hover:text-red-500 px-10 transition-all duration-300">
            Home
          </li>
          <li className="text-start pt-1 pb-1.5 w-full hover:bg-blue-950 hover:text-red-500 px-10 transition-all duration-300">
            Abouts
          </li>
          <li className="text-start pt-1 pb-1.5 w-full hover:bg-blue-950 hover:text-red-500 px-10 transition-all duration-300">
            Communications
          </li>
          <li className="text-start pt-1 pb-1.5 w-full hover:bg-blue-950 hover:text-red-500 px-10 transition-all duration-300">
            Locations
          </li>
          <li
            onClick={() => {
              user ? setUser(false) : setUser(true);
            }}
            className="text-center pt-1 pb-1.5 w-full hover:bg-red-500 hover:text-blue-950 border border-b-blue-950 border-t-blue-950 text-red-500"
          >
            {user ? "Logout" : "Login"}
          </li>
        </ul>

        {user && isProfileMenuOpen && (
          <ul className="absolute lg:top-15.5 top-16 lg:right-10 right-5 text-[0.85rem] z-5 w-fit bg-gray-50">
            <li className="text-center pt-1 pb-1.5 px-20 w-full hover:bg-blue-950 hover:text-red-500 mb-1 transition-all duration-300 hover:cursor-pointer">
              My Cart
            </li>
            <li className="text-center pt-1 pb-1.5 px-20 w-full hover:bg-blue-950 hover:text-red-500 mb-1 transition-all duration-300 hover:cursor-pointer">
              My Profile
            </li>
            <li className="text-center pt-1 pb-1.5 px-20 w-full hover:bg-blue-950 hover:text-red-500 mb-1 transition-all duration-300 hover:cursor-pointer">
              My Orders
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
                setUser(false);
                setIsProfileMenuOpen(false);
              }}
              className="text-center pt-1 pb-1.5 px-20 w-full bg-blue-950 text-red-500 hover:bg-orange-600 hover:text-blue-950 transition-all duration-300 hover:cursor-pointer"
            >
              Logout
            </li>
          </ul>
        )}
      </section>
    </div>
  );
};

export default Navbar;
