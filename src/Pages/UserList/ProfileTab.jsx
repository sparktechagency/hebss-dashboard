import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Input, Button, Card, Spin, Alert } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";

const primaryColor = "#FF4D4F";

// Reusable input field
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

  // ✅ Get userId from route
  const { id: userId } = useParams();

  // ✅ Fetch user by ID
  const { data, isLoading, isError } = useGetSingleUserQuery(userId, {
    skip: !userId,
  });

  const user = data?.data;



  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-4">
        <Alert message="Failed to load user data." type="error" showIcon />
      </div>
    );
  }

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  return (
    <Card className="p-6 rounded-lg shadow-md" style={{ maxWidth: "900px", margin: "auto" }}>
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
          <CustomInput value={user.firstName || ""} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Last Name</label>
          <CustomInput value={user.lastName || ""} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="font-semibold text-gray-700">Email</label>
          <CustomInput value={user.email || ""} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Phone Number</label>
          <CustomInput value={user.phone || ""} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="font-semibold text-gray-700">Date of Birth</label>
          <CustomInput value={user.dob || ""} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Gender</label>
          <CustomInput value={user.gender || ""} disabled={!isEditMode} />
        </Col>
      </Row>
      <Row gutter={24} className="mb-4">
        <Col span={24}>
          <label className="font-semibold text-gray-700">Address</label>
          <CustomInput value={user.address || ""} disabled={!isEditMode} />
        </Col>
      </Row>

      {/* Save / Cancel Buttons */}
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
