import React, { useState } from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css";
import { Button, Modal, Alert } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useSendMailindivisualMutation } from "../../redux/features/user/userApi";

const SendMailTab = ({ userId, userEmail }) => {
  const [message, setMessage] = useState(""); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");  

  const [sendMail, { isLoading }] = useSendMailindivisualMutation();

  const handleSend = async () => {
    setErrorMsg(null);
    setResponseMsg("");
    try {
      const response = await sendMail({
        userId,
        email: userEmail,
        subject: "Important Message from Admin",
        text: message,
      }).unwrap();

      if (response?.status === "success") {
        setResponseMsg(response.message || "Email sent successfully .");
        setIsModalVisible(true);
        setMessage(""); 
        console.log(response.message)
      } else {
        setErrorMsg(response?.message || "Failed to send email.");
      }
    } catch (error) {
      setErrorMsg(error?.data?.message || "Failed to send email.");
      console.error("Send mail error:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold">Send Email</h2>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-xl font-bold">Compose Your Email</h3>

        <ReactQuill
          value={message}
          onChange={setMessage}
          theme="snow"
          placeholder="Write your message here..."
          style={{
            height: "300px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #d9d9d9",
          }}
        />

        {errorMsg && (
          <Alert
            type="error"
            message={errorMsg}
            style={{ marginBottom: 16 }}
            closable
            onClose={() => setErrorMsg(null)}
          />
        )}

        <Button
          type="primary"
          style={{
            backgroundColor: "#F37975",
            color: "white",
            padding: "8px 16px",
            float: "right",
          }}
          onClick={handleSend}
          loading={isLoading}
          disabled={!message.trim() || isLoading}
        >
          Send
        </Button>
      </div>

      <Modal
        title="Email Status"
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
        <p>{responseMsg}</p> 
      </Modal>
    </div>
  );
};

export default SendMailTab;
