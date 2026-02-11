import React from "react";
import AdminHeader from "../components/admin-components/AdminHeader";
import { useAppContext } from "../utils/appContext";

const Dashboard = () => {
  const { orders, pizzaMenu } = useAppContext();

  return (
    <div>
      <AdminHeader />

      <div className="min-h-screen bg-gray-100 pl-23 pr-3 md:pl-83 pt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage orders, products and track activity
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {orders.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Menu Items</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {pizzaMenu.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">—</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">—</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Orders
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
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {order.id}
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
                      <button className="px-4 py-2 text-sm border rounded-lg shadow-sm hover:bg-gray-100 transition">
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
        <div className="max-w-7xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Customer Ratings
          </h2>

          <div className="space-y-6">
            {pizzaMenu.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pizza.name}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {pizza.flavour} • {pizza.category}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pizza.ratings.map((rating, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 shadow-sm hover:shadow transition"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-800">
                          {rating.user}
                        </p>
                        <p className="text-yellow-500 text-sm">
                          {"★".repeat(rating.stars)}
                          {"☆".repeat(5 - rating.stars)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
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
