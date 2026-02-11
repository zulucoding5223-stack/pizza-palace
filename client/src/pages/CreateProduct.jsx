import React, { useState } from "react";
import ProductForm from "../components/admin-components/ProductForm";
import AdminNavbar from "../components/admin-components/AdminNavbar";
import AdminHeader from "../components/admin-components/AdminHeader";

function CreateProduct() {
  const [products, setProducts] = useState([]);

  function handleSave(newProduct) {
    setProducts([...products, newProduct]);
    alert("Product created!");
  }

  return (
    <>
      <AdminHeader /> <ProductForm onSave={handleSave} mode="create" />
    </>
  );
}

export default CreateProduct;
