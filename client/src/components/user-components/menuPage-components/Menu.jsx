import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../utils/appContext";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Menu = ({ menu }) => {
  const [categories, setCategories] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const result = {};

    for (let i = 0; i < menu.length; i++) {
      const currentCategory = menu[i].category;

      if (!result[currentCategory]) {
        result[currentCategory] = [];
      }

      result[currentCategory].push(menu[i]);
    }

    setCategories(result);
  }, [menu]);

  const { user, cartData, setCartData } = useAppContext();
  const handleAddingItem = (pizza) => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    for (let i = 0; i < pizza.sizes.length; i++) {
      if (selectedSize.size === pizza.sizes[i].size) {
        if (pizza.sizes[i].isAvailable === false) {
          alert("Pizza is not available");
          return;
        }
      }
    }

    // 1️⃣ Copy cart (NEVER mutate state)
    const updatedCart = [...cartData];

    // 2️⃣ Find user's cart
    let userCart = updatedCart.find((c) => c.user === user.name);

    // 3️⃣ If user has NO cart → create one
    if (!userCart) {
      updatedCart.push({
        cartId: `CART-${Date.now()}`,
        user: user.name,
        items: [
          {
            pizzaId: pizza.id,
            name: pizza.name,
            flavour: pizza.flavour,
            category: pizza.category,
            image: pizza.image,
            sizes: [
              {
                size: selectedSize.size,
                price: selectedSize.price,
                quantity: 1,
              },
            ],
          },
        ],
      });

      setCartData(updatedCart);
      return;
    }

    // 4️⃣ Find pizza in cart
    let pizzaInCart = userCart.items.find((p) => p.pizzaId === pizza.id);

    // 5️⃣ If pizza NOT in cart → add it
    if (!pizzaInCart) {
      userCart.items.push({
        pizzaId: pizza.id,
        name: pizza.name,
        flavour: pizza.flavour,
        category: pizza.category,
        image: pizza.image,
        sizes: [
          {
            size: selectedSize.size,
            price: selectedSize.price,
            quantity: 1,
          },
        ],
      });

      setCartData(updatedCart);
      return;
    }

    // 6️⃣ Find size in pizza
    let sizeInCart = pizzaInCart.sizes.find(
      (s) => s.size === selectedSize.size,
    );

    // 7️⃣ If size exists → increase quantity
    if (sizeInCart) {
      sizeInCart.quantity += 1;
    }
    // 8️⃣ If size does NOT exist → add new size
    else {
      pizzaInCart.sizes.push({
        size: selectedSize.size,
        price: selectedSize.price,
        quantity: 1,
      });
    }

    // 9️⃣ Update state
    setCartData(updatedCart);
  };
  const navigate = useNavigate();
  const [pizzaStars, setPizzaStars] = useState(0);

  const calculateStars = (pizza) => {
    let totalStars = 0;

    for (let i = 0; i < pizza.ratings.length; i++) {
      totalStars += pizza.ratings[i].stars;
    }

    return Math.floor(totalStars / pizza.ratings.length);
  };

  const renderStars = (pizza) => {
    const totalStars = calculateStars(pizza);
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      const star = <IoStarSharp color={"gold"} size={"0.85rem"} />;
      stars.push(star);
    }

    return stars;
  };

  return (
    <div>
      <section className="w-full px-2">
        {Object.keys(categories).map((categoryName, index) => {
          return (
            <div key={index} className="mt-5">
              <h1 className="text-center font-bold py-2 text-2xl text-black w-full">
                {categoryName}
              </h1>
              <div className="w-full flex items-center gap-4 sm:gap-8 overflow-x-scroll p-4 hide-scrollbar">
                {categories[categoryName].map((pizza) => {
                  return (
                    <div
                      key={pizza.id}
                      className="
shrink-0 border border-red-200 hover:shadow-red-200 rounded-2xl hover:shadow-md transition-all duration-300 flex items-center flex-col gap-2 sm:gap-3"
                    >
                      <div className="flex flex-row gap-2">
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
                        <div className="flex items-start flex-col mt-1">
                          <p className="text-[0.9rem] sm:text-sm mb-1">
                            {pizza.name}
                          </p>
                          <p className="text-[0.73rem] sm:text-[0.85rem] text-gray-500">
                            {pizza.flavour}
                          </p>
                          <p className="text-xs">
                            {pizza.category === "single"
                              ? "single"
                              : "double decker"}
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
                                    <span className="whitespace-nowrap">
                                      {size.size}-R{size.price}
                                    </span>
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
                                if (!user) {
                                  alert("Please login!");
                                  return;
                                }

                                handleAddingItem(pizza);
                              }}
                              className="hover:cursor-pointer w-full bg-blue-950 hover:bg-blue-700 mt-1 text-white text-[0.75rem] rounded h-5 sm:h-7"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full pt-1 pb-2 px-2 items-center flex flex-row justify-around bg-gray-100 rounded-b-2xl ">
                        <div className="relative flex gap-0.5">
                          <IoStarSharp size="0.85rem" />
                          <IoStarSharp size="0.85rem" />
                          <IoStarSharp size="0.85rem" />
                          <IoStarSharp size="0.85rem" />
                          <IoStarSharp size="0.85rem" />
                          <div className="absolute top-0 left-0 flex gap-0.5">
                            {renderStars(pizza).map((star, index) => {
                              return <div key={index}>{star}</div>;
                            })}
                          </div>
                        </div>
                        <span className="text-gray-700 text-[0.85rem]">
                          {pizza.ratings?.length > 0
                            ? `${pizza.ratings.length} Reviews`
                            : "No reviews"}
                        </span>
                        <button
                          onClick={() => {
                            navigate(`/menu/${pizza.id}`);
                          }}
                          className="whitespace-nowrap px-2 pt-1 pb-1.5 text-[0.85rem] bg-orange-500 text-blue-950 rounded-lg mt-1 hover:cursor-pointer hover:bg-orange-400"
                        >
                          View ratings
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Menu;
