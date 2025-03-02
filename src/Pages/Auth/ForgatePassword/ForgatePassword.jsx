import { Form, Input, message } from "antd";
import { useForgatePasswordMutation } from "../../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
const ForgatePassword = () => {
    const navigate = useNavigate()
    const [forgatePassword] = useForgatePasswordMutation()
    const onFinish = (values) => {
        try {
            const email = values.email;
            const response = forgatePassword(email).unwrap();
            if (!response) {
                message.error("Email not found");
            } else {
                message.success("OTP sent successfully");
                navigate('/varification', { state: { email } });
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto">
                <div className="w-full md:max-w-screen-md mx-auto flex flex-col md:flex-row justify-between items-center gap-20  ">

                    <div className="w-full md:w-[50%] order-2 md:order-1 ">
                        <div className=" md:py-0 md:h-[100vh] w-full flex items-center justify-center">
                            <Form
                                name="forget-password"
                                initialValues={{ remember: true }}
                                style={{ maxWidth: 550 }}
                                onFinish={onFinish}
                                layout="vertical"
                                className=" bg-white py-10 md:py-28 mx-2 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px] border-2 shadow-xl"
                            >
                                <div className="mb-4 text-center">
                                    <h2
                                        className=" text-center text-2xl md:text-3xl font-bold mb-6"
                                    >
                                        Forget Password
                                    </h2>

                                </div>

                                <Form.Item
                                    name="email"
                                    label={<p className="text-md font-semibold">Email Address :</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="esteban_schiller@gmail.com"
                                    />
                                </Form.Item>


                                <Form.Item className="text-center">

                                    <button
                                        className="bg-primary text-center w-full  p-2 font-semibold text-white px-10 py-2 rounded-2xl shadow-lg"
                                        type="submit"
                                    >
                                        Send a code
                                    </button>

                                </Form.Item>
                            </Form>
                        </div>

                    </div>
                    <div className="w-full md:w-[50%] px-3 text-center order-1 md:order-2  mt-32 md:mt-0">

                        <p className="text-center text-textColor">
                            We have sent a code to your email address. Please check your email and enter the code.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgatePassword;