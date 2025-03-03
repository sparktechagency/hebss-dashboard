import { ConfigProvider, Input, Form, message } from "antd";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const AdminProfile = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Mock admin data for design
    const adminData = {
        name: "Admin User",
        email: "admin@example.com",
        phone: "+1234567890",
        address: "123 Admin Street"
    };

    const onFinish = (values) => {
        setLoading(true);
        // Simulate update
        setTimeout(() => {
            message.success("Profile updated successfully!");
            setLoading(false);
        }, 1000);
    };

    const onPasswordChange = (values) => {
        setLoading(true);
        // Simulate password change
        setTimeout(() => {
            message.success("Password changed successfully!");
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-lg p-6 md:p-10 mt-5">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
                    <div>
                        <Form
                            name="updateProfile"
                            onFinish={onFinish}
                            initialValues={adminData}
                            layout="vertical"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ConfigProvider>
                                    <Form.Item
                                        label={<p className="text-md">Name</p>}
                                        name="name"
                                    >
                                        <Input
                                            style={{ padding: "6px" }}
                                            placeholder="Enter your name"
                                            className="text-md"
                                        />
                                    </Form.Item>
                                </ConfigProvider>

                                <ConfigProvider>
                                    <Form.Item
                                        label={<p className="text-md">Email</p>}
                                        name="email"
                                    >
                                        <Input
                                            style={{ padding: "6px" }}
                                            placeholder="Enter your email"
                                            className="text-md"
                                        />
                                    </Form.Item>
                                </ConfigProvider>

                                <ConfigProvider>
                                    <Form.Item
                                        label={<p className="text-md">Phone</p>}
                                        name="phone"
                                    >
                                        <Input
                                            style={{ padding: "6px" }}
                                            placeholder="Enter your phone"
                                            className="text-md"
                                        />
                                    </Form.Item>
                                </ConfigProvider>

                                <ConfigProvider>
                                    <Form.Item
                                        label={<p className="text-md">Address</p>}
                                        name="address"
                                    >
                                        <Input
                                            style={{ padding: "6px" }}
                                            placeholder="Enter your address"
                                            className="text-md"
                                        />
                                    </Form.Item>
                                </ConfigProvider>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-primary text-white px-6 py-2 rounded-lg"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Update Profile
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                    <div>
                        <Form
                            name="changePassword"
                            onFinish={onPasswordChange}
                            layout="vertical"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Form.Item
                                        label={<p className="text-md">Old Password</p>}
                                        name="oldPassword"
                                    >
                                        <div className="relative">
                                            <Input
                                                type={showOldPassword ? "text" : "password"}
                                                style={{ padding: "6px" }}
                                                placeholder="Enter old password"
                                                className="text-md pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowOldPassword(!showOldPassword)}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                            >
                                                {showOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>
                                        </div>
                                    </Form.Item>
                                </div>

                                <div className="relative">
                                    <Form.Item
                                        label={<p className="text-md">New Password</p>}
                                        name="newPassword"
                                    >
                                        <div className="relative">
                                            <Input
                                                type={showNewPassword ? "text" : "password"}
                                                style={{ padding: "6px" }}
                                                placeholder="Enter new password"
                                                className="text-md pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                            >
                                                {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>
                                        </div>
                                    </Form.Item>
                                </div>

                                <div className="relative">
                                    <Form.Item
                                        label={<p className="text-md">Confirm Password</p>}
                                        name="confirmPassword"
                                    >
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                style={{ padding: "6px" }}
                                                placeholder="Confirm new password"
                                                className="text-md pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                            >
                                                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-primary text-white px-6 py-2 rounded-lg"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Change Password
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
