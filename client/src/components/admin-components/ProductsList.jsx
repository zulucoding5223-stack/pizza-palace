import React from "react";

const ProductsList = ({ products, setProducts }) => {
  const handleProductDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  return (
    <div className="pl-21 md:pl-81 px-auto mt-5">
      <div className="flex items-center flex-col gap-3">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="w-full border border-gray-200 rounded-lg px-3 flex items-center justify-between py-3"
            >
              <div className="flex items-center flex-col gap-3">
                <img
                  src={product.image}
                  alt="product-image"
                  className="object-center rounded-lg w-28 sm:w-30 lg:w-37 h-20 lg:h-32"
                />
                <button className="rounded-lg bg-blue-500 text-white text-[0.85rem] w-28 sm:w-30 pb-1 pt-0.5 lg:hidden hover:cursor-pointer">
                  Update
                </button>
                <button
                  onClick={() => {
                    handleProductDelete(product.id);
                  }}
                  className="rounded-lg bg-red-700 text-white text-[0.85rem] w-28 sm:w-30 pb-1 pt-0.5 lg:hidden hover:cursor-pointer"
                >
                  delete
                </button>
              </div>
              <div className="flex items-start flex-col  gap-1.5">
                <p className="text-[0.90rem] text-black font-semibold w-22 sm:w-fit">
                  {product.name}
                </p>
                <p className="text-[0.85rem] text-gray-500 w-22 md:w-25 sm:w-fit">
                  {product.category === "double" ? "double decker" : "single"}
                </p>
                <p className="text-[0.85rem] text-gray-300 w-22 sm:w-fit">
                  {product.flavour}
                </p>
              </div>
              <div className="flex items-start flex-col gap-2">
                {product.sizes.map((size, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-gray-200 shadow-md shadow-gray-100 py-2 px-3 rounded-sm flex text-[0.85rem] items-center gap-2 text-gray-500"
                    >
                      <span>{size.size}</span>
                      {"-"}
                      <span>R{size.price}.00</span>{" "}
                      <div
                        className={`p-0.75 rounded-full ${
                          size.isAvailable === true
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center flex-col gap-1.5">
                <button className="rounded-lg bg-blue-500 text-white text-[0.85rem] w-28 sm:w-30 pb-1 pt-0.5 hidden lg:block hover:cursor-pointer">
                  Update
                </button>
                <button
                  onClick={() => {
                    handleProductDelete(product.id);
                  }}
                  className="rounded-lg bg-red-700 text-white text-[0.85rem] w-28 sm:w-30 pb-1 pt-0.5 hidden lg:block hover:cursor-pointer"
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
