import React, { useState } from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 
import { Button, Modal, Alert } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useSendMailAllUsersMutation } from "../../redux/features/user/userApi";

const SendMailAll = () => {
  const [message, setMessage] = useState(""); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");

  const [sendMailAll, { isLoading }] = useSendMailAllUsersMutation();

  const handleSend = async () => {
    setErrorMsg(null);
    setResponseMsg("");
    try {
      const response = await sendMailAll({
        subject: "Important Message to All Users",
        text: message,
      }).unwrap();

      if (response?.status === "success") {
        setResponseMsg(response.message || "Emails sent successfully to All .");
        setIsModalVisible(true);
        setMessage("");
        console.log(response)
      } else {
        setErrorMsg(response?.message || "Failed to send emails.");
      }
    } catch (error) {
      setErrorMsg(error?.data?.message || "Failed to send emails.");
      console.error("Send mail all error:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold">Send Email All</h2>

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
            padding: "5px 16px",
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
        <p>{responseMsg}</p>
      </Modal>
    </div>
  );
};

export default SendMailAll;
