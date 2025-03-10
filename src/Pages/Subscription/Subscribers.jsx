import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SubscribersPage = () => {
  // Sample data for subscribers
  const [subscribers, setSubscribers] = useState([
    { id: 1, username: "john_doe", email: "john@example.com", subscribeDate: "2022-01-01" },
    { id: 2, username: "jane_doe", email: "jane@example.com", subscribeDate: "2022-02-15" },
    { id: 3, username: "susan_lee", email: "susan@example.com", subscribeDate: "2022-03-10" },
    { id: 4, username: "mark_smith", email: "mark@example.com", subscribeDate: "2022-04-21" },
    { id: 5, username: "lucas_wang", email: "lucas@example.com", subscribeDate: "2022-05-05" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
  });

//   const handleEdit = (subscriber) => {
//     setEditingSubscriber(subscriber);
//     setEditForm({
//       username: subscriber.username,
//       email: subscriber.email,
//     });
//     setIsModalVisible(true);
//   };

  const handleDelete = (id) => {
    setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id));
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleSaveChanges = () => {
    setSubscribers(
      subscribers.map((subscriber) =>
        subscriber.id === editingSubscriber.id
          ? { ...subscriber, ...editForm }
          : subscriber
      )
    );
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Subscribe Date", dataIndex: "subscribeDate", key: "subscribeDate" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          /> */}
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Subscribers</h2>

      {/* Table displaying the list of subscribers */}
      <Table
        columns={columns}
        dataSource={subscribers}
        rowKey="id"
        pagination={false}
      />

      {/* Edit Subscriber Modal */}
      <Modal
        title="Edit Subscriber"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleSaveChanges}
            style={{ backgroundColor: "#F37975" }}
          >
            Save Changes
          </Button>,
        ]}
      >
        <div>
          <Input
            value={editForm.username}
            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
            placeholder="Username"
            className="mb-4"
          />
          <Input
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            placeholder="Email"
          />
        </div>
      </Modal>
    </div>
  );
};

export default SubscribersPage;
