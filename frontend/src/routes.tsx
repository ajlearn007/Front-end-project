import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/frontend/src/components/login.tsx" element={<Login />} />
        <Route path="/frontend/src/components/Signup.tsx" element={<Signup />} />
        <Route path="/frontend/src/components/Dashboard.tsx" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;