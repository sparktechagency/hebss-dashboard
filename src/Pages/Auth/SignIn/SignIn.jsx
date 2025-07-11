import { Checkbox, Form, Input, message, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/features/auth/authSlice"; 

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login({
        name:values.fullName,
        email: values.email,
        password: values.password,
      }).unwrap();
      // Save full user info to localStorage
      localStorage.setItem("user", JSON.stringify(response?.data));

      // Save to Redux Global State
      dispatch(setCredentials({ 
        user: response?.data, 
        token: response?.data?.accessToken
      }));

      message.success("Login successful");
      navigate("/dashboard"); // ✅ Navigate after successful login
    } catch (err) {
      console.error(err);
      message.error("Login failed. Please check your credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between w-full gap-2 mx-auto md:max-w-screen-md md:flex-row md:gap-20">
          <div className="w-full md:w-[50%] order-2 md:order-1">
            <div className="md:h-[100vh] w-full flex items-center justify-center">
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                className="py-10 md:py-28 mx-2 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px] border-2 border-[#eef6ff] mt-10"
              >
                <div className="mb-4 text-center">
                  <h2 className="mb-6 text-2xl font-bold text-center md:text-3xl">
                    Login to Account
                  </h2>
                  <Typography.Text className="text-base text-center text-black">
                    Please enter your email and password to continue
                  </Typography.Text>
                </div>

                <Form.Item
                  name="email"
                  label={<p className="text-md">Email</p>}
                  rules={[{ required: true, message: "Please input your Email!" }]}
                >
                  <Input
                    className="text-md"
                    placeholder="Your Email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={<p className="text-md">Password</p>}
                  rules={[{ required: true, message: "Please input your Password!" }]}
                >
                  <div className="relative flex items-center justify-center">
                    <Input
                      className="text-md"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <div className="absolute right-0 flex justify-center px-3">
                      <button onClick={togglePasswordVisibility} type="button">
                        {showPassword ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button>
                    </div>
                  </div>
                </Form.Item>

                <div className="flex items-center justify-between my-2">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-black text-md hover:text-black">
                      Remember Password
                    
                    </Checkbox>
                  </Form.Item>
                  <Link to="/forgate-password">
                    <p className="text-red-600 hover:text-red-600 text-md">
                      Forgot Password
                    </p>
                  </Link>
                </div>

                <Form.Item className="my-10 text-center">
                  <button
                    className="w-full p-2 font-semibold text-white shadow-lg bg-primary rounded-2xl"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="w-full md:w-[50%] px-3 flex flex-col justify-center items-center order-1 md:order-2 mt-10">
            <h1 className="mb-5 text-2xl font-bold md:text-3xl md:mb-16">
              Welcome Back
            </h1>
            <p className="text-lg text-center text-neutral-500">
              Please sign into your account with the given details to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
