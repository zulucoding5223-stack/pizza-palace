import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useAppContext } from "../../../utils/appContext";

const AuthForm = () => {
  const location = useLocation();
  const path = location.pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAppContext();
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const result = login(email, password);

    if (!result.success) {
    alert(result.message);
    return;
  }

  if (result.user.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/menu");
  }
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmitForm}
        className="text-center border border-gray-100 shadow-md bg-gray-100 shadow-gray-200 rounded-2xl w-80 sm:w-100"
      >
        <h1 className="my-5 font-bold text-2xl text-blue-900">
          {path === "/login" ? "Login" : "Register"}
        </h1>
        <div className="bg-gray-300 h-px w-60 sm:w-80 my-4 mx-10" />
        {path === "/register" && (
          <div className="mx-10 border border-gray-300 bg-white shadow-md shadow-gray-400 flex items-center p-2 rounded-md mb-3">
            <IoPerson size={"1.45rem"} color="blue" />
            <input
              type="text"
              className="w-full text-[0.85rem] text-gray-500 outline-none hover:cursor-pointer px-1.5 bg-white"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="mx-10 border border-gray-300 bg-white shadow-md shadow-gray-400 flex items-center p-2 rounded-md mb-3">
          <MdEmail size={"1.45rem"} color="blue" />
          <input
            type="email"
            className="w-full text-[0.85rem] text-gray-500 outline-none hover:cursor-pointer px-1.5 bg-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mx-10 border border-gray-300 bg-white shadow-md shadow-gray-400 flex items-center p-2 rounded-md mb-3">
          <FaUnlockAlt size={"1.45rem"} color="blue" />
          <input
            type="password"
            className="w-full text-[0.85rem]  text-gray-500 bg-white outline-none hover:cursor-pointer px-1.5"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {path === "/register" && (
          <div className="mx-10 border border-gray-300 bg-white shadow-md shadow-gray-400 flex items-center p-2 rounded-md mb-3">
            <FaUnlockAlt size={"1.45rem"} color="blue" />
            <input
              type="password"
              className="w-full text-[0.85rem] text-gray-500 outline-none hover:cursor-pointer px-1.5 bg-white"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        {path === "/login" && (
          <p
            className="flex justify-end w-full item-center text-[0.70rem] my-2 text-orange-500 pr-10"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        )}
        <button
          type="submit"
          className="hover:cursor-pointer mx-10 w-60 sm:w-80 bg-blue-800 rounded-full text-center text-white py-1 shadow-md shadow-blue-900 my-2 hover:shadow-blue-700 hover:bg-blue-600"
        >
          {path === "/login" ? "Login" : "Register"}
        </button>
        {path === "/login" && (
          <div className="mt-2 mb-8 mx-10 flex items-center justify-center">
            <div className="bg-gray-300 h-px w-full" />
            <span className="text-gray-600 text-[0.85rem] mx-1 -mt-1">or</span>
            <div className="bg-gray-300 h-px w-full" />
          </div>
        )}
        <div className="bg-gray-300 h-px w-full mb-4 mt-2" />
        <div className="flex text-[0.85rem] text-gray-600 flex-items-center gap-0.5 mb-5 justify-center">
          {path === "/login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span></span>
          <span
            onClick={() =>
              path === "/login" ? navigate("/register") : navigate("/login")
            }
            className="text-orange-500 underline hover:cursor-pointer"
          >
            {path === "/login" ? "Register" : "Login"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
