import React, { useState } from "react";
import logo from "../../../assets/Pizza-Slice-in-Tango-Colors.svg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  return (
    <div>
      <section className="flex items-center flex-col md:flex-row px-5 lg:px-10">
        <div className="h-135 w-full md-1/2 flex items-center justify-center">
          <div className="shadow-2xl shadow-blue-400 border border-blue-100 -mb-46 w-90 h-90 rounded-full bg-white animate-bounce overflow-hidden">
            <img src={logo} alt="" className="object-center" />
          </div>
        </div>
        <div className="bg-blue-950 h-135 w-full md-1/2 flex items-center flex-col justify-center px-2 gap-2 shadow-gray-600 shadow-xl">
          <p className="text-white text-4xl mt-10">Bite The Greatness!</p>
          <div className="w-full h-20 bg-red-500"></div>
          <p className="text-[0.85rem] text-white px-auto">
            Every dish is crafted from the freshest ingredients and cooked to
            perfection. Savor the rich flavors and delightful aromas in every
            bite. Made with passion and care, each meal is a culinary
            experience. Treat yourself to food that truly satisfies!
          </p>
          <div className="flex items-center gap-10">
            <button onClick={() => navigate('/menu')} className="hover:cursor-pointer text-center pt-1 pb-1.5 text-sm px-10 rounded bg-white text-red-500">
              Menu
            </button>
            <button onClick={() => navigate('/menu')} className="hover:cursor-pointer text-center pt-1 pb-1.5 text-sm px-10 rounded bg-red-500 text-white">
              Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
