import React, { useEffect, useState } from "react";
import { useAppContext } from "../utils/appContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { orders, user, setCartState } = useAppContext();
  const navigate = useNavigate();

  // Filter orders based on user role
  const userOrders = user
    ? user?.role === "admin"
      ? orders
      : orders?.filter(
          (order) => order.customer.toLowerCase() === user.name.toLowerCase(),
        )
    : [];

  const [now, setNow] = useState(Date.now());

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

  // If user not logged in
  if (!user) {
    return (
      <div className="px-4 md:px-10 py-6 pt-25">
        <h1 className="text-3xl font-semibold mb-6 text-center">My Orders</h1>
        <p className="text-center">Please login to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-6 pt-25">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Orders</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Collected</th>
              <th className="px-4 py-3 text-left">Items</th>
            </tr>
          </thead>

          <tbody>
            {userOrders.map((order) => (
              <tr
                onClick={() => {
                  navigate(`/view-my-orders/${order.id}`);
                  setCartState("orders");
                }}
                key={order.id}
                className="border-t"
              >
                <td className="px-4 py-3 font-semibold">
                  {order.id}
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                    {getStatus(order)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {getTimeLeft(order)}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.paymentMethod === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentMethod === "paid"
                      ? "Paid"
                      : "Pay on Collection"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="font-bold">R{order.total?.toFixed(2)}</span>
                </td>

                <td className="px-5 py-3">
                  <span className="font-bold">
                    {order.isCollected ? "Yes" : "No"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <p className="text-xs">{order.items.length} item(s)</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {userOrders.map((order) => (
          <div
            onClick={() => {
              navigate(`/view-my-orders/${order.id}`);
              setCartState("orders");
            }}
            key={order.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <div className="flex justify-between mb-1">
              <h3 className="font-semibold">{order.id}</h3>
              <div className="flex flex-row items-start gap-2">
                <span className="text-xs text-gray-500">
                  {getStatus(order)}
                </span> <span className="-mt-1.5">-</span>
                <span className="text-xs text-gray-500">
                  {order.isCollected ? "Collected" : "Not Collected"}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <p className="text-xs text-gray-400">{getTimeLeft(order)}</p>

            <p className="text-sm mt-1">
              Total:{" "}
              <span className="font-bold">R{order.total?.toFixed(2)}</span>
            </p>

            <p className="text-sm mt-1">
              Payment:{" "}
              <span className="font-bold">
                {order.paymentMethod === "paid" ? "Paid" : "Pay on Collection"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
