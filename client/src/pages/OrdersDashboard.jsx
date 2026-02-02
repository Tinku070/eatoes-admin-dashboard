import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const fetchOrders = useCallback(async () => {
    const res = await axios.get(`${API_URL}/api/orders`, {
      params: {
        status: status === "All" ? "" : status,
        page,
        limit: 5
      }
    });

    setOrders(res.data.orders || res.data);
  }, [status, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (id, newStatus) => {
    await axios.patch(`${API_URL}/api/orders/${id}/status`, {
      status: newStatus
    });
    fetchOrders();
  };

  return (
    <>
      <h2>📦 Orders Dashboard</h2>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>All</option>
        <option>Pending</option>
        <option>Preparing</option>
        <option>Ready</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
          <strong>{order.customerName}</strong> – Table {order.tableNumber}
          <p>Status: {order.status}</p>

          <select
            value={order.status}
            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}

      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Prev
        </button>
        <button onClick={() => setPage(p => p + 1)} style={{ marginLeft: "8px" }}>
          Next
        </button>
      </div>
    </>
  );
}

export default OrdersDashboard;
