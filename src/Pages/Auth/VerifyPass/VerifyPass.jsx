import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyOtpMutation } from '../../../redux/features/auth/authApi';
import { setVerificationEmail } from '../../../redux/features/auth/authSlice';

const VerifyPass = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Retrieve the email stored in Redux for OTP verification
    const email = useSelector((state) => state.auth.verificationEmail);
    
    // Log to check if email is retrieved correctly
    console.log("Retrieved email from Redux:", email);
    
    // Use the verifyOtp mutation
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

    // Check if email is available before allowing OTP verification
    useEffect(() => {
        if (!email) {
            message.error('Email not found. Please request an OTP first.');
            navigate('/forgot-password'); // Navigate to forgot password page
        }
    }, [email, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { otp } = values;

            // Log the email and OTP before making the API call
            console.log('Submitting OTP verification with email:', email, ' and OTP:', otp);

            // Construct the request body to ensure email and OTP are included
            const requestBody = { email,  otp };
            
            console.log('Request body being sent:', requestBody);  // Log the request body for debugging

            // Trigger the API call to verify the OTP
            const response = await verifyOtp(requestBody).unwrap();

            // Log the response for debugging
            console.log("OTP verify response:", response);

            // If successful, navigate to the new password page
            message.success('OTP verified successfully!');
            setLoading(false);
            navigate('/new-password');
        } catch (error) {
            // Log the error for debugging
            console.error("Error verifying OTP:", error);

            // Log the full error data to inspect the response
            if (error?.data) {
                console.error("Backend error data:", error.data);
                message.error(error.data?.error || 'Failed to verify OTP. Please try again.');
            } else {
                message.error('Failed to verify OTP. Please try again.');
            }

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

                <Form
                    name="verifyOTP"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="otp"
                        rules={[
                            { required: true, message: 'Please input your OTP!' },
                            { len: 4, message: 'OTP must be exactly 4 digits!' },
                        ]}
                    >
                        <Input
                            placeholder="Enter 6-digit OTP"
                            className="py-2"
                            maxLength={4}
                        />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type="submit"
                            className="w-full py-2 text-white rounded-lg bg-primary"
                            disabled={loading || isLoading} // Disable button when loading
                        >
                            {loading || isLoading ? "Verifying..." : "Verify OTP"}
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
