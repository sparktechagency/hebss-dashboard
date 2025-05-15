import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Input, Form, message, Row, Col, Upload, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useCreateTeamMemberMutation, useGetAllTeamMembersQuery } from "../../../redux/features/team/teamApi";

const TeamPage = () => {
  // State for team members list
  const [teamMembers, setTeamMembers] = useState([]);

  // Modal and form states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);

  // RTK Query hooks
  const { data: fetchedTeamMembers, isLoading: isFetching } = useGetAllTeamMembersQuery();
  const [createTeamMember, { isLoading }] = useCreateTeamMemberMutation();

  // Update teamMembers state when data is fetched
  useEffect(() => {
    if (fetchedTeamMembers) {
      // Adjust based on your API response shape - assume data array is under 'data'
      setTeamMembers(fetchedTeamMembers.data || []);
    }
  }, [fetchedTeamMembers]);

  // Add new member modal handler
  const handleAddMember = () => {
    setIsEditing(false);
    setCurrentMember(null);
    form.resetFields();
    setImagePreview(null);
    setIsModalVisible(true);
  };

  // Edit member modal handler
  const handleEditMember = (member) => {
    setIsEditing(true);
    setCurrentMember(member);
    form.setFieldsValue(member);
    setImagePreview(null);
    setIsModalVisible(true);
  };

  // Delete member handler (update state locally for now)
  const handleDeleteMember = (key) => {
    setTeamMembers(teamMembers.filter((member) => member.key !== key));
    message.success("Team member deleted successfully");
  };

  // Convert Base64 image to Blob for upload
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Form submit handler
  const handleFormSubmit = async (values) => {
    try {
      let imageFile = null;
      if (imagePreview) {
        imageFile = dataURItoBlob(imagePreview);
      }

      const teamData = {
        ...values,
        image: imageFile,
      };

      if (isEditing) {
        // TODO: Implement update logic if needed
        message.success("Team member updated successfully");
      } else {
        await createTeamMember(teamData).unwrap();
        message.success("Team member added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
      setImagePreview(null);
    } catch (error) {
      console.error("Error:", error);
      message.error("Error creating/updating team member");
    }
  };

  // Upload handlers for image preview and preventing auto upload
  const handleBeforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      message.success("Image uploaded successfully");
    } else if (info.file.status === "error") {
      message.error("Image upload failed.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div>
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
          {Array.isArray(teamMembers) && teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <Col key={member._id || member.key} xs={24} sm={12} md={8} lg={6}>
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
                    <DeleteOutlined
                      key="delete"
                      onClick={() => handleDeleteMember(member._id || member.key)}
                      style={{ color: "red" }}
                    />,
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
            ))
          ) : (
            <p>No team members found.</p>
          )}
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
            <Button
              key="submit"
              type="primary"
              onClick={() => form.submit()}
              loading={isLoading}
            >
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
