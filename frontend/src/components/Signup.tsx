import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";
import api from "../api";

const { Title, Text } = Typography;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (values: { username: string; password: string }) => {
    setLoading(true);
    
    try {
      await api.post("/register/", values);
      message.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      message.error(err.response?.data?.detail || "Signup failed");
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
      <Title level={3} style={{ color: "#1890ff" }}>Signup</Title>
      <Form layout="vertical" onFinish={handleSignup}>
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
          Signup
        </Button>
      </Form>

      <Text style={{ display: "block", marginTop: 15 }}>Already have an account?</Text>
      <Button type="default" block style={{ marginTop: 10, color: "#1890ff", borderColor: "#1890ff" }} onClick={() => navigate("/login")}>
        Login
      </Button>
    </Card>
  );
};

export default Signup;
