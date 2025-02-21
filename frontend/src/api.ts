import axios from "axios";

const API_BASE = "http://localhost:8000"; // FastAPI backend URL

const api = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

// ✅ Attach JWT token to all requests automatically
const token = localStorage.getItem("token");
if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// API functions
export const registerUser = (username: string, password: string) => 
    api.post("/register/", { username, password });

export const loginUser = async (username: string, password: string) => {
    const response = await api.post("/login/", { username, password });
    const token = response.data.access_token;
    localStorage.setItem("token", token); // Store token in localStorage
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Update axios default header
    return response;
};

export const getUsers = () => api.get("/users/");

export default api;
