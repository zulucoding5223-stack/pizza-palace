import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Menupage from "./pages/Menupage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAppContext } from "./utils/appContext";
import AdminNavbar from "./components/admin-components/AdminNavbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

import MyOrders from "./pages/MyOrders";
import MyCart from "./pages/MyCart";
import ViewOrders from "./pages/ViewOrders";
import ProductPage from "./pages/ProductPage";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import UserOrders from "./pages/userOrders";
import Footer from "./components/Footer";
import MyProfile from "./pages/MyProfile";
import RateUs from "./pages/RateUs";

const App = () => {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col">
      {user && user.role === "admin" ? <AdminNavbar /> : <Navbar />}

      <main className="grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/menu" element={<Menupage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/view-my-orders/:id" element={<ViewOrders />} />
          <Route path="/admin/view-user-orders/:id" element={<UserOrders />} />
          <Route path="/menu/:id" element={<ProductPage />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/admin/profile" element={<MyProfile />} />
          <Route path="/rate-us" element={<RateUs />} />
        </Routes>
      </main>

      {!user || user.role === "user" ? <Footer /> : null}
    </div>
  );
};

export default App;
