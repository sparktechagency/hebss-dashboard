

import React, { useState } from "react";
import { Table, Button, Modal, Input, Form, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useCreateFaqMutation, useDeleteFaqMutation, useEditFaqMutation, useGetAllFaqQuery } from "../../../redux/features/faq/faqApi";

const FAQPage = () => {
  const { data: rawData, isLoading, isError, error, refetch } = useGetAllFaqQuery(); 
  const [deleteFaq] = useDeleteFaqMutation(); 
    const [createFaq] = useCreateFaqMutation();
  const [editFaq] = useEditFaqMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null);  // Store current FAQ being edited
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); 
  const [form] = Form.useForm();

  // Extract the FAQ data from the response
  const faqs = rawData?.data && Array.isArray(rawData.data) ? rawData.data : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }



  const handleFormSubmit = async (values) => {
    try {
      if (isEditing) {
        // Update FAQ
        await editFaq({ _id: currentFAQ._id, ...values }).unwrap();
        message.success("FAQ updated successfully");
      } else {
        // Add new FAQ
        await createFaq(values).unwrap();
        message.success("FAQ added successfully");
      }
      setIsModalVisible(false);
      refetch();  // Refetch data after a successful add or edit
    } catch (error) {
      message.error("Failed to save FAQ: " + error.message);
    }
  };

  const handleAddFAQ = () => {
    setIsEditing(false);
    setIsModalVisible(true);
    form.resetFields();  // Reset form for adding new FAQ
  };

  const handleEditFAQ = (faq) => {
    setIsEditing(true);
    setCurrentFAQ(faq);
    form.setFieldsValue(faq);  // Populate form with the selected FAQ's data
    setIsModalVisible(true);  // Open modal for editing
  };

  const handleDeleteFAQ = async (_id) => {
    try {
      await deleteFaq(_id).unwrap();  // Call deleteFAQ mutation
      message.success("FAQ deleted successfully");
      refetch();  // Refetch the data to update the table
    } catch (error) {
      message.error("Failed to delete FAQ: " + error.message);
    }
  };

  const handleViewAnswer = (faq) => {
    setCurrentFAQ(faq);
    setIsViewModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsViewModalVisible(false);
  };

  const modalFooter = [
    <Button key="cancel" onClick={handleCloseModal}>
      Cancel
    </Button>,
    <Button key="save" type="primary" onClick={() => form.submit()}>
      Save
    </Button>,
  ];

  const columns = [
    { title: "Question", dataIndex: "question", key: "question" },
    { title: "Answer", dataIndex: "answer", key: "answer" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => handleEditFAQ(record)} // Edit action
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteFAQ(record._id)} // Delete action
            style={{ color: "red" }}
          />
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewAnswer(record)} // View action
            style={{ color: "#1890ff", marginLeft: 8 }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">FAQs</h2>
          <Button
            type="primary"
            onClick={handleAddFAQ}
            style={{ backgroundColor: "#FF4D4F", color: "white" }}
          >
            Add New FAQ
          </Button>
        </div>

        {/* FAQ Table */}
        <Table
          columns={columns}
          dataSource={faqs}
          pagination={false}
          rowKey={(record) => record._id}  // Use `_id` as the row key
        />

        {/* Modal for Adding/Editing FAQ */}
        <Modal
          title={isEditing ? "Edit FAQ" : "Add New FAQ"}
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={modalFooter}
        >
          <Form
            form={form}
            onFinish={handleFormSubmit}
            layout="vertical"
            initialValues={{ question: "", answer: "" }}
          >
            <Form.Item
              name="question"
              label="Question"
              rules={[{ required: true, message: "Please input the question!" }]}
            >
              <Input placeholder="Enter FAQ question" />
            </Form.Item>

            <Form.Item
              name="answer"
              label="Answer"
              rules={[{ required: true, message: "Please input the answer!" }]}
            >
              <Input.TextArea placeholder="Enter FAQ answer" rows={4} />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for Viewing FAQ Answer */}
        <Modal
          title="FAQ Answer"
          visible={isViewModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        >
          <h3>{currentFAQ?.question}</h3>
          <p>{currentFAQ?.answer}</p>
        </Modal>
      </div>
    </div>
  );
};

export default FAQPage;

