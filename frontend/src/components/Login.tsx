import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";
import api from "../api";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);

    try {
      const response = await api.post("/login/", values);
      const token = response.data.access_token;

      localStorage.setItem("token", token);
      message.success("Login successful! Redirecting...", 1.2); // Adjusted timeout
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err: any) {
      console.error("Login Error:", err.response);

      if (err.response) {
        const errorMessage = err.response.data?.detail || "Login failed";

        if (errorMessage.toLowerCase().includes("invalid")) {
          message.error("Invalid username or password. Please check your credentials.");
        } else if (err.response.status === 500) {
          message.error("Server error. Please try again later.");
        } else {
          message.error(errorMessage);
        }
      } else {
        message.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        width: 400,
        margin: "50px auto",
        padding: 20,
        textAlign: "center",
        backgroundColor: "#f0f2f5",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Title level={3} style={{ color: "#1890ff" }}>Login</Title>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label={<Text strong style={{ color: "#333" }}>Username</Text>}
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label={<Text strong style={{ color: "#333" }}>Password</Text>}
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}>
          Login
        </Button>
      </Form>

      <Text style={{ display: "block", marginTop: 15 }}>Not signed up yet?</Text>
      <Button
        type="default"
        block
        style={{ marginTop: 10, color: "#1890ff", borderColor: "#1890ff" }}
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </Button>
    </Card>
  );
};

export default Login;
