import React, { useState } from "react";
import logo from "../assets/Pizza-Slice-in-Tango-Colors.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(true);
  return (
    <div>
      <section className="px-10 py-5 shadow flex items-center justify-between sticky">
        <div>
          <div className="w-fit text-2xl flex items-center gap-1">
            <img src={logo} alt="" className="object-center -rotate-20 w-15" />
            <p>Pizza Palace</p>
          </div>
        </div>
        <div className="text-[0.85rem] hidden md:block">
          <ul className="flex items-center gap-5">
            <li>Home</li>
            <li>Abouts</li>
            <li>Communications</li>
            <li>Locations</li>
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-5">
            {user ? (
              <>
                <button className="rounded-lg pt-1 pb-1.5 px-3 text-center bg-orange-600 text-blue-950 hidden md:block">
                  Login
                </button>
                <button className="rounded-lg pt-1 pb-1.5 px-3 text-center bg-orange-600 text-blue-950 md:hidden">
                  Profile
                </button>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="rounded-lg pt-1 pb-1.5 px-3 text-center bg-orange-600 text-blue-950 md:hidden"
                >
                  X
                </button>
                <p className="text-[0.85rem] w-fit text-orange-600 px-2 pt-1 pb-1.5 text-center rounded-lg border border-blue-950 hidden md:block">
                  {user ? "Welcome user Bongokuhle!" : "Join us now!"}
                </p>
              </>
            ) : (
              <>
                <p className="text-[0.85rem] w-fit text-orange-600 px-2 pt-1 pb-1.5 text-center rounded-lg border border-blue-950 hidden md:block">
                  {user ? "Welcome user Bongokuhle!" : "Join us now!"}
                </p>
                <button className="rounded-lg pt-1 pb-1.5 px-3 text-center bg-orange-600 text-blue-950 hidden md:block">
                  Login
                </button>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="rounded-lg pt-1 pb-1.5 px-3 text-center bg-orange-600 text-blue-950 md:hidden"
                >
                  X
                </button>
              </>
            )}
          </div>
        </div>

        <ul
          className={`absolute top-20 right-0 bg-white z-20 w-screen flex items-start flex-col gap-1 md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="text-start pt-1 pb-1.5 w-full hover:bg-blue-950 hover:text-orange-600 px-10">
            Home
          </li>
          <li className="text-start pt-1 pb-1.5 w-full hover:bg-blue-950 hover:text-orange-600 px-10">
            Abouts
          </li>
          <li className="text-start pt-1 pb-1.5 w-full hover:bg-blue-950 hover:text-orange-600 px-10">
            Communications
          </li>
          <li className="text-start pt-1 pb-1.5 w-full hover:bg-blue-950 hover:text-orange-600 px-10">
            Locations
          </li>
          <li className="text-center pt-1 pb-1.5 w-full hover:bg-orange-600 hover:text-blue-950 border border-b-blue-950 border-t-blue-950 text-orange-600">
            Login
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Navbar;
