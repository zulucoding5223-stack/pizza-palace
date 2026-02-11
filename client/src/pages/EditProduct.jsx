import { useParams } from "react-router-dom";
import ProductForm from "../components/admin-components/ProductForm";
import AdminHeader from "../components/admin-components/AdminHeader";
import { useAppContext } from "../utils/appContext";

function EditProduct() {
  const { id } = useParams(); // 👈 get product id from URL
  const { pizzaMenu } = useAppContext();

  // find the product that was clicked
  const product = pizzaMenu.find((p) => p.id === id);

  function handleSave(updatedProduct) {
    console.log("Updated product:", updatedProduct);
    alert("Product updated!");
  }

  // safety check (important)
  if (!product) {
    return <p className="pl-20 pt-10">Product not found</p>;
  }

  return (
    <>
      <AdminHeader />
      <ProductForm product={product} onSave={handleSave} mode="edit" />
    </>
  );
}

export default EditProduct;
