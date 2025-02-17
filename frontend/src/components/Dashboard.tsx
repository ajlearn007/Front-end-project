import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if no token
      return;
    }

    // Fetch protected data
    api
      .get("/users/", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUserData(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login"); // Redirect if token is invalid
      });
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
