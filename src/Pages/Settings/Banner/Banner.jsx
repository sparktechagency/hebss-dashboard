/* eslint-disable no-unused-vars */
import { ConfigProvider, Form, Input, message, Modal, Upload } from "antd";
import { useState } from "react";
import { FaCamera, FaPlus } from "react-icons/fa";
import banner from "../../../assets/image/banner.png"
import AddBanner from "../../../Components/Seetings/Banner/AddBanner/AddBanner";
import EditBanner from "../../../Components/Seetings/Banner/EditBanner/EditBanner";
import { useDeleteSliderMutation, useGetAllSlidersQuery } from "../../../redux/features/SettingsApi/settingsApi";
import { BASE_URL } from "../../../utils/baseUrl";
const Banner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [sliderId, setSliderId] = useState(null);
    const { data: sliderData, refetch, isLoading } = useGetAllSlidersQuery();
    const data = sliderData?.data
    const [deleteSlider] = useDeleteSliderMutation()
    // console.log("Slider", data)
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEditOk = () => {
        setEditModalOpen(false);
    };

    const handleEditCancel = () => {
        setEditModalOpen(false);
    };
    const showEditModal = (id) => {
        setSliderId(id);

        setEditModalOpen(true);
    };

    // form Modal
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const handleDelete = async (_id) => {
        await deleteSlider(_id).unwrap();
        message.success('Deleted Successfully');
    }
    return (
        <div className="h-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 my-6">
                <p className="text-textColor md:text-xl font-bold">Banner</p>

                <button onClick={showModal} className="flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-md text-white ">
                    <FaPlus className="text-white" />
                    Add Banner
                </button>

            </div>
            <div className="my-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    {
                        !isLoading && data?.length > 0 ? data?.map((item) => (
                            <div key={item._id} className="p-1 bg-white rounded-md border border-primary">
                                <div className="relative">
                                    <img src={`${BASE_URL}/v1/${item.image}`} alt="" className="h-[300px] w-full " />
                                    <p className="p-2 text-black text-md font-bold">{item.title}</p>
                                </div>
                                <div className="flex justify-between items-center my-2">
                                    <button onClick={() => handleDelete(item._id)} className=" text-center w-full md:w-auto  p-2 font-semibold text-red-500 px-10 py-2 rounded-xl shadow-lg border border-red-500">Delete</button>
                                    <button onClick={() => showEditModal(item._id)} className="bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg">Edit</button>
                                </div>
                            </div>
                        )) : <p>No banner found</p>
                    }

                </div>
            </div>


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
                <Modal title="Add Banner" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
                    <AddBanner handleCancel={handleCancel} />

                </Modal>
                <Modal title="Edit Banner" open={editModalOpen} onOk={handleEditOk} onCancel={handleEditCancel} footer={false} >
                    <EditBanner handleEditCancel={handleEditCancel} sliderId={sliderId} />

                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default Banner;