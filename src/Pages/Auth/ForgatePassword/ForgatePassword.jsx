import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForgatePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        // Simulate sending reset email
        setTimeout(() => {
            message.success('Reset instructions sent to your email!');
            setLoading(false);
            navigate('/verify-otp');
        }, 1000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
                <p className="text-gray-600 text-center mb-8">
                    Enter your email address to receive password reset instructions
                </p>

                <Form
                    name="forgotPassword"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            placeholder="Enter your email"
                            className="py-2"
                        />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Instructions'}
                        </button>
                    </Form.Item>

                    <p className="text-center text-gray-600">
                        Remember your password?{' '}
                        <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default ForgatePassword;