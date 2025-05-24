import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Input,
  Form,
  message,
  Row,
  Col,
  Upload,
  Avatar,
  Spin,
  Alert,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  useCreateTeamMemberMutation,
  useGetAllTeamMembersQuery,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} from "../../../redux/features/team/teamApi";

const TeamPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    data: fetchedTeamMembers,
    isLoading: isFetching,
    isError: isFetchError,
    error: fetchError,
  } = useGetAllTeamMembersQuery();

  const [createTeamMember, { isLoading: isCreating }] = useCreateTeamMemberMutation();
  const [updateTeamMember, { isLoading: isUpdating }] = useUpdateTeamMemberMutation();
  const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation();

  const teamMembers = fetchedTeamMembers?.data || [];

  const handleAddMember = () => {
    setIsEditing(false);
    setCurrentMember(null);
    form.resetFields();
    setImagePreview(null);
    setIsModalVisible(true);
  };

  const handleEditMember = (member) => {
    setIsEditing(true);
    setCurrentMember(member);
    form.setFieldsValue({
      name: member.name,
      email: member.email,
      position: member.position,
      description: member.description,
    });
    setImagePreview(member.image || null);
    setIsModalVisible(true);
  };

  const handleDeleteMember = async (memberId) => {
    if (!memberId) {
      message.error("Invalid member ID");
      return;
    }
    try {
      await deleteTeamMember(memberId).unwrap();
      message.success("Team member deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      const errMsg =
        error?.data?.error ||
        error?.data?.message ||
        error?.error ||
        "Failed to delete team member";
      message.error(errMsg);
    }
  };

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

  const handleFormSubmit = async (values) => {
    try {
      let imageFile = null;
      if (imagePreview && imagePreview.startsWith("data:")) {
        imageFile = dataURItoBlob(imagePreview);
      }

      const teamData = {
        ...values,
        image: imageFile,
        _id: isEditing ? currentMember._id : undefined,
      };

      if (isEditing) {
        await updateTeamMember(teamData).unwrap();
        message.success("Team member updated successfully");
      } else {
        await createTeamMember(teamData).unwrap();
        message.success("Team member added successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      setImagePreview(null);
    } catch (error) {
      console.error("Create/Update Error Details:", error);

      let errMsg = "Error creating/updating team member";

      if (error?.data?.message) errMsg = error.data.message;
      else if (error?.data?.error) errMsg = error.data.error;
      else if (error?.error) errMsg = error.error;
      else if (error?.message) errMsg = error.message;

      message.error(errMsg);
    }
  };

  const handleBeforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
    return false; // prevent automatic upload
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
            disabled={isCreating || isUpdating || isDeleting}
          >
            Add New Member
          </Button>
        </div>

        {isFetching && (
          <div className="p-10 text-center">
            <Spin size="large" tip="Loading team members..." />
          </div>
        )}

        {isFetchError && (
          <Alert
            type="error"
            message="Error loading team members"
            description={
              fetchError?.data?.message || fetchError?.error || "Unknown error"
            }
          />
        )}

        {!isFetching && !isFetchError && (
          <Row gutter={[16, 16]}>
            {teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <Col key={member._id} xs={24} sm={12} md={8} lg={6}>
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
                      <EditOutlined
                        key="edit"
                        onClick={() => handleEditMember(member)}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => handleDeleteMember(member._id)}
                        style={{ color: "red" }}
                        disabled={isDeleting}
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
        )}

        <Modal
          title={isEditing ? "Edit Team Member" : "Add New Team Member"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => form.submit()}
              loading={isCreating || isUpdating}
            >
              Save
            </Button>,
          ]}
          destroyOnClose
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
              rules={[{ required: !isEditing, message: "Please upload the image!" }]}
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
