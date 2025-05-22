import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateUserByIdMutation } from "../../redux/features/user/userApi";

const primaryColor = "#FF4D4F";

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

const ProfileTab = ({ user, isEditMode, setIsEditMode }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserByIdMutation();

  useEffect(() => {
    if (user) {
      // Extract firstName and lastName from survey.readerName if survey exists
      let firstName = "";
      let lastName = "";
      if (user.survey && user.survey.readerName) {
        const names = user.survey.readerName.trim().split(" ");
        firstName = names[0] || "";
        lastName = names.slice(1).join(" ") || "";
      }

      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        phone: user.phone || "",
        dob: user.survey?.dateOfBirth ? user.survey.dateOfBirth.slice(0, 10) : "", // ISO date to yyyy-mm-dd
        gender: user.gender || "",
        address: user.address || "", // Assuming address is top level; blank if missing
      });
    }
  }, [user]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      // Send updated data to backend
      await updateUser({ _id: user._id, ...formData }).unwrap();
      setIsEditMode(false);
    } catch (error) {
      alert("Failed to update user data");
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Reset form to initial user data
    if (user) {
      let firstName = "";
      let lastName = "";
      if (user.survey && user.survey.readerName) {
        const names = user.survey.readerName.trim().split(" ");
        firstName = names[0] || "";
        lastName = names.slice(1).join(" ") || "";
      }

      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        phone: user.phone || "",
        dob: user.survey?.dateOfBirth ? user.survey.dateOfBirth.slice(0, 10) : "",
        gender: user.gender || "",
        address: user.address || "",
      });
    }
    setIsEditMode(false);
  };

  return (
    <Card style={{ maxWidth: "900px", margin: "auto" }} className="p-6 rounded-lg shadow-md">
      {/* {!isEditMode && (
        <div className="flex justify-end mb-4">
          <Button
            icon={<EditOutlined />}
            style={{ backgroundColor: primaryColor, color: "white", border: "none", padding: "6px 16px" }}
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </Button>
        </div>
      )} */}

      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="font-semibold text-gray-700">First Name</label>
          <CustomInput value={formData.firstName} onChange={handleChange("firstName")} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Last Name</label>
          <CustomInput value={formData.lastName} onChange={handleChange("lastName")} disabled={!isEditMode} />
        </Col>
      </Row>

      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="font-semibold text-gray-700">Email</label>
          <CustomInput value={formData.email} onChange={handleChange("email")} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Phone Number</label>
          <CustomInput value={formData.phone} onChange={handleChange("phone")} disabled={!isEditMode} />
        </Col>
      </Row>

      <Row gutter={24} className="mb-4">
        <Col span={12}>
          <label className="font-semibold text-gray-700">Date of Birth</label>
          <CustomInput value={formData.dob} onChange={handleChange("dob")} disabled={!isEditMode} />
        </Col>
        <Col span={12}>
          <label className="font-semibold text-gray-700">Gender</label>
          <CustomInput value={formData.gender} onChange={handleChange("gender")} disabled={!isEditMode} />
        </Col>
      </Row>

      {/* <Row gutter={24} className="mb-4">
        <Col span={24}>
          <label className="font-semibold text-gray-700">Address</label>
          <CustomInput value={formData.address} onChange={handleChange("address")} disabled={!isEditMode} />
        </Col>
      </Row> */}

      {/* {isEditMode && (
        <div className="flex justify-end mt-4">
          <Button
            style={{ backgroundColor: "#FF4D4F", color: "white", border: "none", padding: "8px 16px", marginRight: "10px" }}
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: primaryColor, color: "white", border: "none", padding: "8px 16px" }}
            onClick={handleSave}
            loading={isUpdating}
          >
            Save
          </Button>
        </div>
      )} */}
    </Card>
  );
};

export default ProfileTab;
