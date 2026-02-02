import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL?.endsWith("/api")
    ? process.env.REACT_APP_API_URL
    : `${process.env.REACT_APP_API_URL}/api`;

const api = axios.create({
  baseURL: BASE_URL || "http://localhost:5000/api",
});

export default api;
