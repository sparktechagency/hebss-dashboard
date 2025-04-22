import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../../redux/features/auth/authApi';

const ForgatePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fotgotPassword,{isLoadoing,isError,error}] = useForgotPasswordMutation()

    const onFinish = async (values) => {
        setLoading(true);
        // Simulate sending reset email
        // setTimeout(() => {
        //     message.success('Reset instructions sent to your email!');
        //     setLoading(false);
        //     navigate('/verify-otp');
        // }, 1000);
        try {
            // Send the forgot password request
            const response = await forgotPassword({ email: values.email }).unwrap();
            message.success('Reset instructions sent to your email!');
            setLoading(false);
            navigate('/verify-otp');
        } catch (err) {
            message.error('Failed to send reset instructions. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center">Forgot Password</h2>
                <p className="mb-8 text-center text-gray-600">
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
                            className="w-full py-2 text-white rounded-lg bg-primary"
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