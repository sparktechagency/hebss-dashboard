import React, { useState } from "react";
import { Card, Button, Modal, Form, Input, Select, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriptionMutation, useDeleteSubscriptionMutation, useEditSubscriptionMutation, useGetAllSubscriptionQuery } from "../../redux/features/subscription/subscriptionApi";

const SubscriptionPage = () => {
  // Fetch subscriptions using useGetAllSubscriptionQuery
  const { data: rawSubscriptions, isLoading, isError, error } = useGetAllSubscriptionQuery();
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const [editSubscription] = useEditSubscriptionMutation();

  // Ensure subscriptions is always an array
  const subscriptions = Array.isArray(rawSubscriptions?.data) ? rawSubscriptions.data : [];

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [createSubscription] = useCreateSubscriptionMutation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [editingSubscription, setEditingSubscription] = useState(null);
  const navigate = useNavigate();
  const primaryColor = "#F37975";

  // Handle the delete subscription
  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id).unwrap();
      message.success("Subscription deleted successfully");
    } catch (error) {
      message.error("Failed to delete subscription: " + error.message);
    }
  };

  // Handle editing a subscription
  const handleEdit = (subscription) => {
    setEditingSubscription(subscription); // Set the subscription being edited
    setFeatures(subscription.features); // Set the existing features for editing
    editForm.setFieldsValue({
      title: subscription.name,
      chargeType: subscription.type,
      price: subscription.price.amount,
    });
    setIsEditModalVisible(true); // Open the edit modal
  };

  // Add feature to a subscription
  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      setFeatures([...features, featureInput]);
      setFeatureInput("");
    }
  };

  // Remove feature from subscription
  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Add new subscription to backend
  const handleAddSubscription = async (values) => {
    const newSubscription = {
      name: values.title,
      price: { amount: values.price },
      type: values.chargeType.toLowerCase(),
      features: features,
    };

    try {
      // Call the create subscription API
      await createSubscription(newSubscription).unwrap();
      message.success("Subscription created successfully!");
      setIsAddModalVisible(false);
      form.resetFields();
      setFeatures([]);
    } catch (error) {
      console.error("Error details:", error);
      if (error?.data) {
        message.error(`Failed to create subscription: ${error.data.message || "Unknown error"}`);
      } else {
        message.error("Failed to create subscription: Unknown error");
      }
    }
  };

  // Handle editing the subscription
  const handleEditSubscription = async (values) => {
    if (!editingSubscription) {
      message.error("No subscription selected for editing.");
      return;
    }

    const updatedData = {
      name: values.title,
      chargeType: values.chargeType,
      price: { amount: values.price },
      features: features,
    };

    try {
      await editSubscription({ _id: editingSubscription._id, data: updatedData }).unwrap();
      message.success("Subscription updated successfully!");
      setIsEditModalVisible(false);
      setFeatures([]);
      editForm.resetFields();
    } catch (error) {
      message.error("Failed to update subscription: " + error.message);
    }
  };

  // Check loading state and errors
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  // Navigate to SubscribersPage when UsergroupAddOutlined is clicked
  const handleSubscribersClick = (subscriptionId) => {
    navigate(`/subscription/subscribers/${subscriptionId}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Subscriptions</h2>
        <Button
          type="primary"
          className="border-none"
          style={{ backgroundColor: primaryColor }}
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalVisible(true)}
        >
          Add New
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {subscriptions?.map((sub) => (
          <Card
            key={sub._id}
            className="relative p-6 bg-white border border-gray-200 shadow-lg rounded-xl"
          >


      {/* subscribers  Edit Delete  */}
      
             <div className="absolute flex gap-2 top-4 right-4">
              
              <UsergroupAddOutlined
                className="text-gray-500 cursor-pointer hover:text-gray-700 "  
                onClick={() => handleSubscribersClick(sub._id)} // Navigate to subscribers page with subscription ID
              />
              <EditOutlined
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => handleEdit(sub)}
              />
              <DeleteOutlined
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleDelete(sub._id)}
              />
            </div>


       
            <h3 className="text-xl font-bold text-center text-gray-800">{sub.name}</h3>
            <p className="text-sm text-center text-gray-500">{sub.type}</p>
            <p className="my-4 text-3xl font-bold text-center text-gray-900">
              ${sub.price.amount} {sub.price.currency}
            </p>
            <ul className="text-sm text-center text-gray-700">
              {sub.features.map((feature, index) => (
                <li key={index} className="py-1">{feature}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Add New Subscription Modal */}
      <Modal
        title="Add New Subscription"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddSubscription}>
          <Form.Item label="Subscription Name" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Charge Type" name="chargeType">
            <Select>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="yearly">Yearly</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Features">
            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
              />
              <Button onClick={handleAddFeature} style={{ backgroundColor: primaryColor, color: "white" }}>
                Add
              </Button>
            </div>
            <ul className="mt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex justify-between p-1 border-b">
                  {feature}
                  <Button type="text" danger onClick={() => handleRemoveFeature(index)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full border-none"
              style={{ backgroundColor: primaryColor }}
            >
              Add Subscription
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Subscription Modal */}
      <Modal
        title="Edit Subscription"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubscription}>
          <Form.Item label="Subscription Name" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Charge Type" name="chargeType">
            <Select>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="yearly">Yearly</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Features">
            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
              />
              <Button onClick={handleAddFeature} style={{ backgroundColor: primaryColor, color: "white" }}>
                Add
              </Button>
            </div>
            <ul className="mt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex justify-between p-1 border-b">
                  {feature}
                  <Button type="text" danger onClick={() => handleRemoveFeature(index)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full border-none"
              style={{ backgroundColor: primaryColor }}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionPage;
