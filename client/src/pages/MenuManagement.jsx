import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";

const API_URL = process.env.REACT_APP_API_URL;

function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/menu`, {
        params: { q: debouncedSearch }
      });
      setMenu(res.data);
      setError("");
    } catch {
      setError("Failed to load menu");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [debouncedSearch]);

  const toggleAvailability = async (id, currentStatus) => {
    const previous = [...menu];
    setMenu(menu.map(item =>
      item._id === id ? { ...item, isAvailable: !currentStatus } : item
    ));

    try {
      await axios.patch(`${API_URL}/api/menu/${id}/availability`);
    } catch {
      setMenu(previous);
      alert("Failed to update availability");
    }
  };

  return (
    <>
      <h2 style={{ marginBottom: "12px" }}>🍽️ Menu Management</h2>

      <input
        type="text"
        placeholder="Search menu items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "350px",
          marginBottom: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {menu.map(item => (
          <li
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <strong>{item.name}</strong>
              <div style={{ fontSize: "14px", color: "#555" }}>
                ₹{item.price} · {item.category}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: item.isAvailable ? "green" : "red"
                }}
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </div>
            </div>

            <button
              onClick={() => toggleAvailability(item._id, item.isAvailable)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                background: item.isAvailable ? "#ffe0e0" : "#e0ffe5"
              }}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MenuManagement;
