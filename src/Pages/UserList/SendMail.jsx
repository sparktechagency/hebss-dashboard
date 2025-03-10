import React, { useState } from "react";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles
import { Button, Modal } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const SendMailTab = () => {
  const [message, setMessage] = useState(""); // State to hold the email body
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSend = () => {
    // Simulate sending the email and show success message
    setIsModalVisible(true);
    console.log("Email sent to user with message:", message);
    // In a real-world scenario, you would send the email using an API here.
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Send Email</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Compose Your Email</h3>

        <ReactQuill
          value={message}
          onChange={setMessage}
          theme="snow"
          placeholder="Write your message here..."
          style={{
            height: "300px",
            marginBottom: "20px", // Adding some space between the editor and button
            borderRadius: "4px",
            border: "1px solid #d9d9d9", // Ensuring borders are visible
          }}
        />

        {/* Send Button below the message box, aligned to the right */}
        <Button
          type="primary"
          style={{
            backgroundColor: "#F37975",
            color: "white",
            padding: "8px 16px",
            float: "right", // Aligning the button to the right
          }}
          onClick={handleSend}
        >
          Send
        </Button>
      </div>

      {/* Modal after sending email */}
      <Modal
        title="Email Sent"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            <CloseOutlined /> Close
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={handleModalClose}
            style={{ backgroundColor: "#F37975" }}
          >
            <CheckOutlined /> OK
          </Button>,
        ]}
      >
        <p>Your email has been sent successfully.</p>
      </Modal>
    </div>
  );
};

export default SendMailTab;
