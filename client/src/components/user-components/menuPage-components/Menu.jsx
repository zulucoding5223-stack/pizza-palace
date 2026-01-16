import React, { useEffect, useState } from "react";

const Menu = ({ menu }) => {
  const [singles, setSingles] = useState([]);
  const [doubles, setDoubles] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  useEffect(() => {
    setSingles(menu.filter((pizza) => pizza.category === "single"));
    setDoubles(menu.filter((pizza) => pizza.category === "double"));
  }, [menu]);

  return (
    <div>
      <section className="w-full px-2 mt-5">
        <div>
          <h1 className="text-center font-bold py-2 text-2xl text-black w-full">
            {singles.length > 0 && "Single"}
          </h1>
          <div className="w-full flex items-center gap-4 sm:gap-8 overflow-x-scroll p-4 hide-scrollbar">
            {singles.map((pizza) => {
              return (
                <div
                  key={pizza.id}
                  className="w-68 sm:w-96
shrink-0 h-47 sm:h-50 border border-red-200 hover:shadow-red-200 rounded-2xl hover:shadow-md transition-all duration-300 flex items-center gap-2 sm:gap-3"
                >
                  <div className="flex flex-col gap-2">
                    <img
                      src={pizza.image}
                      alt="image-pizza"
                      className="object-cover h-30.5 sm:h-37.75 w-full rounded-2xl"
                    />
                    <div className="text-center mb-1">
                      <p className="text-[0.85rem]">Margerita</p>
                      <p className="text-xs text-gray-400">
                        Tomato sause, beef, mashroom
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start flex-col">
                    <p className="text-[0.9rem] sm:text-sm mb-1">
                      {pizza.name}
                    </p>
                    <p className="text-[0.73rem] sm:text-[0.85rem] text-gray-500">
                      {pizza.flavour}
                    </p>
                    <p className="text-xs">
                      {pizza.category === "single" ? "single" : "double decker"}
                    </p>
                    <div className="flex items-center flex-col gap-0.5 mr-1 mt-2">
                      <div className="flex items-center gap-1 sm:gap-2 text-[0.55rem] sm:text-[0.65rem] mt-1">
                        {pizza.sizes.map((size, index) => {
                          return (
                            <button
                              onClick={() => {
                                setSelectedSize({
                                  id: pizza.id,
                                  size: size.size,
                                  price: size.price,
                                });
                              }}
                              key={index}
                              className={`hover:cursor-pointer bg-gray-300 px-3 pb-1 rounded hover:bg-gray-500 hover:text-white flex items-center flex-col gap-px  ${
                                selectedSize?.id === pizza.id &&
                                selectedSize?.size === size.size &&
                                "bg-gray-500 text-white"
                              }`}
                            >
                              <span>{size.size}</span>
                              <div
                                className={`rounded-full p-0.5  ${
                                  size.isAvailable === true
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-[0.65rem] sm:text-[0.75rem] text-start my-1">
                        {selectedSize?.id === pizza.id
                          ? `R${selectedSize.price},00`
                          : "Select a size above"}
                      </div>
                      <button
                        onClick={() => {
                          if (
                            selectedSize?.id === pizza.id &&
                            selectedSize?.size
                          ) {
                            alert("Added to cart");
                          } else {
                            alert("Please select size");
                          }
                        }}
                        className="hover:cursor-pointer w-full bg-blue-950 hover:bg-blue-700 mt-1 text-white text-[0.75rem] rounded h-5 sm:h-7"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-center font-bold py-2 text-2xl text-black w-full">
            {doubles.length > 0 && "Double"}
          </h1>
          <div className="w-full flex items-center gap-4 sm:gap-8 overflow-x-scroll p-4 hide-scrollbar">
            {doubles.map((pizza) => {
              return (
                <div
                  key={pizza.id}
                  className="w-68 sm:w-96
shrink-0 h-47 sm:h-50 border border-red-200 hover:shadow-red-200 rounded-2xl hover:shadow-md transition-all duration-300 flex items-center gap-2 sm:gap-3"
                >
                  <div className="flex flex-col gap-2">
                    <img
                      src={pizza.image}
                      alt="image-pizza"
                      className="object-cover h-30.5 sm:h-37.75 w-full rounded-2xl"
                    />
                    <div className="text-center mb-1">
                      <p className="text-[0.85rem]">Margerita</p>
                      <p className="text-xs text-gray-400">
                        Tomato sause, beef, mashroom
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start flex-col">
                    <p className="text-[0.9rem] sm:text-sm mb-1">
                      {pizza.name}
                    </p>
                    <p className="text-[0.73rem] sm:text-[0.85rem] text-gray-500">
                      {pizza.flavour}
                    </p>
                    <p className="text-xs">
                      {pizza.category === "single" ? "single" : "double decker"}
                    </p>
                    <div className="flex items-center flex-col gap-0.5 mr-1 mt-2">
                      <div className="flex items-center gap-1 sm:gap-2 text-[0.55rem] sm:text-[0.65rem] mt-1">
                        {pizza.sizes.map((size, index) => {
                          return (
                            <button
                              onClick={() => {
                                setSelectedSize({
                                  id: pizza.id,
                                  size: size.size,
                                  price: size.price,
                                });
                              }}
                              key={index}
                              className={`hover:cursor-pointer bg-gray-300 px-3 pb-1 rounded hover:bg-gray-500 hover:text-white flex items-center flex-col gap-px  ${
                                selectedSize?.id === pizza.id &&
                                selectedSize?.size === size.size &&
                                "bg-gray-500 text-white"
                              }`}
                            >
                              <span>{size.size}</span>
                              <div
                                className={`rounded-full p-0.5  ${
                                  size.isAvailable === true
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-[0.65rem] sm:text-[0.75rem] text-start my-1">
                        {selectedSize?.id === pizza.id
                          ? `R${selectedSize.price},00`
                          : "Select a size above"}
                      </div>
                      <button className="hover:cursor-pointer w-full bg-blue-950 hover:bg-blue-700 mt-1 text-white text-[0.75rem] rounded h-5 sm:h-7">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
