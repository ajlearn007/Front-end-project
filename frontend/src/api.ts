import axios from "axios";

const API_BASE_URL = "http://s1:8000"; // replace 's1' with actual backend server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
