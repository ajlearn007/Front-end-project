import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Layout, Table, Button, Avatar, Typography, message } from "antd";
import { UserOutlined, LogoutOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Dashboard.css"; // Ensure this file exists

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/users/", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUserData(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleRemoveUser = async (username: string) => {
    try {
      await api.delete(`/users/${username}/`);
      setUserData((prevData) => prevData.filter((user: any) => user.username !== username));
      message.success("User removed successfully!");
    } catch (error) {
      message.error("Failed to remove user!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const columns = [
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      render: (text: string) => (
        <div className="user-info">
          <Avatar size="large" icon={<UserOutlined />} className="user-avatar" />
          <span className="user-name">{text}</span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveUser(record.username)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Layout className="dashboard-layout">
      <Sider width={200} className="sidebar">
        <Title level={3} className="sidebar-title">Dashboard</Title>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Sider>

      <Layout>
        <Header className="dashboard-header">
          <Title level={2} style={{ color: "#fff" }}>Users</Title>
        </Header>
        <Content className="dashboard-content">
          <Table columns={columns} dataSource={userData} rowKey="username" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
