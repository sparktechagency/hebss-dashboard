import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons"; 

const ContactUS = () => {
  const [email, setEmail] = useState(""); // Email state
  const [isEditing, setIsEditing] = useState(false); // Track if editing is enabled
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async (value) => {
    setLoading(true);
    // Simulate API call to update email
    setTimeout(() => {
      if (isEditing) {
        message.success("Email updated successfully");
      } else {
        message.success("Email added successfully");
      }
      setEmail(value.email); // Update email
      setLoading(false);
      setIsEditing(false); // Close the form after save
    }, 1000);
  };

  const handleCloseForm = () => {
    setIsEditing(false); // Close the form
  };

  return (
    <div className="container max-w-4xl mx-auto mt-10">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            Contact Email Configuration
          </h2>
        </div>

        {/* Email Configuration Card */}
        <Card
          //   title="Email Configuration"
          className="p-6 mt-5 border-2 shadow-md rounded-xl"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <h3 className="mb-4 font-semibold text-gray-600">
            Admin Contact Email
          </h3>
          <p className="text-lg">{email || "No email configured yet!"}</p>
          <Button
            type="primary"
            onClick={() => setIsEditing(true)}
            className="mt-4"
            style={{
              backgroundColor: "#FF4D4F", // Primary color for button
              color: "white",
              borderRadius: "8px",
              padding: "8px 20px",
              fontWeight: "500",
            }}
          >
            {email ? "Edit Email" : "Add New Email"}
          </Button>
        </Card>

        {/* Form to Add or Edit Email */}
        {isEditing && (
          <div className="relative mt-8">
            <CloseOutlined
              onClick={handleCloseForm}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "20px",
                color: "#FF4D4F",
                cursor: "pointer",
              }}
            />
            <Form
              name="contact-us"
              initialValues={{ email }}
              onFinish={handleSubmit}
              layout="vertical"
              className="px-6 py-10 bg-white border-2 shadow-xl  md:py-20 md:px-10 rounded-2xl"
            >
              <div className="mb-4 text-center">
                <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
                  {email ? "Edit Email" : "Add New Email"}
                </h2>
              </div>

              <Form.Item
                name="email"
                label={
                  <p className="font-semibold text-gray-700 text-md">Email :</p>
                }
                rules={[{ required: true, message: "Please input an email!" }]}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#e2e8f0",
                    fontSize: "16px",
                    backgroundColor: "#f1f5f9",
                  }}
                  placeholder="Enter admin contact email"
                />
              </Form.Item>

              <Form.Item className="mt-8 text-center">
                <Button
                  type="submit"
                  className="w-full p-3 font-semibold text-white rounded-lg shadow-lg bg-primary"
                  loading={loading}
                  style={{ backgroundColor: "#FF4D4F", color: "white" }}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUS;
