import React from "react";
import AdminHeader from "../components/admin-components/AdminHeader";
import Cart from "../components/Cart";
import AdminNavbar from "../components/admin-components/AdminNavbar";
import { useAppContext } from "../utils/appContext";
import { useParams } from "react-router-dom";

const UserOrders = () => {
  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <div className="pl-20 md:pl-80">
        <Cart />
      </div>
    </div>
  );
};

export default UserOrders;
