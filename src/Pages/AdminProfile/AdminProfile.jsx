import React, { useState } from "react";
import { Tabs, Button, Input, Form, message, Typography } from "antd";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useUpdateAdminMutation } from "../../redux/features/admin/adminApi";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/features/auth/authSlice"; // ✅ import

const { TabPane } = Tabs;

const AdminProfile = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ hooks
  const [changePassword] = useChangePasswordMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const dispatch = useDispatch();

  // ✅ Get user data from Redux authSlice
  const user = useSelector((state) => state.auth.user);

  // ✅ Initial form values
  const adminProfile = {
    fullName: user?.fullName,
    email: user?.email,
  };

  // ✅ Handle profile update
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const id = user?._id; // Ensure your auth slice has _id
      const payload = { fullName: values.fullName };

      const res = await updateAdmin({ id, data: payload }).unwrap();
      message.success(res.message || "Profile updated successfully!");

      // ✅ update Redux + localStorage immediately
      dispatch(updateUser({ fullName: values.fullName }));
    } catch (err) {
      console.error("Update error:", err);
      message.error(err?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle password change
  const onPasswordChange = async (values) => {
    if (values.newPassword === "") {
      message.error("New password cannot be empty!");
      return;
    }

    setLoading(true);
    const data = {
      email: values.email,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      const response = await changePassword(data).unwrap();
      message.success(response.message || "Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      message.error(error?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen py-10 mx-auto bg-gray-50">
      <div className="max-w-screen-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
        <Tabs defaultActiveKey="1" size="large" className="space-y-6">
          {/* Profile Tab */}
          <TabPane tab="Update Profile" key="1">
            <Typography.Title level={3} className="mb-6 text-center">
              Update Profile
            </Typography.Title>

            <Form
              name="updateProfile"
              onFinish={onFinish}
              initialValues={adminProfile}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item label="Full Name" name="fullName">
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="Enter your email" disabled />
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
            <Typography.Title level={3} className="mb-6 text-center">
              Change Password
            </Typography.Title>
            <Form
              name="changePassword"
              onFinish={onPasswordChange}
              layout="vertical"
              className="space-y-4"
            >
              {/* Email Field */}
              <Form.Item label="Email" name="email" required>
                <Input type="email" placeholder="Enter your email" />
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
