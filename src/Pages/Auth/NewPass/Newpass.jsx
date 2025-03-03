import { Form, Input, message } from "antd";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Newpass = () => {
    const navigate = useNavigate();
    const [showpassword, setShowpassword] = useState(false);
    const [showConfirmpassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowpassword(!showpassword);
    };

    const toggoleConfirmPasswordVisible = () => {
        setShowConfirmPassword(!showConfirmpassword);
    };

    const onFinish = async (values) => {
        setLoading(true);
        const data = {
            email: values.email,
            newPassword: values.newPassword,
        };
        const confirmPassword = values.confirmPassword;

        // Simulate API call
        setTimeout(() => {
            if (data.newPassword !== confirmPassword) {
                message.error("Passwords do not match!");
            } else {
                message.success("Password changed successfully");
                navigate('/sign-in');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto">
                <div className="w-full md:max-w-screen-md mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
                    <div className="w-full md:w-[50%] order-2 md:order-1">
                        <div className="md:h-[100vh] w-full flex items-center justify-center">
                            <Form
                                name="reset-password"
                                initialValues={{ remember: true }}
                                style={{ maxWidth: 550 }}
                                onFinish={onFinish}
                                layout="vertical"
                                className="bg-white py-14 md:py-28 mx-4 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px] border-2 shadow-xl"
                            >
                                <div className="mb-4 text-center">
                                    <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
                                        Set a new password
                                    </h2>
                                </div>

                                <Form.Item
                                    name="email"
                                    label={<p className="text-md">Email: </p>}
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ]}
                                >
                                    <Input
                                        style={{ padding: "6px" }}
                                        className="text-md"
                                        placeholder="Enter your email"
                                    />
                                </Form.Item>

                                <Form.Item 
                                    name="newPassword" 
                                    label={<p className="text-md">New Password</p>}
                                    rules={[
                                        { required: true, message: 'Please input your new password!' },
                                        { min: 6, message: 'Password must be at least 6 characters!' }
                                    ]}
                                >
                                    <div className="flex justify-between items-center relative">
                                        <Input
                                            style={{ padding: "6px" }}
                                            className="text-md"
                                            type={showpassword ? "password" : "text"}
                                            placeholder="Enter new password"
                                        />
                                        <div className="flex items-center absolute right-0 px-2">
                                            <button onClick={togglePasswordVisibility} type="button">
                                                {showpassword ? (
                                                    <FaRegEyeSlash className="" />
                                                ) : (
                                                    <FaRegEye className="" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </Form.Item>

                                <Form.Item 
                                    name="confirmPassword" 
                                    label={<p className="text-md">Confirm Password</p>}
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <div className="flex justify-between items-center relative">
                                        <Input
                                            style={{ padding: "6px" }}
                                            className="text-md"
                                            type={showConfirmpassword ? "password" : "text"}
                                            placeholder="Confirm new password"
                                        />
                                        <div className="flex items-center absolute right-0 px-2">
                                            <button onClick={toggoleConfirmPasswordVisible} type="button">
                                                {showConfirmpassword ? (
                                                    <FaRegEyeSlash className="" />
                                                ) : (
                                                    <FaRegEye className="" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </Form.Item>

                                <Form.Item className="text-center">
                                    <button
                                        className="bg-primary text-center w-full p-2 font-semibold text-white px-10 py-2 rounded-2xl shadow-lg"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : 'Confirm'}
                                    </button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="w-full md:w-[50%] px-3 text-center mt-20 md:mt-0">
                        <p className="text-neutral-500 flex justify-center items-center">
                            Create a new password. Make sure it differs from the previous one.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newpass;