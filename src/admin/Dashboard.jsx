import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      {
        label: "Sales",
        data: [120, 250, 180, 320, 280, 450],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    // Products Count
    const { count: products } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    // Orders Count
    const { count: orders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    // Users Count (profiles)
    const { count: users } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // Revenue
    const { data: revenueData } = await supabase
      .from("orders")
      .select("total");

    const revenue =
      revenueData?.reduce((sum, item) => sum + Number(item.total || 0), 0) || 0;

    setStats({
      products: products || 0,
      orders: orders || 0,
      users: users || 0,
      revenue,
    });

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setRecentOrders(ordersData || []);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Products</p>
            <h2 className="text-3xl font-bold">{stats.products}</h2>
          </div>
          <FaBoxOpen className="text-4xl text-green-600" />
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold">{stats.orders}</h2>
          </div>
          <FaShoppingCart className="text-4xl text-blue-600" />
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold">{stats.users}</h2>
          </div>
          <FaUsers className="text-4xl text-purple-600" />
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-3xl font-bold">${stats.revenue}</h2>
          </div>
          <FaDollarSign className="text-4xl text-orange-600" />
        </div>
      </div>

      {/* Sales Analytics Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-5">Sales Analytics</h2>
        <Line data={chartData} />
      </div>

      {/* Recent Orders Table - full width, below the stats grid */}
      <div className="bg-white rounded-xl shadow mt-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Total</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-3">{order.name}</td>
                <td>${order.total}</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;