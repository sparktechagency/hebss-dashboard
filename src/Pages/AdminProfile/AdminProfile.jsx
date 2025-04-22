import React, { useState } from "react";
import { Tabs, Button, Input, Form, message, Typography, ConfigProvider } from "antd";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const { TabPane } = Tabs;

const AdminProfile = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock admin data for design
  const adminData = {
    name: "Admin User",
    email: "admin@example.com",
  };

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  const onPasswordChange = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Password changed successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container min-h-screen py-10 mx-auto bg-gray-50">
      <div className="max-w-screen-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
        {/* Tabs for Profile and Password */}
        <Tabs defaultActiveKey="1" size="large" className="space-y-6">
          {/* Profile Tab */}
          <TabPane tab="Update Profile" key="1">
            <Typography.Title level={3} className="mb-6 text-center">Update Profile</Typography.Title>
            <Form
              name="updateProfile"
              onFinish={onFinish}
              initialValues={adminData}
              layout="vertical"
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4">
                <ConfigProvider>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    className="mb-4"
                  >
                    <Input
                      placeholder="Enter your name"
                      className="border-red-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    />
                  </Form.Item>
                </ConfigProvider>
                <ConfigProvider>
                  <Form.Item
                    label="Email"
                    name="email"
                    className="mb-4"
                  >
                    <Input
                      placeholder="Enter your email"
                      className="border-red-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    />
                  </Form.Item>
                </ConfigProvider>
              </div>
              <div className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="px-6 py-2 text-white bg-red-500 rounded-md shadow-md hover:bg-red-600"
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          </TabPane>

          {/* Password Change Tab */}
          <TabPane tab="Change Password" key="2">
            <Typography.Title level={3} className="mb-6 text-center">Change Password</Typography.Title>
            <Form
              name="changePassword"
              onFinish={onPasswordChange}
              layout="vertical"
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    className="mb-4"
                  >
                    <div className="relative">
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter old password"
                        className="pr-10 border-red-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute transform -translate-y-1/2 right-2 top-1/2"
                      >
                        {showOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                  </Form.Item>
                </div>

                <div className="relative">
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    className="mb-4"
                  >
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="pr-10 border-red-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute transform -translate-y-1/2 right-2 top-1/2"
                      >
                        {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                  </Form.Item>
                </div>

                <div className="relative">
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    className="mb-4"
                  >
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="pr-10 border-red-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute transform -translate-y-1/2 right-2 top-1/2"
                      >
                        {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                  </Form.Item>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="px-6 py-2 text-white bg-red-500 rounded-md shadow-md hover:bg-red-600"
                >
                  Change Password
                </Button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProfile;
