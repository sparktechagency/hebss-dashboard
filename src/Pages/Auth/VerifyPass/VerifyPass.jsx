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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
                <p className="text-gray-600 text-center mb-8">
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
                            className="w-full bg-primary text-white py-2 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
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