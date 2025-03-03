import React, { useState } from "react";
import { Row, Col, Input, Button, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";

// Define the primary color
const primaryColor = "#FF4D4F"; // Assuming the provided primary color is red (adjust if different)

// Reusable Input Component
const CustomInput = ({ value, onChange, disabled }) => (
  <Input
    value={value}
    onChange={onChange}
    disabled={disabled}
    style={{
      backgroundColor: "#f1f1f1", // Gray background for inputs
      border: "none", // Removed border
      borderRadius: "8px",
      padding: "10px",
      fontSize: "16px",
      boxShadow: disabled ? "none" : "0 0 5px rgba(0, 0, 0, 0.1)", // Light shadow for active inputs
    }}
  />
);

const ProfileTab = () => {
  const [isEditMode, setIsEditMode] = useState(false); // Manage Edit Mode

  // User and card info
  const user = {
    firstName: "Christine",
    lastName: "Brooks",
    email: "christine@example.com",
    phone: "546-933-2772",
    dob: "11-08-1995",
    gender: "Female",
    address: "089 Kutch Green Apt. 448",
  };

  const cardInfo = {
    cardName: "MasterCard",
    cardNumber: "6512 ******** 1625",
    expiryDate: "12/23",
  };

  // Handle Save functionality
  const handleSave = () => {
    setIsEditMode(false);
  };

  // Handle Cancel functionality
  const handleCancel = () => {
    setIsEditMode(false);
  };

  return (
    <Card className="p-6 shadow-md rounded-lg" style={{ maxWidth: "900px", margin: "auto" }}>
      {/* Edit Button */}
      {!isEditMode && (
        <div className="flex justify-end mb-4">
          <Button
            icon={<EditOutlined />}
            style={{
              backgroundColor: primaryColor,
              color: "white",
              border: "none",
              padding: "6px 16px",
            }}
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </Button>
        </div>
      )}

      {/* Profile Info */}
      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="text-gray-700 font-semibold">First Name</label>
          <CustomInput value={user.firstName} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="text-gray-700 font-semibold">Last Name</label>
          <CustomInput value={user.lastName} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="text-gray-700 font-semibold">Email</label>
          <CustomInput value={user.email} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="text-gray-700 font-semibold">Phone Number</label>
          <CustomInput value={user.phone} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="text-gray-700 font-semibold">Date of Birth</label>
          <CustomInput value={user.dob} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="text-gray-700 font-semibold">Gender</label>
          <CustomInput value={user.gender} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={24}>
          <label className="text-gray-700 font-semibold">Address</label>
          <CustomInput value={user.address} disabled={!isEditMode} />
        </Col>
      </Row>

      {/* Card Information (Non-editable) */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Card Information</h3>
        <Row gutter={24} className="mb-4">
          <Col span={12}>
            <label className="text-gray-500">Card Name</label>
            <CustomInput value={cardInfo.cardName} disabled />
          </Col>
          <Col span={12}>
            <label className="text-gray-500">Card Number</label>
            <CustomInput value={cardInfo.cardNumber} disabled />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <label className="text-gray-500">Expiry Date</label>
            <CustomInput value={cardInfo.expiryDate} disabled />
          </Col>
        </Row>
      </div>

      {/* Buttons: Save or Cancel */}
      {isEditMode && (
        <div className="flex justify-end mt-4">
          <Button
            style={{
              backgroundColor: "#FF4D4F", // Primary color for the cancel button
              color: "white",
              border: "none",
              padding: "8px 16px",
              marginRight: "10px",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: primaryColor,
              color: "white",
              border: "none",
              padding: "8px 16px",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProfileTab;
