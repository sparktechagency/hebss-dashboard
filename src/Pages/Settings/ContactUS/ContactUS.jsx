/* eslint-disable no-unused-vars */
import { ConfigProvider, Form, Input, message, Modal } from "antd";
import { IoCall } from "react-icons/io5";
import { FaEnvelope, FaPen, FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useCreateContactUsMutation, useGetAllContactsQuery } from "../../../redux/features/SettingsApi/settingsApi";
const ContactUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [createContactUs] = useCreateContactUsMutation();
    const { data: contactData, refetch } = useGetAllContactsQuery();
    // console.log("contactData", contactData);
    // modal ends
    const [email, setEmail] = useState("");

    // for email:
    const showModal = () => {
        setIsModalOpen(true)
    };
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)

    }

    const handleEditModalOpen = (id) => {
        setIsEditModal(true);
    }
    const handleEditOk = () => {
        setIsEditModal(false);
    }
    const handleEditCancel = () => {
        setIsEditModal(false);
    }

    // add email button:
    const onFinish = async (value) => {
        try {
            const data = {
                email: value.email,
            }
            const res = createContactUs(data).unwrap();
            message.success("Email added successfully");
            handleCancel();
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
        }

    };
    // edit Modal:
    const onFinishEdit = async (value) => {
        try {
            const data = {
                email: value.email,
            }
            const res = createContactUs(data).unwrap();
            message.success("Email added successfully");
            handleEditCancel();
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
        }
    }

    return (
        <div className="h-[100vh]">
            {/* add email number: */}
            <div className=" max-w-screen-2xl mx-auto flex flex-col justify-start bg-white  md:px-20 py-8 md:w-[50%]">
                <div className="flex justify-start items-center gap-3 ">
                    <FaEnvelope className="text-white bg-primary p-1 h-6 w-6 rounded-full" />
                    <p className="text-xl text-textColor">Write To US</p>
                </div>
                <div className="my-6">
                    <div className="flex flex-col justify-center items-center gap-5 mb-5">

                        <div className="flex justify-center items-center gap-5">
                            <p className="px-5 py-2 border-2 rounded-lg w-60 md:w-96">{contactData?.data?.email} </p>
                            <FaPen onClick={() => handleEditModalOpen(contactData?.data?._id)} className="h-5 w-5 cursor-pointer" />
                        </div>

                    </div>
                    <button
                        onClick={showModal}
                        className=" bg-primary text-white font-semiboldbold text-xl rounded-full shadow-lg flex justify-end items-end"
                        type="submit"
                    >
                        <FaPlus className="text-white bg-primary h-8 w-8 p-1 rounded-full"></FaPlus>
                    </button>
                    <ConfigProvider theme={
                        {
                            components: {
                                "Modal": {
                                    "colorIcon": "rgb(0,0,0)",
                                    "colorIconHover": "rgb(0,0,0)",
                                    "colorBgTextHover": "#ffa496",
                                    "colorBgTextActive": "#ffa496"
                                },

                            }
                        }
                    }>

                        <Modal title="Add Email" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                            <Form
                                name="contact"
                                initialValues={{ remember: false }}
                                onFinish={onFinish}
                                layout="vertical"

                            >
                                <div className=" gap-2">
                                    <Form.Item
                                        name="email"
                                        label={<p className=" text-md"></p>}
                                        style={{}}
                                    >
                                        <Input
                                            required
                                            style={{ padding: "6px" }}
                                            className=" text-md"
                                            placeholder="xxxxxxx@gmail.com"
                                        />
                                    </Form.Item>


                                </div>

                                <Form.Item >
                                    <button

                                        className="px-4 py-2 rounded bg-primary text-white font-semiboldbold   shadow-lg flex justify-end items-end"
                                        type="submit"
                                    >
                                        save
                                    </button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        {/* Edit Modal */}
                        <Modal title="Edit Email" open={isEditModal} onOk={handleEditOk} onCancel={handleEditCancel} footer={null}>
                            <Form
                                name="contact"
                                initialValues={{ remember: false }}
                                onFinish={onFinishEdit}
                                layout="vertical"

                            >
                                <div className=" gap-2">
                                    <Form.Item
                                        name="email"
                                        label={<p className=" text-md"></p>}
                                        style={{}}
                                    >
                                        <Input
                                            required
                                            style={{ padding: "6px" }}
                                            className=" text-md"
                                            placeholder="xxxxxxx@gmail.com"
                                        />
                                    </Form.Item>


                                </div>

                                <Form.Item >
                                    <button

                                        className="px-4 py-2 rounded bg-primary text-white font-semiboldbold   shadow-lg flex justify-end items-end"
                                        type="submit"
                                    >
                                        save
                                    </button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </ConfigProvider>
                </div>
            </div>


        </div>

    );
};
export default ContactUs;