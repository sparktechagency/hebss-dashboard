/* eslint-disable no-unused-vars */
import { ConfigProvider, Form, Input, message, Modal, Space, Table } from "antd";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useCreateAdminMutation, useDeleteAdminMutation, useGetAdminQuery } from "../../redux/features/AdminApi/AdminApi";

const MakeAdmin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createAdmin] = useCreateAdminMutation();
    const { data: AdminsData } = useGetAdminQuery();
    const [deleteAdmin] = useDeleteAdminMutation()
    const Admininformation = AdminsData?.data;



    // form modal

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // form Modal
    const onFinish = (values) => {
        try {
            const data = {
                fullName: values.name,
                email: values.email,
                password: values.password,

            }
            const response = createAdmin(data).unwrap();
            console.log(response);
            message.success("Admin created successfully");

        } catch (error) {
            console.log(error);
            message.error("Something went wrong!");
        }
    };
    const hnadleDelete = async (_id) => {
        console.log(_id);
        try {
            const response = await deleteAdmin(_id).unwrap();
            message.success("Admin deleted successfully");
        } catch (error) {
            console.log(error);
            message.error("Something went wrong!");
        }
    }

    const columns = [
        {
            title: 'Sl No',
            dataIndex: 'slno',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Name',
            key: 'fullName',
            render: (_, record) => (
                <div className="flex items-center gap-2">

                    <span>{record.fullName}</span>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Type',
            dataIndex: 'role',
            key: 'role',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <ConfigProvider theme={{
                    components: {
                        "Button": {
                            "defaultHoverBorderColor": "rgb(47,84,235)",
                            "defaultHoverColor": "rgb(47,84,235)",
                            "defaultBorderColor": "rgb(47,84,235)"
                        }
                    }
                }}>
                    <Space size="middle">
                        <button onClick={() => hnadleDelete(record._id)} className=""><FaTrash className="text-red-500"></FaTrash></button>


                    </Space>
                </ConfigProvider>
            ),
        }
    ];





    return (
        <div className="h-[100vh]">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 my-6">
                <p className="text-textColor md:text-xl font-bold">Make Admin</p>

                <button onClick={showModal} className="flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-md text-white ">
                    <FaPlus className="text-white" />
                    Make Admin
                </button>

            </div>

            <div className="bg-white">
                <Table columns={columns} dataSource={Admininformation} pagination={false} rowKey="id" className="overflow-x-auto" />
            </div>
            {/* modal for add admin */}
            <ConfigProvider
                theme={{
                    components: {
                        "Button": {
                            "defaultHoverBorderColor": "rgb(47,84,235)",
                            "defaultHoverColor": "rgb(47,84,235)",
                            "defaultBorderColor": "rgb(47,84,235)"
                        }
                    }
                }}
            >
                <Modal title="Make Admin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
                    <Form
                        name="contact"
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                        layout="vertical"

                    >
                        <div className="">
                            <Form.Item
                                name="name"
                                label={<p className=" text-md">Full Name</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="John Doe"
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label={<p className=" text-md">E-mail</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="abcd@gmail.com"
                                />
                            </Form.Item>

                        </div>
                        <div className="">
                            <Form.Item
                                name="user_type"
                                label={<p className=" text-md">User Type</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Admin"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label={<p className=" text-md">Password</p>}

                            >
                                <Input.Password
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="******"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item >
                            <button

                                onClick={handleOk}
                                className=" w-full py-2 bg-primary text-white font-semiboldbold rounded-lg text-xl  shadow-lg"
                                type="submit"
                            >
                                Confirm
                            </button>
                        </Form.Item>
                    </Form>

                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default MakeAdmin;