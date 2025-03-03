/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ConfigProvider, Form, Input, message } from "antd";

const ContactUS = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([
        {
            id: 1,
            address: "123 Main St, City",
            email: "contact@example.com",
            phone: "+1234567890"
        }
    ]);

    const handleSubmit = async (value) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setContacts([{
                id: 1,
                ...value
            }]);
            message.success("Contact Us updated Successfully");
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-lg p-6 md:p-10 mt-5">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                </div>

                {contacts.map(contact => (
                    <div key={contact.id} className="bg-gray-50 p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold mb-2">Address</h3>
                                <p>{contact.address}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Email</h3>
                                <p>{contact.email}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Phone</h3>
                                <p>{contact.phone}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mx-2 mb-10">
                    <div className="">
                        <Form
                            name="contact-us"
                            initialValues={{ remember: true }}
                            style={{ maxWidth: 550 }}
                            layout="vertical"
                            className=" bg-white py-10 md:py-28 mx-4 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px] border-2 shadow-xl"
                        >
                            <div className="mb-4 text-center">
                                <h2
                                    className=" text-center text-2xl md:text-3xl font-bold mb-6"
                                >
                                    Contact Us
                                </h2>
                            </div>

                            <Form.Item
                                name="address"
                                label={<p className="text-md font-semibold">Address :</p>}
                            >
                                <Input.TextArea
                                    required
                                    style={{ padding: "6px" }}
                                    className="text-md"
                                    placeholder="Enter your address"
                                    rows={4}
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label={<p className="text-md font-semibold">Email :</p>}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className="text-md"
                                    placeholder="Enter your email"
                                />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label={<p className="text-md font-semibold">Phone :</p>}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className="text-md"
                                    placeholder="Enter your phone"
                                />
                            </Form.Item>

                            <Form.Item className="text-center">
                                <button
                                    onClick={() => handleSubmit(value)}
                                    className="bg-primary text-center w-full p-2 font-semibold text-white px-10 py-2 rounded-2xl shadow-lg"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUS;