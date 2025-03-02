import { Form, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useVerifyOtpMutation } from "../../../redux/features/auth/authApi";
const VerifyPass = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [verifyOtp] = useVerifyOtpMutation();

    const onFinish = (values) => {
        try {
            const data = {
                email: location.state.email,
                otp: values.otp
            }
            const response = verifyOtp({ data }).unwrap();

            if (!response) {
                message.error("Email not found!");
            } else {
                message.success("Login Successfully!");
                navigate('/new-password');
            }

        } catch (error) {
            console.log(error);
        }
    };
    const handleResendotp = () => {

    }


    return (
        <div className="bg-white">
            <div className="container mx-auto">
                <div className="w-full md:max-w-screen-md mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
                    <div className="w-full md:w-[50%] order-2 md:order-1">
                        <div className=" md:h-[100vh] w-full flex items-center justify-center ">
                            <Form
                                name="varify-password"
                                initialValues={{ remember: true }}
                                style={{ maxWidth: 550 }}
                                onFinish={onFinish}
                                layout="vertical"
                                className=" bg-white py-10 md:py-28 mx-4 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px] border-2 shadow-xl"
                            >
                                <div className="mb-4 text-center">
                                    <h2
                                        className=" text-center text-2xl md:text-3xl font-bold mb-6"
                                    >
                                        Verification Code
                                    </h2>

                                </div>

                                <Form.Item
                                    name="otp"
                                    label={""}
                                >
                                    <div className="flex justify-center items-center  my-10">
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={4}
                                            renderSeparator={<span className="lg:w-5 "> </span>}
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    className="w-8 h-8 bg-transparent border border-primary rounded-md text-xl mx-1 "
                                                />
                                            )}
                                        />
                                    </div>

                                </Form.Item>


                                <Form.Item className="text-center">

                                    <button
                                        className="bg-primary text-center w-full  p-2 font-semibold text-white px-10 py-2 rounded-2xl shadow-lg"
                                        type="submit"
                                    >
                                        Varify Code
                                    </button>

                                </Form.Item>
                                <p className="my-5 text-center text-neutral-500"> You have not received the email? <span onClick={handleResendotp} className="text-primary cursor-pointer">  Resend</span> </p>
                            </Form>
                        </div>

                    </div>
                    <div className="w-full md:w-[50%] px-3 text-center mt-20 md:mt-0 order-1 md:order-2">

                        <p className="text-neutral-500 flex justify-center items-center ">Welcome to out forgot password page !
                            provide your email for
                            confirm 4 digit verification code.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyPass;