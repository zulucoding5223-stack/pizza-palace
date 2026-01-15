import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProductsList = ({ products, setProducts }) => {
  const handleProductDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="pl-21 md:pl-81 mt-5">
      <div className="w-full px-4 md:px-10 mt-6">
        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Sizes & Prices</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((pizza) => (
                <tr
                  key={pizza.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{pizza.name}</p>
                      <p className="text-xs text-gray-500">{pizza.flavour}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 whitespace-nowrap py-1 rounded-full text-xs font-semibold ${
                        pizza.category === "single"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {pizza.category === "single" ? "single" : "double decker"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {pizza.sizes.map((size) => (
                        <div
                          key={size.size}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div
                            className={`p-1 rounded-full ${
                              size.isAvailable ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          <span className="font-semibold">{size.size}</span>
                          <span>R{size.price}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleProductDelete(pizza.id)}
                        className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden flex flex-col gap-4">
          {products.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-white rounded-xl shadow-md p-4 flex gap-4"
            >
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-20 h-20 rounded-md object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{pizza.name}</h3>
                <p className="text-xs text-gray-500">{pizza.flavour}</p>

                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${
                    pizza.category === "single"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {pizza.category === "single" ? "single" : "double decker"}
                </span>

                <div className="mt-2 flex flex-col gap-1">
                  {pizza.sizes.map((size) => (
                    <div
                      key={size.size}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div
                        className={`p-1 rounded-full ${
                          size.isAvailable ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="font-semibold">{size.size}</span>
                      <span>R{size.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-blue-600 text-white py-1.5 rounded-md">
                    Edit
                  </button>
                  <button
                    onClick={() => handleProductDelete(pizza.id)}
                    className="flex-1 bg-red-600 text-white py-1.5 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
