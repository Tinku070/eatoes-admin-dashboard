import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const fetchOrders = async () => {
    const res = await axios.get(`${API_URL}/api/orders`, {
      params: {
        status: status === "All" ? "" : status,
        page,
        limit: 5
      }
    });
    setOrders(res.data.orders || res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const updateOrderStatus = async (id, newStatus) => {
    await axios.patch(`${API_URL}/api/orders/${id}/status`, {
      status: newStatus
    });
    fetchOrders();
  };

  return (
    <>
      <h2 style={{ marginBottom: "12px" }}>📦 Orders Dashboard</h2>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: "6px", marginBottom: "12px" }}
      >
        <option>All</option>
        <option>Pending</option>
        <option>Preparing</option>
        <option>Ready</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{order.customerName}</strong>
            <span>Table {order.tableNumber}</span>
          </div>

          <div
            style={{
              marginTop: "8px",
              fontWeight: "bold",
              color:
                order.status === "Pending" ? "orange" :
                order.status === "Preparing" ? "blue" :
                order.status === "Ready" ? "green" : "gray"
            }}
          >
            Status: {order.status}
          </div>

          <select
            value={order.status}
            onChange={(e) =>
              updateOrderStatus(order._id, e.target.value)
            }
            style={{ marginTop: "8px", padding: "6px" }}
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}

      <div style={{ marginTop: "12px" }}>
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          style={{ marginLeft: "8px" }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default OrdersDashboard;
