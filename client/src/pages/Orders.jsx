import React, { useEffect, useState } from "react";
import AdminHeader from "../components/admin-components/AdminHeader";
import { useAppContext } from "../utils/appContext";

const Orders = () => {
  const { orders, setOrders } = useAppContext();
  const [now, setNow] = useState(Date.now());
  const [minutesInput, setMinutesInput] = useState({});

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

    const passed = getMinutesPassed(order.createdAt);
    const totalTime = getBaseTime(order.items.length) + order.extraMinutes;

    if (passed < 15) return "Processing";
    if (passed < totalTime) return "Cooking";
    return "Almost Ready";
  };

  const togglePayment = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              paymentMethod:
                order.paymentMethod === "paid" ? "collection" : "paid",
            }
          : order
      )
    );
  };

  const addMinutes = (id) => {
    const minutes = Number(minutesInput[id]);
    if (!minutes || minutes <= 0) return;

    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, extraMinutes: order.extraMinutes + minutes }
          : order
      )
    );

    setMinutesInput({ ...minutesInput, [id]: "" });
  };

  const markReady = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, isReady: true } : order
      )
    );
  };

  return (
    <div>
      <AdminHeader />

      <div className="pl-21 md:pl-81 px-4 md:px-10 py-6 pt-18">
        <h1 className="text-3xl font-semibold mb-6 pl-8">Orders</h1>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3 font-semibold">
                    {order.id}
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
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
                    <span className="font-bold">R{order.total.toFixed(2)}</span>
                  </td>

                  <td className="px-4 py-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold">{order.id}</h3>
                <span className="text-xs text-gray-500">
                  {getStatus(order)}
                </span>
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
                {order.paymentMethod === "paid" ? "Paid" : "Pay on Collection"}
              </button>

              <div className="flex gap-2 mt-3">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
