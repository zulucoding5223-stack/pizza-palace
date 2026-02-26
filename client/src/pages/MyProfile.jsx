import React, { useState } from "react";
import { useAppContext } from "../utils/appContext";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/admin-components/AdminHeader";

const MyProfile = () => {
  const { user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(
    user?.image ||
      `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=111827&color=ffffff&size=200`,
  );

  function handleEdit(name, email, image) {
    if (!user) {
      return;
    }

    const newImage =
      image && image.trim() !== ""
        ? image
        : `https://ui-avatars.com/api/?name=${name || user.name}&background=111827&color=ffffff&size=200`;

    const updatedUser = {
      ...user,
      name: name ? name : user.name,
      email: email ? email : user.email,
      image: newImage,
    };

    setUser(updatedUser);
    setImage(newImage);

    alert(
      name
        ? `Your new name is ${name}`
        : "You successfully updated your user data",
    );

    setIsEditing(false);
  }

  return (
    <div
      className={`min-h-screen bg-gray-100 ${user.role === "admin" && "pl-20 sm:pl-80 lg:pl-75"}`}
    >
      {/* Top Header Section */}
      <div className="bg-blue-950 h-48 w-full z-0"></div>

      {/* Profile Card */}
      {user ? (
        <div className="max-w-3xl mx-auto px-6 sm:pt-45 lg:pt-0">
          <div className="bg-white shadow-xl rounded-2xl -mt-24 p-10 relative">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <img
                src={image}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
              />

              {isEditing && (
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Profile Image URL"
                  className="mt-6 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              )}
            </div>

            {/* User Info */}
            <div className="mt-10 text-center">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-blue-950">{name}</h2>
                  <p className="text-gray-600 mt-2">{email}</p>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="my-10 border-t"></div>

            {/* Action Buttons */}
            {!isEditing ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    user.role === "user"
                      ? navigate("/my-cart")
                      : navigate("/admin/dashboard");
                  }}
                  className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
                >
                  {user.role === "user" ? "Go to Cart" : "View Dashbaord"}
                </button>

                <button
                  onClick={() => {
                    user.role === "user"
                      ? navigate("/my-orders")
                      : navigate("/admin/orders");
                  }}
                  className="w-full border-2 border-blue-950 text-blue-950 py-3 rounded-lg font-semibold hover:bg-blue-950 hover:text-white transition"
                >
                  {user.role === "user" ? "Track Orders" : "View Orders"}
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="sm:col-span-2 w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    handleEdit(name, email, image);
                  }}
                  className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-5xl whitespace-nowrap my-auto">
          PLEASE LOGIN
        </div>
      )}
    </div>
  );
};

export default MyProfile;
