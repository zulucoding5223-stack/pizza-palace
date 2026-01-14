import React, { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { BsBorderStyle } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useAppContext } from "../../utils/appContext";
import profile from "../../assets/pictures-of-pizza-23-1.jpg";
import { IoMenu } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const adminLinks = [
    { name: "Dashboard", icon: MdDashboard },
    { name: "Orders", icon: BsBorderStyle },
    { name: "Products", icon: MdFoodBank },
    { name: "Logout", icon: RiLogoutBoxFill },
  ];

  const { user, isOpen, setIsOpen, logout } = useAppContext();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      logout();
    }
  }, [location.pathname]);

  return (
    <div>
      <section>
        {!isOpen ? (
          <div
            className={`flex flex-col justify-between h-screen w-80 z-20 shadow-xl bg-blue-950 fixed p-5 shadow-black`}
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="w-full text-white flex items-center gap-4 text-xl font-bold shadow-md shadow-black rounded-full p-2">
                  <div className="w-fit p-1 rounded-full bg-white">
                    <RiAdminFill color={"orange"} size={"2rem"} />
                  </div>
                  <p>Admin Dashboard</p>
                </div>
                <IoMenu
                  color="white"
                  size={"1.8rem"}
                  className="block md:hidden hover:cursor-pointer"
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              </div>
              <hr className="w-full text-gray-700 my-8" />
              <ul className="flex items-center flex-col gap-3">
                {adminLinks.map((adminLink, index) => {
                  const path =
                    adminLink.name.toLocaleLowerCase() === "logout"
                      ? "/"
                      : `/admin/${adminLink.name.toLocaleLowerCase()}`;
                  return (
                    <NavLink
                      to={path}
                      key={index}
                      className={({ isActive }) =>
                        `w-full text-white text-md flex items-center gap-3 p-2 hover:cursor-pointer  ${
                          isActive
                            ? "rounded-r-2xl bg-blue-700 hover:bg-blue-700"
                            : "hover:bg-blue-900"
                        }`
                      }
                    >
                      <adminLink.icon color="white" size="1.5rem" />{" "}
                      <p>{adminLink.name}</p>
                    </NavLink>
                  );
                })}
              </ul>
            </div>

            <div>
              <hr className="w-full text-gray-700 " />
              <div className="">
                <div className="w-full text-white flex items-center gap-4 text-xl font-bold shadow-md shadow-black rounded-full p-2 cursor-pointer">
                  <div className="w-fit rounded-full bg-white">
                    <img
                      src={profile}
                      alt="profile-image"
                      className="w-16 h-11 rounded-full object-center"
                    />
                  </div>
                  <p className="w-full text-sm">Welcome, Admin {user.name}!</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-screen w-20 z-20 shadow-xl bg-blue-950 fixed p-5 shadow-black md:hidden">
            <div>
              <div className="flex items-center gap-3 flex-col">
                <div className="w-fit p-1 rounded-full bg-white">
                  <RiAdminFill color={"orange"} size={"2rem"} />
                </div>

                <IoMenu
                  color="white"
                  size={"1.8rem"}
                  className="block md:hidden hover:cursor-pointer"
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              </div>
              <hr className="w-full text-gray-700 my-8" />
              <ul className="flex items-center flex-col gap-3">
                {adminLinks.map((adminLink, index) => {
                  const path =
                    adminLink.name.toLocaleLowerCase() === "logout"
                      ? "/"
                      : `/admin/${adminLink.name.toLocaleLowerCase()}`;

                  return (
                    <NavLink
                      to={path}
                      key={index}
                      className={({ isActive }) =>
                        `w-full text-white text-md flex items-center gap-3 p-2 hover:cursor-pointer  ${
                          isActive
                            ? "rounded-r-2xl bg-blue-700 hover:bg-blue-700"
                            : "hover:bg-blue-900"
                        }`
                      }
                    >
                      <adminLink.icon color="white" size="1.5rem" />{" "}
                    </NavLink>
                  );
                })}
              </ul>
            </div>

            <div>
              <hr className="w-full text-gray-700 mb-5" />
              <div className="">
                <div className="w-fit rounded-full bg-white">
                  <img
                    src={profile}
                    alt="profile-image"
                    className="w-15 h-10 rounded-full object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminNavbar;
