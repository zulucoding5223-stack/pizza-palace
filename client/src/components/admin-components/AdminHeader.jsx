import React, { useEffect } from "react";
import logo from "../../assets/Pizza-Slice-in-Tango-Colors.svg";
import profile from "../../assets/pictures-of-pizza-23-1.jpg";
import { useAppContext } from "../../utils/appContext";
const AdminHeader = () => {
  const { isOpen, setIsOpen, user } = useAppContext();

  return (
    <div>
      <section className="pl-21 h-fit py-2 md:pl-81 bg-blue-950 w-full pr-3 shadow-sm shadow-blue-950 fixed">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="object-center -rotate-20 w-15"
          />
          <p className="text-2xl text-blue-400">Slice&Stack</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={profile}
            alt="profile-image"
            className="w-10 h-9 rounded-full object-center"
          />
          <div className="w-fit hidden lg:block rounded-lg px-2 py-1 text-[0.85rem] text-white">Welcome, Admin {user.name}!</div>
        </div>
        </div>
        
      </section>
    </div>
  );
};

export default AdminHeader;
