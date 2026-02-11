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

const App = () => {
  const { user } = useAppContext();
  return (
    <div>
      {user && user.role === "admin" ? <AdminNavbar /> : <Navbar />}
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
        <Route path="/menu/:id" element={<ProductPage />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
};

export default App;
