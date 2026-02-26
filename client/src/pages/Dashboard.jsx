import React, { useEffect, useState } from "react";
import AdminHeader from "../components/admin-components/AdminHeader";
import { useAppContext } from "../utils/appContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { orders, pizzaMenu, setCartState, setOrders, user } = useAppContext();
  const navigate = useNavigate();

  const [customerOrders, setCustomerOrders] = useState(orders);
  const [pending, setPending] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [isNotViewed, setIsNotViewed] = useState(false);

  useEffect(() => {
    let total = 0;
    let pendingTotal = 0;
    let notViewed = false;
    for (let i = 0; i < customerOrders.length; i++) {
      const currentOrder = customerOrders[i];

      if (currentOrder.isCollected === true) {
        total += currentOrder.total;
      } else {
        pendingTotal += 1;
      }

      if (currentOrder.isViewedByAdmin === false) {
        notViewed = true;
      }
    }

    setIsNotViewed(notViewed);
    setRevenue(total);
    setPending(pendingTotal);
  }, [customerOrders, orders]);

  const handleViewed = (id) => {
    const updatedOrders = customerOrders.map((order) =>
      order.id === id ? { ...order, isViewedByAdmin: true } : order,
    );

    setCustomerOrders(updatedOrders);
    setOrders(updatedOrders);
  };

  return (
    <div>
      <AdminHeader />

      <div className="min-h-screen bg-gray-100 pl-23 pr-3 md:pl-83 pt-20">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage customer orders, products and track activity
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div onClick={() => {navigate(`/admin/profile`)}} className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Profile</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {user?.name}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {customerOrders.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Menu Items</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {pizzaMenu.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow relative">
            <p className="text-sm text-gray-500">Pending orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {pending ? `${pending}` : "-"}
            </p>
            {isNotViewed && (
              <div className="bg-red-500 w-4 h-4 rounded-full top-0.5 right-0.5 absolute"></div>
            )}
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {revenue ? `R${revenue.toFixed(2)}` : "-"}
            </p>
          </div>
        </div>

        {/* customerOrders Table */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-600">
                  <th className="px-5 py-3">Order ID</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Payment</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {customerOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-gray-800 relative">
                      {order.id}
                      {order.isViewedByAdmin === false && (
                        <div className="bg-red-500 absolute top-4 left-15 lg:left-21 w-2 h-2 rounded-full"></div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-5 py-4 capitalize">
                      <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                        Processing
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-800">
                      R{order.total}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => {
                          handleViewed(order.id);
                          navigate(`/admin/view-user-orders/${order.id}`);
                          setCartState("orders");
                        }}
                        className="px-4 py-2 text-sm border rounded-lg shadow-sm hover:bg-gray-100 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ratings Section */}
        <div className="max-w-7xl mx-auto mt-16 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">
            Customer Ratings
          </h2>

          <div className="space-y-10">
            {pizzaMenu.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-linear-to-br from-white to-gray-50 border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {pizza.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 tracking-wide">
                      {pizza.flavour} • {pizza.category}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-0">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Reviews
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pizza.ratings.map((rating, index) => (
                    <div
                      key={index}
                      className="relative bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Decorative Accent */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 rounded-l-xl"></div>

                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-gray-800 text-sm">
                          {rating.user}
                        </p>

                        <div className="text-yellow-400 text-sm tracking-wide">
                          {"★".repeat(rating.stars)}
                          <span className="text-gray-300">
                            {"★".repeat(5 - rating.stars)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {rating.review}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
