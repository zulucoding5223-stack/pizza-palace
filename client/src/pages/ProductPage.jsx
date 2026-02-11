import React, { useEffect, useState } from "react";
import { useAppContext } from "../utils/appContext";
import { useParams } from "react-router-dom";
import TopProductDetailsSection from "../components/productDetails-components/TopProductDetailsSection";

const ProductPage = () => {
  const { pizzaMenu } = useAppContext();
  const params = useParams();

  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    const item = pizzaMenu?.find(
      (pizza) => String(pizza.id) === String(params.id),
    );
    setMenuItem(item);
  }, [params.id, pizzaMenu]);
  console.log(menuItem)

  return (
    <div className="pt-23">
      {menuItem ? (
        <TopProductDetailsSection menuItem={menuItem} />
      ) : (
        <p className="text-center mt-10">Loading product...</p>
      )}
    </div>
  );
};

export default ProductPage;
