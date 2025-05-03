import { Form, Input, message } from "antd";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

const Newpass = () => {
  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use the reset password mutation
  const [resetPassword] = useResetPasswordMutation();  

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowpassword(!showpassword);
  };

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    const data = {
      email: values.email,  // Email field
      newPassword: values.newPassword,  // New password field
    };

    try {
      // Call the API to reset the password
      const response = await resetPassword(data).unwrap();  // Using .unwrap() to get the response directly
      message.success("Password changed successfully!");
      navigate("/sign-in");  // Redirect to sign-in page after success
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between w-full gap-20 mx-auto md:max-w-screen-md md:flex-row">
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
                  <h2 className="mb-6 text-2xl font-bold text-center md:text-3xl">
                    Set a new password
                  </h2>
                </div>

                {/* Email Input Field */}
                <Form.Item
                  name="email"
                  label={<p className="text-md">Email: </p>}
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    style={{ padding: "6px" }}
                    className="text-md"
                    placeholder="Enter your email"
                  />
                </Form.Item>

                {/* New Password Input Field */}
                <Form.Item
                  name="newPassword"
                  label={<p className="text-md">New Password</p>}
                  rules={[
                    { required: true, message: "Please input your new password!" },
                    { min: 6, message: "Password must be at least 6 characters!" },
                  ]}
                >
                  <div className="relative flex items-center justify-between">
                    <Input
                      style={{ padding: "6px" }}
                      className="text-md"
                      type={showpassword ? "password" : "text"}
                      placeholder="Enter new password"
                    />
                    <div className="absolute right-0 flex items-center px-2">
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

                {/* Submit Button */}
                <Form.Item className="text-center">
                  <button
                    className="w-full p-2 px-10 py-2 font-semibold text-center text-white shadow-lg bg-primary rounded-2xl"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm"}
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="w-full md:w-[50%] px-3 text-center mt-20 md:mt-0">
            <p className="flex items-center justify-center text-neutral-500">
              Create a new password. Make sure it differs from the previous one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newpass;
