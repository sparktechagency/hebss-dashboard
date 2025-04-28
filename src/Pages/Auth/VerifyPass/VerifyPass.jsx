import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../../redux/features/auth/authApi";
import { useSelector } from "react-redux";

const VerifyPass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
    // ✅ Get email from Redux
    const email = useSelector((state) => state.auth.verificationEmail);
  
  const [verifyOtp] = useVerifyOtpMutation(); // ✅ API mutation hook


  const onFinish = async (values) => {
    if (!email) {
      message.error("Email is missing for verification!");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({
        email: email,
        code: values.otp,
      }).unwrap();

      console.log(res); // ✅ check response
      message.success("OTP verified successfully!");
      navigate("/new-password"); // ✅ redirect to reset password page
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Verify OTP</h2>
        <p className="mb-8 text-center text-gray-600">
          Please enter the OTP sent to your email
        </p>

        <Form name="verifyOTP" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "Please input your OTP!" },
              { len: 4, message: "OTP must be exactly 6 digits!" },
            ]}
          >
            <Input
              placeholder="Enter 4-digit OTP"
              className="py-2"
              maxLength={4}
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full py-2 text-white rounded-lg bg-primary"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </Form.Item>

          <p className="text-center text-gray-600">
            Didn't receive OTP?{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => {
                message.info("New OTP sent to your email"); 
                // In real app, call resend API here
              }}
            >
              Resend
            </button>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default VerifyPass;
