import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: status })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      <table className="w-full border">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id || index}>
              <td className="p-3 border">{order.id}</td>

              <td className="p-3 border">{order.user_id}</td>

              <td className="p-3 border">${order.total}</td>

              <td className="p-3 border">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;