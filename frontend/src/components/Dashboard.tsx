import React, { useState } from "react";
import { Input, Button, Card, Spin } from "antd";
import { SendOutlined, LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/chat/",
        { prompt: input },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored after login
            "Content-Type": "application/json",
          },
        }
      );

      const aiMessage = { sender: "AI", text: response.data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "Sorry, I couldn't generate a response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="chat-title"
      >
        AI Chatbox
      </motion.h2>

      <div className="chat-container">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`message ${msg.sender === "You" ? "user-msg" : "ai-msg"}`}
          >
            <Card size="small" bordered={false} className="chat-card">
              <strong>{msg.sender}:</strong> {msg.text}
            </Card>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 2 }}
            transition={{ duration: 2 }}
            className="loading-msg"
          >
            <Spin indicator={<LoadingOutlined />} /> AI is typing...
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="input-container"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onPressEnter={sendMessage}
          className="chat-input pastel-input"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={sendMessage}
          disabled={loading}
          className="send-btn pastel-btn"
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;
