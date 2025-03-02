/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Input, message, Upload } from "antd";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useCreateSliderMutation } from "../../../../redux/features/SettingsApi/settingsApi";

const AddBanner = ({ handleCancel }) => {
    const [categoryImg, setCategoryImg] = useState(null);
    const [createSlider] = useCreateSliderMutation()
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append("therapist", "678f908a41bd1b6dcc108946");
        formData.append("title", values.title);
        formData.append("image", categoryImg);

        try {
            const res = await createSlider(formData).unwrap();
            // console.log(res);
            message.success("Slider added successfully");
            handleCancel();
        } catch (error) {
            console.log(error);
            message.error("Something went wrong!");
        }
    };

    return (
        <div>
            <div className="pt-8">
                <Form
                    name="add-category"
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item name="img">
                        <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-400 p-4">
                            <Upload
                                showUploadList={false}
                                maxCount={1}
                                beforeUpload={(file) => {
                                    form.setFieldsValue({ img: file });
                                    setCategoryImg(file);
                                    return false;
                                }}
                                className="px-2 py-1 rounded-full cursor-pointer"
                            >
                                <FaCamera className="text-primary h-5 w-5" />
                            </Upload>

                            {categoryImg && (
                                <img
                                    src={URL.createObjectURL(categoryImg)}
                                    alt="Preview"
                                    className="w-auto h-20 mt-2 rounded-md"
                                />
                            )}
                            {/* <p>{categoryImg.name}</p> */}

                        </div>
                    </Form.Item>

                    <div className="">
                        <Form.Item
                            name="title"
                            label={<p className="text-md">Banner Title</p>}
                            rules={[{ message: "Please input a challenge name!" }]}
                        >
                            <Input
                                style={{ padding: "6px" }}
                                className="text-md"
                                placeholder="Banner Title"
                            />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <button
                            type="submit"
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AddBanner;