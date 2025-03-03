import React, { useState } from "react";
import { ConfigProvider, Form, Input, message, Modal, Upload } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Banner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Mock data for design
    const [banners, setBanners] = useState([
        {
            id: 1,
            title: "Welcome to Our Platform",
            description: "Discover amazing features and services",
            image: "https://via.placeholder.com/800x400"
        },
        {
            id: 2,
            title: "Special Offers",
            description: "Check out our latest deals",
            image: "https://via.placeholder.com/800x400"
        }
    ]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newBanner = {
                id: banners.length + 1,
                ...values,
                image: "https://via.placeholder.com/800x400"
            };
            setBanners([...banners, newBanner]);
            message.success("Banner added successfully!");
            setLoading(false);
            setIsModalOpen(false);
        }, 1000);
    };

    const handleDelete = (id) => {
        setBanners(banners.filter(banner => banner.id !== id));
        message.success("Banner deleted successfully!");
    };

    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-lg p-6 md:p-10 mt-5">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Banner Management</h2>
                    <button
                        onClick={showModal}
                        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <IoMdAdd className="text-xl" />
                        Add Banner
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {banners.map(banner => (
                        <div key={banner.id} className="bg-gray-50 p-4 rounded-lg">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-semibold text-lg mb-2">{banner.title}</h3>
                            <p className="text-gray-600 mb-4">{banner.description}</p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleDelete(banner.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <RiDeleteBin6Line className="text-xl" />
                                </button>
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FaRegEdit className="text-xl" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal
                    title="Add New Banner"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        name="bannerForm"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: "Please input title!" }]}
                        >
                            <Input placeholder="Enter banner title" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: "Please input description!" }]}
                        >
                            <Input.TextArea rows={3} placeholder="Enter banner description" />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Banner Image"
                            rules={[{ required: true, message: "Please upload an image!" }]}
                        >
                            <Upload
                                listType="picture-card"
                                maxCount={1}
                                beforeUpload={() => false}
                            >
                                <div>
                                    <IoMdAdd className="text-2xl" />
                                    <div className="mt-2">Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>

                        <Form.Item className="flex justify-end mb-0">
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded-lg"
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "Add Banner"}
                            </button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Banner;