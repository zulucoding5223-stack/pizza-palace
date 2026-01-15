import React, { useEffect, useState } from "react";
import AdminHeader from "../components/admin-components/AdminHeader";
import { IoSearchOutline } from "react-icons/io5";
import ProductsList from "../components/admin-components/ProductsList";
import { useAppContext } from "../utils/appContext";

const Products = () => {
  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { pizzaMenu } = useAppContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let filtered = pizzaMenu;

    if (searchInput.trim() !== "") {
      const search = searchInput.toLowerCase();

      filtered = filtered.filter(
        (pizza) =>
          pizza?.name?.toLowerCase().includes(search) ||
          pizza?.flavour?.toLowerCase().includes(search) ||
          pizza?.category?.toLowerCase().includes(search)
      );
    }

    if (filter !== "") {
      filtered = filtered.filter(
        (pizza) => pizza?.category?.toLowerCase() === filter.toLowerCase()
      );
    }

    if (filtered.length === 0) {
      alert("Matching pizza not found!");
      setProducts(filtered);
    }

    setProducts(filtered);
  }, [searchInput, filter, pizzaMenu]);

  return (
    <div>
      <AdminHeader />
      <section className="pl-21 md:pl-81 pt-5">
        <h1 className="text-3xl text-blue-950 pl-8 md:pl-10">Products</h1>
        <div className="flex items-center flex-col gap-3 mt-3 px-8 md:px-10 ">
          <div className="bg-gray-200 rounded-full w-full flex items-center gap-2 py-1 px-2.5 shadow-md">
            <input
              type="text"
              placeholder="Search for a product"
              className="text-[0.85rem] outline-none bg-transparent text-gray-500 px-3 w-full"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <IoSearchOutline color="gray" size={"1.5rem"} className="mb-px" />
          </div>
          <div className="px-auto flex items-center gap-2">
            <select
              className="text-[0.72rem]  md:text-[0.81rem] lg:text-[0.85rem]  bg-gray-200 outline-none px-3 rounded-sm text-start pb-1 pt-0.5"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option
                className="text-[0.72rem] md:text-[0.81rem] lg:text-[0.85rem] text-start"
                value=""
              >
                Filter
              </option>
              <option
                className="text-[0.72rem] md:text-[0.81rem] lg:text-[0.85rem] text-start"
                value="single"
              >
                Single
              </option>
              <option
                className="text-[0.72rem] md:text-[0.81rem] lg:text-[0.85rem] text-start"
                value="double"
              >
                Double Decker
              </option>
            </select>
            <button
              onClick={() => {
                setFilter("");
                setSearchInput("");
                setProducts(pizzaMenu);
              }}
              className="bg-red-600 text-center rounded-md px-3 whitespace-nowrap text-[0.72rem]  md:text-[0.81rem] lg:text-[0.85rem] pt-0.5 pb-1 w-fit text-white"
            >
              Clear Filter
            </button>
            <button className="bg-green-600 text-center rounded-md px-3 whitespace-nowrap text-[0.72rem]  md:text-[0.81rem] lg:text-[0.85rem] pt-0.5 pb-1 w-fit text-white">
              Add New Product
            </button>
          </div>
        </div>
      </section>
      <ProductsList products={products} setProducts={setProducts} />
    </div>
  );
};

export default Products;
