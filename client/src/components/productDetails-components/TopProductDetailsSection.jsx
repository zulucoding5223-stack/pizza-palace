import React, { useState } from "react";
import { useAppContext } from "../../utils/appContext";

const TopProductDetailsSection = ({ menuItem }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const { cartData, setCartData, user } = useAppContext();

  const addItem = () => {
    if (!user) {
      return alert("Please login");
    }

    if (!selectedPrice) {
      return alert("Please select a size!");
    }

    const updatedCart = [...cartData];

    const cart = updatedCart.find((cart) => cart.user === user.name);

    if (!cart) {
      updatedCart.push({
        cartId: Date.now(),
        user: user.name,
        items: [
          {
            pizzaId: menuItem.id,
            name: menuItem.name,
            flavour: menuItem.flavour,
            category: menuItem.category,
            image: menuItem.image,
            sizes: [
              {
                size: selectedPrice.size,
                price: selectedPrice.price,
                quantity: 1,
              },
            ],
          },
        ],
      });
      setCartData(updatedCart);
      return;
    }

    let pizzaInCart = cart.items.find((pizza) => pizza.pizzaId === menuItem.id);
    if (!pizzaInCart) {
      cart.items.push({
        pizzaId: menuItem.id,
        name: menuItem.name,
        flavour: menuItem.flavour,
        category: menuItem.category,
        image: menuItem.image,
        sizes: [
          {
            size: selectedPrice.size,
            price: selectedPrice.price,
            quantity: 1,
          },
        ],
      });
      setCartData(updatedCart);
      return;
    }

    let pizzaInCartSize = pizzaInCart.sizes.find(
      (size) => size.size === selectedPrice.size,
    );

    if (pizzaInCartSize) {
      pizzaInCartSize.quantity += 1;
    } else {
      pizzaInCart.sizes.push({
        size: selectedPrice.size,
        price: selectedPrice.price,
        quantity: 1,
      });
    }

    setCartData(updatedCart);
  };
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-md">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <img
          src={menuItem.image}
          alt={menuItem.name}
          className="w-full h-96 object-cover rounded-2xl shadow border border-gray-200"
        />

        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-3 text-gray-900">
            {menuItem.name}
          </h1>
          <p className="text-gray-700 mb-5 capitalize text-lg">
            {menuItem.flavour} •{" "}
            <span className="font-semibold">{menuItem.category}</span>
          </p>

          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Available Sizes
          </h2>
          <div className="flex gap-4 flex-wrap">
            {menuItem.sizes.map((s, index) => (
              <button
                onClick={() => {
                  setSelectedPrice(s);
                  console.log(s);
                }}
                key={index}
                disabled={!s.isAvailable}
                className={`px-5 py-2 rounded-lg border font-medium text-sm transition-all duration-200
                  ${
                    s.isAvailable
                      ? selectedPrice?.price === s.price
                        ? "bg-green-500"
                        : "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                {s.size} – R{s.price}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              addItem();
            }}
            className="mt-6 py-3 w-full text-center bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            Add
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Ratings & Reviews
        </h2>

        <div className="space-y-5">
          {menuItem.ratings.map((r, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">{r.user}</p>
                <p className="text-yellow-500 text-lg">
                  {"★".repeat(r.stars)}
                  {"☆".repeat(5 - r.stars)}
                </p>
              </div>
              <p className="text-gray-600 text-sm">{r.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProductDetailsSection;
