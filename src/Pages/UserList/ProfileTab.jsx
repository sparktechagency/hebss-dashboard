import React, { useState } from "react";
import { Row, Col, Input, Button, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";

const primaryColor = "#FF4D4F"; 

// Reusable Input Component
const CustomInput = ({ value, onChange, disabled }) => (
  <Input
    value={value}
    onChange={onChange}
    disabled={disabled}
    style={{
      backgroundColor: "#f1f1f1", 
      border: "none", 
      borderRadius: "8px",
      padding: "10px",
      fontSize: "16px",
      boxShadow: disabled ? "none" : "0 0 5px rgba(0, 0, 0, 0.1)", 
    }}
  />
);

const ProfileTab = () => {
  const [isEditMode, setIsEditMode] = useState(false); 
  

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
    cardNumber: "6512********1625",
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
    <Card className="p-6 rounded-lg shadow-md" style={{ maxWidth: "900px", margin: "auto" }}>
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
          <label className="font-semibold text-gray-700">First Name</label>
          <CustomInput value={user.firstName} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Last Name</label>
          <CustomInput value={user.lastName} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="font-semibold text-gray-700">Email</label>
          <CustomInput value={user.email} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Phone Number</label>
          <CustomInput value={user.phone} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="font-semibold text-gray-700">Date of Birth</label>
          <CustomInput value={user.dob} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Gender</label>
          <CustomInput value={user.gender} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={24}>
          <label className="font-semibold text-gray-700">Address</label>
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
              backgroundColor: "#FF4D4F", 
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
