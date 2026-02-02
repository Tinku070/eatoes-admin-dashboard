import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";

const API_URL = process.env.REACT_APP_API_URL;

function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const fetchMenu = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/menu`, {
        params: { q: debouncedSearch }
      });
      setMenu(res.data);
      setError("");
    } catch {
      setError("Failed to load menu");
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

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
      <h2>🍽️ Menu Management</h2>

      <input
        type="text"
        placeholder="Search menu items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "12px", width: "300px" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {menu.map(item => (
          <li key={item._id} style={{ marginBottom: "8px" }}>
            <strong>{item.name}</strong> – ₹{item.price} –{" "}
            <span style={{ color: item.isAvailable ? "green" : "red" }}>
              {item.isAvailable ? "Available" : "Unavailable"}
            </span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => toggleAvailability(item._id, item.isAvailable)}
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
