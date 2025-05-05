import React, { useState } from "react";
import { Button, Card, Modal, Input, Form, message, Row, Col, Upload, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useCreateTeamMemberMutation } from "../../../redux/features/team/teamApi";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      key: "1",
      name: "Fahad Hossain",
      email: "fahadhossain0503@gmail.com",
      position: "Software Engineer",
      description: "Founder of the company",
      image: "https://via.placeholder.com/150", 
    },
    {
      key: "2",
      name: "Eanara Ghouleh",
      email: "eanara_ghouleh@gmail.com",
      position: "Founders",
      description: "Founder of the company",
      image: "https://via.placeholder.com/150", 
    },
    {
      key: "3",
      name: "Khader Zahdan",
      email: "khade_zahdank@gmail.com",
      position: "CEO",
      description: "Chief Executive Officer",
      image: "https://via.placeholder.com/150", 
    },
    {
      key: "4",
      name: "Heba Morad",
      email: "heba_morad@kunde.us",
      position: "Chief Operating Officer",
      description: "Chief Operating Officer",
      image: "https://via.placeholder.com/150", 
    },
    {
      key: "5",
      name: "Nadean Ghouleh",
      email: "nadean_ghouleh@cremin.us",
      position: "Social Media and Logistics Coordinator",
      description: "Coordinator at Cremin",
      image: "https://via.placeholder.com/150", 
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null); 
  const [createTeamMember, { isLoading }] = useCreateTeamMemberMutation();  

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

  const handleFormSubmit = async (values) => {
    const image = imagePreview || values.image; 

    // Prepare the data for the API
    const teamData = { ...values, image };

    try {
      if (isEditing) {
        // If editing, send an update to the backend (you should define an API update endpoint)
        message.success("Team member updated successfully");
      } else {
        // Add new member via API
        await createTeamMember(teamData).unwrap();  // Call the API mutation
        message.success("Team member added successfully");
      }
      
      // Close the modal and reset form
      setIsModalVisible(false);
    } catch (error) {
      message.error("Error creating/updating team member");
    }
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
    reader.onload = (e) => setImagePreview(e.target.result); 
    reader.readAsDataURL(file);
    return false; 
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="">
        <div className="flex items-center justify-between mb-6">
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
                    src={member.image}  
                    style={{
                      borderRadius: "50%", 
                      border: "5px solid #fff", 
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    className="mx-auto mt-4"
                  />
                }
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEditMember(member)} />,
                  <DeleteOutlined key="delete" onClick={() => handleDeleteMember(member.key)} style={{ color: "red" }} />,
                ]}
                className="rounded-lg shadow-lg"
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
            <Button key="submit" type="primary" onClick={() => form.submit()} loading={isLoading}>
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
