import React, { useEffect, useState } from "react";
import { useAppContext } from "../utils/appContext";
import { useParams } from "react-router-dom";

const Cart = () => {
  const { user, cartData, setCartQuantity, orders, cartState, setOrders } =
    useAppContext();
  const params = useParams();
  const orderId = params.id;
  const userCart =
    cartState === "orders"
      ? orders.find((cart) => String(cart.id) === String(orderId))
      : cartData.find((cart) => cart.user === user.name);
  const [cartItems, setCartItems] = useState(userCart.items);
  const [counter, setCounter] = useState(0);
  const [orderState, setOrderState] = useState("");

  const handleQuantityTotal = () => {
    const items = cartItems;
    let totalQuantity = 0;

    for (let i = 0; i < items.length; i++) {
      let qTotal = 0;
      const sizes = items[i].sizes;
      for (let j = 0; j < sizes.length; j++) {
        qTotal += sizes[j].quantity;
      }
      totalQuantity += qTotal;
    }

    return totalQuantity;
  };

  const handlePriceTotal = () => {
    const items = cartItems;
    let totalPrice = 0;

    for (let i = 0; i < items.length; i++) {
      let pTotal = 0;
      const sizes = items[i].sizes;
      for (let j = 0; j < sizes.length; j++) {
        const price = sizes[j].quantity * sizes[j].price;
        pTotal += price;
      }
      totalPrice += pTotal;
    }

    return totalPrice;
  };
  const [cartQuantityT, setQartQuantityT] = useState(0);
  const [cartTotalT, setQartTotalT] = useState(0);

  useEffect(() => {
    const cartQuantityTotal = handleQuantityTotal();
    const cartPriceTotal = handlePriceTotal();
    setCartQuantity(cartQuantityTotal);
    setQartQuantityT(cartQuantityTotal);
    setQartTotalT(cartPriceTotal);
  }, [cartItems]);

  const [productId, setProductId] = useState("");

  const updateQuantity = (pizzaId, sizeIndex, newQuantity) => {
    const newCart = [];

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      if (item.pizzaId !== pizzaId) {
        newCart.push(item);
        continue;
      }

      const newSizes = [];

      for (let j = 0; j < item.sizes.length; j++) {
        if (j === sizeIndex) {
          newSizes.push({
            ...item.sizes[j],
            quantity: Number(newQuantity),
          });
        } else {
          newSizes.push(item.sizes[j]);
        }
      }

      newCart.push({
        ...item,
        sizes: newSizes,
      });
    }
    setCartItems(newCart);
  };

  const handleDeleteItem = (id) => {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].pizzaId === id) {
        setCartItems((prev) =>
          prev.filter((cartItem) => cartItem.pizzaId !== id),
        );
      }
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderCreation = (paymentMethod) => {
    let newOrder = {
      id: Date.now(),
      customer: user.name,
      items: cartItems,
      paymentMethod: paymentMethod,
      createdAt: Date.now(),
      extraMinutes: 0,
      isReady: false,
      total: cartTotalT,
      isViewedByAdmin: false,
    };

    let newOrdersCart = [newOrder, ...orders];
    setOrders(newOrdersCart);
  };

  console.log("counter: ", counter);

  return (
    <div className="pt-24 px-5 md:px-8">
      <p className="text-blue-700 mb-5 text-sm px-auto w-full flex items-center justify-between md:w-full px-auto">
        <span className="">
          {cartState === "orders"
            ? user.role === "admin"
              ? userCart.customer
              : "My Orders"
            : "My Cart"}
        </span>
        <span className="text-[0.85rem] whitespace-nowrap">
          {userCart?.user}
        </span>
        <span className="text-[0.85rem] whitespace-nowrap">
          {userCart.cartId}
        </span>
        <span className="text-[0.85rem] whitespace-nowrap">
          Quantity: {cartQuantityT}
        </span>
      </p>
      {cartState === "orders" && (
        <div className="w-full rounded-lg py-1 flex items-center flex-col gap-2 text-[0.85rem] mb-2">
          <div className="flex items-center justify-between gap-5">
            <span className="whitespace-nowrap">
              <strong>Date:</strong>{" "}
              {new Date(userCart.createdAt).toLocaleDateString()}
            </span>
            <span className="whitespace-nowrap">
              <strong>Time:</strong>{" "}
              {new Date(userCart.createdAt).toLocaleTimeString()}
            </span>
          </div>

          <span className="whitespace-nowrap">
            <strong>Ready:</strong>{" "}
            {userCart.isReady ? "Ready for collection" : "Still Processing"}
          </span>
        </div>
      )}
      <div className="md:hidden">
        <div className="flex flex-col items-center gap-3">
          {cartItems.map((item) => {
            return (
              <div
                key={item.pizzaId}
                className="border border-gray-300 shadow-md hover:shadow-red-400 w-full p-3 rounded-lg flex items-center justify-between flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <img
                      src={item.image}
                      alt="cart-item-image"
                      className="object-cover rounded-lg h-full"
                    />
                  </div>

                  <div className="flex items-start flex-col gap-1">
                    <p className="text-black font-bold text-sm whitespace-nowrap">
                      {item.name}
                    </p>
                    <p className="text-gray-300 text-[0.75rem] whitespace-nowrap ">
                      {item.flavour}
                    </p>
                    <div className="w-fit text-center py-0.5 px-2 rounded-full bg-gray-100 whitespace-nowrap text-[0.85rem] text-gray-400">
                      {userCart.category === "single"
                        ? "single"
                        : "double decker"}
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center flex-col  gap-3">
                  {item.sizes.map((size, index) => {
                    let total = size.price * size.quantity;
                    return (
                      <div
                        key={index}
                        className="flex items-start justify-between flex-row w-full gap-1 bg-gray-200 p-3 rounded-lg text-xs"
                      >
                        <span className="whitespace-nowrap font-bold">
                          Size: {size.size}
                        </span>
                        {"--"}
                        {productId === item.pizzaId ? (
                          <div className="flex items-center gap-1 whitespace-nowrap w-19 text-xs">
                            <span>Quantity: </span>
                            <input
                              type="number"
                              min="0"
                              className="outline-amber-400 text-gray-500 text-[0.60rem] p-px w-full border border-gray-500 rounded-sm h-4"
                              value={size.quantity}
                              onChange={(e) => {
                                updateQuantity(
                                  item.pizzaId,
                                  index,
                                  e.target.value,
                                );
                              }}
                            />
                          </div>
                        ) : (
                          <span className="whitespace-nowrap font-bold">
                            Quantity: {size.quantity}
                          </span>
                        )}{" "}
                        {"--"}
                        <span className="whitespace-nowrap font-bold">
                          Total: R{total.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {cartState === "orders" ? (
                  <></>
                ) : (
                  <div className="flex items-center w-full justify-between gap-2">
                    <button
                      onClick={() => {
                        setProductId((prev) =>
                          prev === item.pizzaId ? "" : item.pizzaId,
                        );
                      }}
                      className="text-[0.85rem] w-full pb-0.75 pt-0.5 rounded-lg text-white bg-blue-500 hover:cursor-pointer hover:bg-blue-700"
                    >
                      {productId === item.pizzaId ? "Done" : "Edit"}
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteItem(item.pizzaId);
                      }}
                      className="text-[0.85rem] w-full pb-0.75 pt-0.5 rounded-lg text-white bg-red-500 hover:cursor-pointer hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-around w-full bg-red-50 mt-5">
          <span className="whitespace-nowrap">Quantity: {cartQuantityT}</span>
          <span className="whitespace-nowrap">
            {cartState === "orders" ? "Order Total" : "Cart Total"}: R
            {cartTotalT.toFixed(2)}
          </span>
        </div>

        {cartState === "orders" ? (
          <></>
        ) : (
          <div>
            <div className="bg-blue-100 text-black text-sm mt-3 mb-1 text-center whitespace-nowrap w-full py-1">
              Place your order below!
            </div>
            <div className="flex items-center justify-between w-full gap-2">
              <button
                onClick={() => {
                  if (cartItems.length === 0) {
                    alert("Add a pizza in your cart first.");
                    return;
                  }

                  if (counter > 0 && orderState === "online Payment") {
                    alert(
                      "Order successfully placed! View your order so that you can also track it!",
                    );
                    handleOrderCreation("paid");
                    handleClearCart();
                    setCounter(0);
                    setOrderState("");
                    return;
                  }
                  setCounter((prev) =>
                    orderState === "online Payment" || orderState === ""
                      ? prev + 1
                      : 1,
                  );
                  setOrderState("online Payment");
                  alert(
                    "You selected online payment. To proceede with your online payment click the online payment button again.",
                  );
                }}
                className="w-full bg-green-500 text-white hover:bg-green-700 text-[0.85rem] pb-0.75 pt-0.5 rounded-lg mt-3"
              >
                Online Payment
              </button>
              <button
                onClick={() => {
                  if (cartItems.length === 0) {
                    alert("Add a pizza in your cart first.");
                    return;
                  }

                  if (counter > 0 && orderState === "Pay on Collection") {
                    alert(
                      "Order successfully placed! View your order so that you can also track it!",
                    );
                    handleOrderCreation("Pay on Collection");
                    handleClearCart();
                    setCounter(0);
                    setOrderState("");
                    return;
                  }

                  alert(
                    "You selected pay on collection? To proceede with your order click the Pay on Collection button again.",
                  );
                  setCounter((prev) =>
                    orderState === "Pay on Collection" || orderState === ""
                      ? prev + 1
                      : 1,
                  );
                  setOrderState("Pay on Collection");
                }}
                className="w-full bg-green-500 text-white hover:bg-green-700 text-[0.85rem] pb-0.75 pt-0.5 rounded-lg mt-3"
              >
                Pay on Collection
              </button>
            </div>

            <button
              onClick={() => {
                handleClearCart();
              }}
              className="w-full bg-orange-500 text-white hover:bg-orange-700 text-[0.85rem] pb-0.75 pt-0.5 rounded-lg mt-3 whitespace-nowrap mb-5"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      <div>
        <div className="hidden md:block w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-225 text-sm border-collapse bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    Flavour
                  </th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    Sizes
                  </th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    Item Total
                  </th>
                  {cartState !== "orders" && (
                    <th className="text-center px-4 py-3 whitespace-nowrap">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => {
                  const itemTotal = item.sizes.reduce(
                    (sum, size) => sum + size.price * size.quantity,
                    0,
                  );

                  return (
                    <tr
                      key={item.pizzaId}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <span className="font-bold whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {item.flavour}
                      </td>

                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-400 text-xs whitespace-nowrap">
                          {item.category === "single"
                            ? "Single"
                            : "Double Decker"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {item.sizes.map((size, index) => (
                            <div
                              key={index}
                              className="bg-gray-200 rounded-md px-2 py-1 text-xs whitespace-nowrap w-fit"
                            >
                              Size {size.size} • Qty{" "}
                              {productId === item.pizzaId ? (
                                <input
                                  type="number"
                                  min="0"
                                  className="outline-amber-400 text-gray-500 text-[0.60rem] p-px w-15 border border-gray-500 rounded-sm h-3"
                                  value={size.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.pizzaId,
                                      index,
                                      e.target.value,
                                    )
                                  }
                                />
                              ) : (
                                size.quantity
                              )}{" "}
                              • R{(size.price * size.quantity).toFixed(2)}
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-3 font-bold whitespace-nowrap">
                        R{itemTotal.toFixed(2)}
                      </td>

                      {cartState !== "orders" && (
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                setProductId((prev) =>
                                  prev === item.pizzaId ? "" : item.pizzaId,
                                )
                              }
                              className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-700 whitespace-nowrap"
                            >
                              {productId === item.pizzaId ? "Done" : "Edit"}
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteItem(item.pizzaId);
                              }}
                              className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-700 whitespace-nowrap"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bg-red-50 px-6 py-4 mt-4 rounded-lg">
            <span className="whitespace-nowrap">Quantity: {cartQuantityT}</span>
            <span className="font-bold whitespace-nowrap">
              {cartState === "orders" ? "Order Total" : "Cart Total"}: R
              {cartTotalT.toFixed(2)}
            </span>
          </div>

          {cartState !== "orders" && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  alert(
                    "Order successfully placed! View your order so that you can also track it!",
                  );
                  handleOrderCreation();
                  handleClearCart();
                }}
                className="w-full bg-green-500 text-white hover:bg-green-700 text-sm py-2 rounded-lg"
              >
                Order
              </button>
              <button
                onClick={() => {
                  handleClearCart();
                }}
                className="w-full bg-orange-500 text-white hover:bg-orange-700 text-sm py-2 rounded-lg whitespace-nowrap"
              >
                Clear Cart
              </button>
            </div>
          )}

          {cartState === "orders" && user.role === "admin" && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
