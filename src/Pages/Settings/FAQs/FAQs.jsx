import React, { useState } from "react";
import { Table, Button, Modal, Input, Form, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([
    { key: "1", question: "What is your service?", answer: "We provide tech support." },
    { key: "2", question: "How can I contact support?", answer: "You can contact us through email." },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null); // Store the FAQ to edit
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); // Modal visibility for view
  const [form] = Form.useForm();

  // Handle form submission (Add or Edit FAQ)
  const handleFormSubmit = (values) => {
    if (isEditing) {
      // Update FAQ
      setFaqs(faqs.map(faq => faq.key === currentFAQ.key ? { ...faq, ...values } : faq));
      message.success("FAQ updated successfully");
    } else {
      // Add new FAQ
      const newFAQ = { key: faqs.length + 1, ...values };
      setFaqs([...faqs, newFAQ]);
      message.success("FAQ added successfully");
    }
    setIsModalVisible(false);
  };

  // Open modal for adding new FAQ
  const handleAddFAQ = () => {
    setIsEditing(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  // Open modal for editing FAQ
  const handleEditFAQ = (faq) => {
    setIsEditing(true);
    setCurrentFAQ(faq);
    form.setFieldsValue(faq);
    setIsModalVisible(true);
  };

  // Handle deleting an FAQ
  const handleDeleteFAQ = (key) => {
    setFaqs(faqs.filter(faq => faq.key !== key));
    message.success("FAQ deleted successfully");
  };

  // Open the View Answer modal
  const handleViewAnswer = (faq) => {
    setCurrentFAQ(faq);
    setIsViewModalVisible(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsViewModalVisible(false);
  };

  // Modal footer buttons
  const modalFooter = [
    <Button key="cancel" onClick={handleCloseModal}>
      Cancel
    </Button>,
    <Button key="save" type="primary" onClick={() => form.submit()}>
      Save
    </Button>,
  ];

  // Columns for the FAQ table
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
            onClick={() => handleEditFAQ(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteFAQ(record.key)}
            style={{ color: "red" }}
          />
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewAnswer(record)}
            style={{ color: "#1890ff", marginLeft: 8 }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
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
          rowKey="key"
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
