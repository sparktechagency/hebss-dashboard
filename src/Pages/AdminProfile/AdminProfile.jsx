import React, { useState } from "react";
import { Tabs, Button, Input, Form, message, Typography, ConfigProvider } from "antd";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const AdminProfile = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use the change password mutation
  const [changePassword] = useChangePasswordMutation();  



    // ✅ Get user data from Redux authSlice
    const user = useSelector((state) => state.auth.user);
   
  

  
    // ✅adminProfile based on logged-in user
    const adminProfile = {
      name: user?.fullName ,
      email: user?.email ,
      role: "admin", // If you store role in user, replace "admin" with user.role
    };
  

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  // Handle password change form submission
  const onPasswordChange = async (values) => {
    if (values.newPassword === "") {
      message.error("New password can not be empty!");
      return;
    }

    setLoading(true);

    // Prepare the data to send to the backend
    const data = {
      email: values.email, 
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      // Call the API to change the password
      const response = await changePassword(data).unwrap();  // Using .unwrap() to get the response directly
      message.success("Password changed successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Failed to change password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen py-10 mx-auto bg-gray-50">
      <div className="max-w-screen-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
        <Tabs defaultActiveKey="1" size="large" className="space-y-6">
          {/* Profile Tab */}
          <TabPane tab="Update Profile" key="1">
            <Typography.Title level={3} className="mb-6 text-center">Update Profile</Typography.Title>

            <Form
              name="updateProfile"
              onFinish={onFinish}
              initialValues={adminProfile}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item label="Full Name" name="name">
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="Enter your email" />
              </Form.Item>
              <div className="flex justify-end">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update Profile
                </Button>
              </div>
            </Form>

          </TabPane>

          {/* Change Password Tab */}
          <TabPane tab="Change Password" key="2">
            <Typography.Title level={3} className="mb-6 text-center">Change Password</Typography.Title>
            <Form
              name="changePassword"
              onFinish={onPasswordChange}
              layout="vertical"
              className="space-y-4"
            >
              {/* Email Field */}
              <Form.Item label="Email" name="email" required>
                <Input
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Item>

              {/* Old Password Field */}
              <Form.Item label="Old Password" name="oldPassword" required>
                <div className="relative">
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter old password"
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

              {/* New Password Field */}
              <Form.Item label="New Password" name="newPassword" required>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
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

              <div className="flex justify-end">
                <Button type="primary" htmlType="submit" loading={loading}>
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
