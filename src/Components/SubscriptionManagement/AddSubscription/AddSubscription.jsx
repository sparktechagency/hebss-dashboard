/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { useState } from "react";
import { FaCamera, FaPlus, FaTrash } from "react-icons/fa";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useCreateSubscriptionMutation } from "../../../redux/features/subscriptionApi/subscriptionApi";


const AddSubscription = ({ onCancel }) => {
    const [categoryImg, setCategoryImg] = useState(null);
    const [createSubscription] = useCreateSubscriptionMutation()
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const data = {
            name: values.title,
            price: {
                amount: values.price?.amount || "",
                currency: values.price?.currency || ""
            },
            validity: {
                type: values.validity?.type || "",
                value: values.validity?.value || ""
            },
            features: values.features || []
        }
        console.log("Received values of form: ", data);
        try {
            await createSubscription(data).unwrap();
            onCancel();
            message.success("Subscription added successfully");
        } catch (error) {
            console.log(error);
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
                    <Form.Item label={<p className="text-md">Price</p>}>
                        <div className="flex justify-between items-center gap-2">
                            <Form.Item
                                name={['price', 'amount']}
                                rules={[{ required: true, message: "Please input a valid price amount!" }]}
                                noStyle
                            >
                                <InputNumber placeholder="Add price" style={{ width: "100%" }} />
                            </Form.Item>
                            <Form.Item
                                name={['price', 'currency']}
                                rules={[{ required: true, message: "Please input currency!" }]}
                                noStyle
                            >
                                <Input placeholder="Add currency" />
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <Form.Item label={<p className="text-md">Validity</p>}>
                        <div className="flex justify-between items-center gap-2">
                            <Form.Item
                                style={{ width: "100%" }}
                                name={['validity', 'type']}
                                rules={[{ required: true, message: "Please select validity type!" }]}
                            >
                                <Select placeholder="Select validity type">
                                    <Select.Option value="months">Months</Select.Option>
                                    <Select.Option value="years">Years</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item style={{ width: "100%" }} name={['validity', 'value']} rules={[{ required: true, message: "Enter a valid number!" }]}>
                                <InputNumber min={1} placeholder="Value" style={{ width: "100%" }} />
                            </Form.Item>

                        </div>
                    </Form.Item>

                    <div>
                        <Form.List name="features">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key} className="">

                                            <div className="flex justify-between items-center">
                                                <Form.Item
                                                    {...restField}
                                                    name={name}
                                                    // name={[name, 'feature']}

                                                    rules={[{ required: true, message: 'Please add an feature' }]}
                                                >
                                                    <Input placeholder="feature" />
                                                </Form.Item>
                                                <FaTrash
                                                    className="text-red-500 cursor-pointer -mt-5"
                                                    onClick={() => remove(name)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <button
                                            className="flex justify-between items-center gap-2 w-full  border  px-4 py-2 rounded-md"
                                            type=""
                                            onClick={() => add()}

                                        >
                                            Add feature
                                            <FaPlus />
                                        </button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
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

export default AddSubscription;