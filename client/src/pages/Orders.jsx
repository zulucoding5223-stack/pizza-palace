import React, { useEffect, useState } from "react";
import AdminHeader from "../components/admin-components/AdminHeader";
import { useAppContext } from "../utils/appContext";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { orders, setCartState } = useAppContext();
  const [now, setNow] = useState(Date.now());
  const [minutesInput, setMinutesInput] = useState({});
  const [searchResult, setSearchResult] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = orders;

    if (searchResult.trim() !== "") {
      filtered = filtered.filter((order) =>
        order?.id?.toLowerCase().includes(searchResult),
      );
    }

    if (filtered.length === 0) {
      filtered = [];
    }
    setFilteredOrders(filtered);
  }, [searchResult, orders]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getBaseTime = (count) => {
    return count >= 3 ? 45 : 30;
  };

  const getMinutesPassed = (createdAt) => {
    return Math.floor((now - createdAt) / 60000);
  };

  const getTimeLeft = (order) => {
    if (order.isReady) return "Ready";

    const baseTime = getBaseTime(order.items.length);
    const totalTime = baseTime + order.extraMinutes;
    const passed = getMinutesPassed(order.createdAt);
    const remaining = totalTime - passed;

    if (remaining <= 0) return "Ready";
    return `${remaining} min left`;
  };

  const getStatus = (order) => {
    if (order.isReady) return "Ready";

    if (!order.isViewedByAdmin) return "Received";

    const passed = getMinutesPassed(order.createdAt);
    const totalTime = getBaseTime(order.items.length) + order.extraMinutes;

    if (passed < 15) return "Processing";
    if (passed < totalTime) return "Cooking";
    return "Almost Ready";
  };

  const togglePayment = (id) => {
    setFilteredOrders(
      filteredOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              paymentMethod:
                order.paymentMethod === "paid" ? "collection" : "paid",
            }
          : order,
      ),
    );
  };

  const addMinutes = (id) => {
    const minutes = Number(minutesInput[id]);
    if (!minutes || minutes <= 0) return;

    setFilteredOrders(
      filteredOrders.map((order) =>
        order.id === id
          ? { ...order, extraMinutes: order.extraMinutes + minutes }
          : order,
      ),
    );

    setMinutesInput({ ...minutesInput, [id]: "" });
  };

  const markReady = (id) => {
    setFilteredOrders(
      filteredOrders.map((order) =>
        order.id === id ? { ...order, isReady: true } : order,
      ),
    );
  };

  const markCollected = (id) => {
    const order = filteredOrders.find((order) => order.id === id);
    if (!order) return;

    if (order.isReady === true && order.paymentMethod === "paid") {
      const updatedOrder = filteredOrders.map((order) =>
        order.id === id ? { ...order, isCollected: true } : order,
      );

      setFilteredOrders(updatedOrder);
    } else {
      alert("Order is either not paid out or not ready!");
    }
  };
  useEffect(() => {
    const userOrders = filteredOrders?.filter(
      (order) => order?.customer === user?.name,
    );

    let ready = false;

    for (let i = 0; i < userOrders?.length; i++) {
      const currentOrder = userOrders[i];

      if (currentOrder.isCollected === false && currentOrder.isReady === true) {
        ready = true;
      }
    }

    setIsReady(ready);
  }, [orders]);

  return (
    <div>
      <AdminHeader />

      <div className="pl-21 md:pl-81 px-4 md:px-10 py-6 pt-18">
        <h1 className="text-3xl font-semibold mb-6 pl-8">Orders</h1>
        <div className="bg-gray-100 mb-5 mx-7 py-2 text-black px-3 rounded-2xl text-[0.85rem] flex items-center justify-between">
          <input
            className="outline-none border-none w-full"
            value={searchResult}
            onChange={(e) => setSearchResult(e.target.value)}
            type="text"
            placeholder="Search for an order-id"
          />{" "}
          <LuSearch size={"1rem"} />
        </div>

        {/* Desktop Table */}
        <div>
          {filteredOrders && filteredOrders.length > 0 ? (
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Order</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Payment</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Collected</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="px-4 py-3 font-semibold relative">
                        {order.id}
                        <p className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        {order.isViewedByAdmin === false && (
                          <div className="bg-red-500 w-3 h-3 rounded-full top-5 right-3 lg:right-5 absolute"></div>
                        )}
                      </td>

                      <td className="px-4 py-3">{order.customer}</td>

                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          {getStatus(order)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {getTimeLeft(order)}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => togglePayment(order.id)}
                          className={`px-3 py-1 rounded-full text-xs
                        ${
                          order.paymentMethod === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                        >
                          {order.paymentMethod === "paid"
                            ? "Paid"
                            : "Pay on Collection"}
                        </button>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3">
                        <span className="font-bold">
                          R{order.total.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-bold">
                          {order.isCollected ? "Yes" : "No"}
                        </span>
                      </td>

                      <td className="px-4 py-3 flex items-center flex-col gap-3">
                        <div className="flex gap-2 justify-center">
                          <input
                            type="number"
                            min="1"
                            placeholder="+ min"
                            value={minutesInput[order.id] || ""}
                            onChange={(e) =>
                              setMinutesInput({
                                ...minutesInput,
                                [order.id]: e.target.value,
                              })
                            }
                            className="w-16 border rounded px-2 text-sm"
                          />

                          <button
                            onClick={() => addMinutes(order.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                          >
                            Add
                          </button>

                          <button
                            onClick={() => markReady(order.id)}
                            className="bg-green-600 text-white whitespace-nowrap px-3 py-1 rounded-md text-xs"
                          >
                            Mark Ready
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            navigate(`/admin/view-user-orders/${order.id}`);
                            setCartState("orders");
                          }}
                          className="bg-red-600 text-white rounded-md text-xs text-center py-1 w-54"
                        >
                          View Order
                        </button>
                        <button
                          className="w-full text-xs text-white bg-gray-700 rounded-md py-1"
                          onClick={() => {
                            markCollected(order.id);
                          }}
                        >
                          Set Collected
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-5xl hidden md:block">
              No Orders
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        {filteredOrders && filteredOrders.length > 0 ? (
          <div className="md:hidden flex flex-col gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-xl shadow relative"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold">{order.id}</h3>
                  {order.isViewedByAdmin === false && (
                    <div className="bg-red-500 w-2.5 h-2.5 rounded-full top-0.5 right-1 absolute"></div>
                  )}
                  <div className="flex flex-row items-start gap-2">
                    <span className="text-xs text-gray-500">
                      {getStatus(order)}
                    </span>
                    <span className="-mt-1.5">-</span>
                    <span className="text-xs text-gray-500">
                      {order.isCollected ? "Collected" : "Not Collected"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <p className="text-xs text-gray-400">{getTimeLeft(order)}</p>

                <p className="text-sm mt-1">{order.customer}</p>

                {/* Total */}
                <p className="text-sm mt-1">
                  Total:{" "}
                  <span className="font-bold">R{order.total.toFixed(2)}</span>
                </p>

                <button
                  onClick={() => togglePayment(order.id)}
                  className="mt-2 px-3 py-1 rounded-full text-xs whitespace-nowrap bg-gray-100"
                >
                  {order.paymentMethod === "paid"
                    ? "Paid"
                    : "Pay on Collection"}
                </button>

                <div className="flex mt-3 flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="+ min"
                      value={minutesInput[order.id] || ""}
                      onChange={(e) =>
                        setMinutesInput({
                          ...minutesInput,
                          [order.id]: e.target.value,
                        })
                      }
                      className="w-20 border border-gray-500 hover:cursor-pointer"
                    />

                    <button
                      onClick={() => addMinutes(order.id)}
                      className="flex-1 bg-blue-600 text-white rounded-md"
                    >
                      Add
                    </button>

                    <button
                      onClick={() => markReady(order.id)}
                      className="flex-1 bg-green-600 text-white rounded-md"
                    >
                      Ready
                    </button>
                  </div>
                  <button
                    className="w-full text-xs text-white bg-red-700 rounded-md py-1"
                    onClick={() => {
                      navigate(`/admin/view-user-orders/${order.id}`);
                      setCartState("orders");
                    }}
                  >
                    View Order
                  </button>
                  <button
                    className="w-full text-xs text-white bg-gray-700 rounded-md py-1"
                    onClick={() => {
                      markCollected(order.id);
                    }}
                  >
                    Set Collected
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="md:hidden text-center text-5xl ">No Orders</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
