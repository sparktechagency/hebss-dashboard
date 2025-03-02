/* eslint-disable no-unused-vars */
import { message, Modal } from "antd";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import SetMessageCost from "../../../Components/SubscriptionManagement/MessageCOst/SetMessageCost/SetMessageCost";
import { useCreateMessageCostMutation, useDeleteMessageCostMutation, useGetMessageCostQuery } from "../../../redux/features/subscriptionApi/subscriptionApi";
import EditMEssageCost from "../../../Components/SubscriptionManagement/MessageCOst/EditMessageCost/EditMEssageCost";

const MessageCost = () => {
    const [showModal, setShowModal] = useState(false);
    const [messageCostId, setMessageCostId] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const { data: messageCost } = useGetMessageCostQuery();
    const [deleteMessageCost] = useDeleteMessageCostMutation()
    console.log(messageCost);

    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCancel = () => {
        setShowModal(false);
    }
    const handleShowEditModal = (_id) => {
        // console.log(_id);
        setMessageCostId(_id);
        setShowEditModal(true);
    }
    const handleCancelEdit = () => {
        setShowEditModal(false);
    }
    const handleDelet = async (_id) => {
        await deleteMessageCost(_id);

        message.success('Deleted Successfully');
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
                    Message Cost
                </h3>
                <button onClick={handleShowModal} className="flex items-center gap-2 bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg"><FaPlus></FaPlus> Set Message Cost</button>

            </div>
            <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-xl border border-primary">
                    <div className="flex items-center justify-end mb-2">

                        <div className="flex items-end gap-2">
                            <button onClick={() => handleShowEditModal(`${messageCost?.data?._id}`)} >
                                <FaRegPenToSquare className="text-primary " />
                            </button>
                            <button onClick={() => handleDelet(`${messageCost?.data?._id}`)} >
                                <FaTrash className="text-red-500 " /></button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p>Per message cost :  </p>
                        <p className="text-primary">{messageCost?.data?.costPerMessage?.amount} {messageCost?.data?.costPerMessage?.currency}</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p>Maximum character :</p>
                        <p className="text-primary">{messageCost?.data?.maxCharacters} </p>
                    </div>
                </div>

            </div>
            {/*set message cost Modal */}

            <Modal title="Set Message Cost" open={showModal} onCancel={handleCancel} footer={null}>
                <SetMessageCost handleCancel={handleCancel} />

            </Modal>
            {/*Edit message cost Modal */}

            <Modal title="Edit Message Cost" open={showEditModal} onCancel={handleCancelEdit} footer={null}>
                <EditMEssageCost handleCancelEdit={handleCancelEdit} messageCostId={messageCostId} />

            </Modal>

        </div >
    );
};

export default MessageCost;