/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Image, Input, Space, Table } from "antd";
import { useState } from "react";

import { Button, Modal } from "antd";
import { FaCalendar, FaEye, FaStopwatch } from "react-icons/fa";
import { AllImages } from "../../../assets/image/AllImages";
import { FiUserCheck } from "react-icons/fi";
import { LiaUserSlashSolid } from "react-icons/lia";
import { SearchOutlined } from "@ant-design/icons";
import { LuRefreshCcw } from "react-icons/lu";
import { useGetAllPatientsQuery } from "../../../redux/features/UsersApi/usersApi";
import { BASE_URL } from "../../../utils/baseUrl";
const Patient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState("");
  const { data: patientsData } = useGetAllPatientsQuery();
  console.log(patientsData?.data);
  const userData = patientsData?.data || [];

  // const data = userData?.data
  // const filteredData = data?.filter(user =>
  //   user.email.includes(email) || user.name.toLowerCase().includes(email.toLowerCase())
  // );

  // const [block, setBlock] = useState(false);


  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSearch = () => {
    // refetc();
  };

  const handleSession = (record) => {
    console.log(record);


  }

  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'slno',
      key: 'slno',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar size={40} className="shadow-md" src={`${BASE_URL}/v1/${record?.profile?.image}`} />
          <span>{record.firstName + " " + record.lastName}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => record?.email || 'N/A'
    },
    {
      title: 'Contact No',
      key: 'contact',
      render: (_, record) => {
        const contact = record.phone || 'N/A';
        return (
          <p>{contact}</p>
        )
      }
    },
    {
      title: 'Location',
      key: 'address',
      render: (_, record) => {
        const address = record?.profile?.address || 'N/A';
        return (
          <p>{address}</p>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => record?.status || 'N/A'
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
            <Button onClick={() => showModal(record)} icon={<FaEye className="text-primary" />} />

            <Button
              onClick={() => handleSession(record)}
              icon={
                record?.is_active === true ? (
                  <FiUserCheck className="h-5 w-5 text-green-500" />

                ) : (
                  <LiaUserSlashSolid className="h-5 w-5 text-red-500" />
                )
              }
            />
          </Space>
        </ConfigProvider>
      ),
    }
  ];


  return (
    <div className="h-[100vh]">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          All Patients
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

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} width={600}>
        {selectedUser && (
          <div className="p-2">
            <div className="relative bg-primary h-80">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                <Image src={`${BASE_URL}/v1/${selectedUser?.profile?.image}`} className=" rounded-full" height={200} width="100"> </Image>
                <div className="text-center text-black">
                  <h2 className="text-2xl font-bold  text-textColor"> Name:  {selectedUser.firstName + " " + selectedUser.lastName}</h2>
                  <h2 className="text-xl  text-textColor font-bold">Specialist: {selectedUser.role}</h2>
                </div>
              </div>
            </div>


            <div className="mt-5">
              <div className="flex gap-2 mb-4">
                <p className="text-gray-600 font-semibold">Email :</p>
                <p>{selectedUser.email}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className="text-gray-600 font-semibold">Contact No :</p>
                <p>{selectedUser?.phone || 'N/A'}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className="text-gray-600 font-semibold">Address :</p>
                <p>{selectedUser?.profile?.address || 'N/A'}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className="text-gray-600 font-semibold">Date Of Birth :</p>
                <p>{selectedUser?.profile?.dateOfBirth || 'N/A'}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className="text-gray-600 font-semibold">Gender:</p>
                <p>{selectedUser?.profile?.gender || 'N/A'}</p>
              </div>
              <p className="text-gray-600 font-semibold">Certificates:</p>
            </div>
          </div>
        )
        }
      </Modal >
    </div>
  );
};

export default Patient;
