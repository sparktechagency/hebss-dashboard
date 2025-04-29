import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const VerifyPass = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        // Simulate verification
        setTimeout(() => {
            message.success('OTP verified successfully!');
            setLoading(false);
            navigate('/new-password');
        }, 1000);
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Verify OTP</h2>
        <p className="mb-8 text-center text-gray-600">
          Please enter the OTP sent to your email
        </p>

                <Form
                    name="verifyOTP"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="otp"
                        rules={[
                            { required: true, message: 'Please input your OTP!' },
                            { len: 6, message: 'OTP must be exactly 6 digits!' }
                        ]}
                    >
                        <Input
                            placeholder="Enter 6-digit OTP"
                            className="py-2"
                            maxLength={6}
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
                        Didn't receive OTP?{' '}
                        <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() => {
                                message.info('New OTP sent to your email');
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
