/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Input, message, Upload } from "antd";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useUpdateCategoryMutation } from "../../../redux/features/CategoryApi/categoryApi";



const EditCAtegory = ({ selectedUser, handleCancel }) => {
    // console.log(selectedUser);
    const [categoryImg, setCategoryImg] = useState(null);
    const [form] = Form.useForm();
    const [updateCategory] = useUpdateCategoryMutation(selectedUser)
    const onFinish = async (values) => {
        const img = categoryImg;
        console.log("Received values of form: ", img, values);
        try {
            const formData = new FormData();
            formData.append('name', values.title);
            formData.append('image', img);
            const res = await updateCategory({ _id: selectedUser, data: formData }).unwrap()
            console.log(res);
            message.success("Category updated successfully");
            handleCancel()

        } catch (error) {
            console.log(error);
            message.error("Something went wrong!");
        }
    }

    return (
        <div>
            <div className="pt-8">
                <Form
                    name="add-category"
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item name="image" >
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
                            <p>{categoryImg?.name}</p>
                        </div>
                    </Form.Item>
                    <div className="">
                        <Form.Item
                            name="title"
                            label={<p className="text-md">Category Name</p>}
                            rules={[{ message: "Please input a challenge name!" }]}
                        >
                            <Input
                                style={{ padding: "6px" }}
                                className="text-md"
                                placeholder="Add Category Name"
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

export default EditCAtegory;