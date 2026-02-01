import { useEffect, useState } from "react";
import api from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

const MenuManagement = () => {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      searchMenu();
    } else {
      fetchMenu();
    }
  }, [debouncedSearch]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await api.get("/menu");
      setMenu(res.data);
    } catch {
      setError("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  const searchMenu = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/menu/search?q=${debouncedSearch}`);
      setMenu(res.data);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    const previousMenu = [...menu];

    setMenu(
      menu.map((item) =>
        item._id === id
          ? { ...item, isAvailable: !currentStatus }
          : item
      )
    );

    try {
      await api.patch(`/menu/${id}/availability`);
    } catch {
      setMenu(previousMenu);
      alert("Failed to update availability. Reverted.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Menu Management</h2>

      <input
        placeholder="Search menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {menu.map((item) => (
          <li key={item._id} style={{ marginBottom: "10px" }}>
            <strong>{item.name}</strong> – ₹{item.price} –{" "}
            <span style={{ color: item.isAvailable ? "green" : "red" }}>
              {item.isAvailable ? "Available" : "Unavailable"}
            </span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() =>
                toggleAvailability(item._id, item.isAvailable)
              }
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuManagement;
