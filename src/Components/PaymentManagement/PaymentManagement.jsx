/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Input, Table } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllPaymentQuery } from "../../redux/features/PaymentsApi/paymentsApi";
import { BASE_URL } from "../../utils/baseUrl";
const PaymentManagement = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState({});
    const { data: paymentsData } = useGetAllPaymentQuery();
    console.log(paymentsData?.data);
    const userData = paymentsData?.data || [];


    const handleSearch = () => {
        // refetc();
    };

    // stsus change according to upcoming, completed, cancelled
    const handleStatusChange = (id) => {
        setStatus((prevStatus) => ({
            ...prevStatus,
            [id]: !prevStatus[id],
        }));
    }



    const columns = [
        {
            title: 'Sl No',
            dataIndex: 'slno',
            key: 'slno',
            render: (text, record, index) => index + 1
        },
        {
            title: "Name",
            key: 'name',
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Avatar size={40} className="shadow-md" src={`${BASE_URL}/v1/${record.user?.profile?.image}`} />
                    <span>{`${record?.user?.firstName}` + " " + `${record?.user?.lastName}`}</span>
                </div>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_, record) => record?.user?.role
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
            render: (_, record) => record.purpose
        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentType',
            key: 'paymentType',
            render: (_, record) => record.paymentType
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (_, record) => record.amount + " " + record.currency
        },
        {
            title: 'Transection ID',
            dataIndex: 'transection_id',
            key: 'transection_id',
            render: (_, record) => record.transactionId
        },
    ];


    return (
        <div className="h-[100vh]">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
                    Payment Management
                </h3>
                <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
                    <div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        borderRadius: 0,
                                        hoverBorderColor: "none",
                                        activeBorderColor: "none",
                                    },
                                },
                            }}
                        >
                            <div className="flex gap-2 items-center relative">

                                <Input
                                    placeholder="Search by email"
                                    allowClear
                                    size="large"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onPressEnter={handleSearch}
                                    prefix={
                                        <SearchOutlined
                                            style={{ cursor: "pointer" }}
                                            onClick={handleSearch}
                                        />
                                    }
                                />


                                <button
                                    onClick={handleSearch}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primaryColor text-white p-2 rounded-r-lg"
                                >
                                    search
                                </button>
                            </div>
                        </ConfigProvider>
                    </div>

                </div>
            </div>
            <div className="bg-white overflow-x-auto">
                <Table columns={columns} dataSource={userData || []} pagination={false} rowKey="id" />
            </div>


        </div>
    );
};

export default PaymentManagement;
