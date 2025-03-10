import React, { useState } from "react";
import { Card, Button, Modal, Form, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UsergroupAddOutlined } from "@ant-design/icons"; // Import multi-user icon
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      title: "Basic",
      chargeType: "Monthly",
      price: "14.99",
      features: ["Free Setup", "Bandwidth Limit 10 GB", "20 User Connection"],
    },
    {
      id: 2,
      title: "Standard",
      chargeType: "Bimonthly",
      price: "16.99",
      features: ["Free Setup", "Bandwidth Limit 10 GB", "20 User Connection"],
    },
    {
      id: 3,
      title: "Premium",
      chargeType: "Quarterly",
      price: "18.99",
      features: ["Free Setup", "Bandwidth Limit 10 GB", "20 User Connection"],
    },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [editingSubscription, setEditingSubscription] = useState(null);
  const navigate = useNavigate();
  const primaryColor = "#F37975";

  const handleDelete = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setFeatures(subscription.features);
    editForm.setFieldsValue({
      title: subscription.title,
      chargeType: subscription.chargeType,
      price: subscription.price,
    });
    setIsEditModalVisible(true);
  };

  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      setFeatures([...features, featureInput]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddSubscription = (values) => {
    const newSub = {
      id: subscriptions.length + 1,
      title: values.title,
      chargeType: values.chargeType,
      price: values.price,
      features: features,
    };
    setSubscriptions([...subscriptions, newSub]);
    setIsAddModalVisible(false);
    form.resetFields();
    setFeatures([]);
  };

  const handleEditSubscription = (values) => {
    setSubscriptions(subscriptions.map((sub) =>
      sub.id === editingSubscription.id ? { ...sub, ...values, features } : sub
    ));
    setIsEditModalVisible(false);
    editForm.resetFields();
    setFeatures([]);
  };

  const handleSubscribersClick = (subscriptionId) => {
    navigate(`/subscription/subscribers`);
    // Here you can perform any action like opening a modal or navigating
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptions.map((sub) => (
          <Card
            key={sub.id}
            className="p-6 rounded-xl shadow-lg bg-white relative border border-gray-200"
          >
            <div className="absolute top-4 right-4 flex gap-2">
              <UsergroupAddOutlined
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => handleSubscribersClick(sub.id)} // Handle the subscribers button click
              />
              <EditOutlined
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => handleEdit(sub)}
              />
              <DeleteOutlined
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(sub.id)}
              />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800">
              {sub.title}
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {sub.chargeType}
            </p>
            <p className="text-3xl font-bold text-gray-900 text-center my-4">
              ${sub.price}
            </p>
            <ul className="text-center text-gray-700 text-sm">
              {sub.features.map((feature, index) => (
                <li key={index} className="py-1">
                  {feature}
                </li>
              ))}
            </ul>
            {/* <Button
              type="primary"
              className="mt-4 w-full"
              style={{ backgroundColor: primaryColor }}
            >
              Subscribers
            </Button> */}
          </Card>
        ))}
      </div>

      {/* add modal */}
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
              <Select.Option value="Monthly">Monthly</Select.Option>
              <Select.Option value="Bimonthly">Bimonthly</Select.Option>
              <Select.Option value="Quarterly">Quarterly</Select.Option>
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
              <Button
                onClick={handleAddFeature}
                style={{ backgroundColor: primaryColor, color: "white" }}
              >
                Add
              </Button>
            </div>
            <ul className="mt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex justify-between p-1 border-b">
                  {feature}
                  <Button
                    type="text"
                    danger
                    onClick={() => handleRemoveFeature(index)}
                  >
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

      {/* edit modal */}
      <Modal
        title="Edit Subscription"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubscription}
        >
          <Form.Item label="Subscription Name" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Charge Type" name="chargeType">
            <Select>
              <Select.Option value="Monthly">Monthly</Select.Option>
              <Select.Option value="Bimonthly">Bimonthly</Select.Option>
              <Select.Option value="Quarterly">Quarterly</Select.Option>
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
              <Button
                onClick={handleAddFeature}
                style={{ backgroundColor: primaryColor, color: "white" }}
              >
                Add
              </Button>
            </div>
            <ul className="mt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex justify-between p-1 border-b">
                  {feature}
                  <Button
                    type="text"
                    danger
                    onClick={() => handleRemoveFeature(index)}
                  >
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
