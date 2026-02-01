import { useEffect, useState } from "react";
import api from "../services/api";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const fetchOrders = async () => {
    const res = await api.get(
      `/orders?status=${status}&page=${page}&limit=5`
    );
    setOrders(res.data);
  };

  const updateStatus = async (id, newStatus) => {
    await api.patch(`/orders/${id}/status`, { status: newStatus });
    fetchOrders();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders Dashboard</h2>

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="Ready">Ready</option>
        <option value="Delivered">Delivered</option>
      </select>

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <p>
            <strong>{order.customerName}</strong> – Table{" "}
            {order.tableNumber}
          </p>
          <p>Status: {order.status}</p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(order._id, e.target.value)
            }
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default OrdersDashboard;
