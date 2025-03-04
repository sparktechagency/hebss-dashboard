import React, { useState } from "react";
import { Button, Card, Modal, Input, Form, message, Row, Col, Upload, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { AllImages } from "../../../assets/image/AllImages";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      key: "1",
      name: "Fahad Hossain",
      email: "fahadhossain0503@gmail.com",
      position: "Software Engineer",
      description: "Founder of the company",
      image: "https://via.placeholder.com/150", // Replace with actual uploaded image
    },
    {
      key: "2",
      name: "Eanara Ghouleh",
      email: "eanara_ghouleh@gmail.com",
      position: "Founders",
      description: "Founder of the company",
      image: "https://via.placeholder.com/150", // Replace with actual uploaded image
    },
    {
      key: "3",
      name: "Khader Zahdan",
      email: "khade_zahdank@gmail.com",
      position: "CEO",
      description: "Chief Executive Officer",
      image: "https://via.placeholder.com/150", // Replace with actual uploaded image
    },
    {
      key: "4",
      name: "Heba Morad",
      email: "heba_morad@kunde.us",
      position: "Chief Operating Officer",
      description: "Chief Operating Officer",
      image: "https://via.placeholder.com/150", // Replace with actual uploaded image
    },
    {
      key: "5",
      name: "Nadean Ghouleh",
      email: "nadean_ghouleh@cremin.us",
      position: "Social Media and Logistics Coordinator",
      description: "Coordinator at Cremin",
      image: "https://via.placeholder.com/150", // Replace with actual uploaded image
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null); // For preview

  const handleAddMember = () => {
    setIsEditing(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEditMember = (member) => {
    setIsEditing(true);
    setCurrentMember(member);
    form.setFieldsValue(member);
    setIsModalVisible(true);
  };

  const handleDeleteMember = (key) => {
    setTeamMembers(teamMembers.filter((member) => member.key !== key));
    message.success("Team member deleted successfully");
  };

  const handleFormSubmit = (values) => {
    if (isEditing) {
      setTeamMembers(
        teamMembers.map((member) =>
          member.key === currentMember.key ? { ...member, ...values } : member
        )
      );
      message.success("Team member updated successfully");
    } else {
      const newMember = { key: teamMembers.length + 1, ...values };
      setTeamMembers([...teamMembers, newMember]);
      message.success("Team member added successfully");
    }
    setIsModalVisible(false);
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      message.success("Image uploaded successfully");
    } else if (info.file.status === "error") {
      message.error("Image upload failed.");
    }
  };

  const handleBeforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result); // Set the preview image
    reader.readAsDataURL(file);
    return false; // Prevents upload action from happening immediately
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Team Management</h2>
          <Button
            type="primary"
            onClick={handleAddMember}
            style={{ backgroundColor: "#FF4D4F", color: "white" }}
          >
            Add New Member
          </Button>
        </div>

        {/* Team Members Cards */}
        <Row gutter={[16, 16]}>
          {teamMembers.map((member) => (
            <Col key={member.key} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <Avatar
                    size={100}
                    src={AllImages.user}
                    style={{
                      borderRadius: "50%", // Ensures the image is circular
                      border: "5px solid #fff", // Adds white border around the image
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect for depth
                    }}
                    className="mx-auto mt-4"
                  />
                }
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => handleEditMember(member)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDeleteMember(member.key)}
                    style={{ color: "red" }}
                  />,
                ]}
                className="shadow-lg rounded-lg"
              >
                <Card.Meta
                  title={member.name}
                  description={
                    <div>
                      <p>{member.position}</p>
                      <p>{member.email}</p>
                      <p>{member.description}</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for Adding/Editing Team Member */}
        <Modal
          title={isEditing ? "Edit Team Member" : "Add New Team Member"}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Save
            </Button>,
          ]}
        >
          <Form
            form={form}
            onFinish={handleFormSubmit}
            layout="vertical"
            initialValues={{
              name: "",
              email: "",
              position: "",
              description: "",
              image: "",
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: "Please input the position!" }]}
            >
              <Input placeholder="Enter position" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input the description!" }]}
            >
              <Input.TextArea placeholder="Enter description" rows={4} />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image"
              rules={[{ required: true, message: "Please upload the image!" }]}
            >
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={handleBeforeUpload}
                onChange={handleImageChange}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TeamPage;
