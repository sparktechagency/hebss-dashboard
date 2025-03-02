/* eslint-disable no-unused-vars */
import { message, Modal } from "antd";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import AddSubscription from "../../Components/SubscriptionManagement/AddSubscription/AddSubscription";
import MessageCost from "./MessageCost/MessageCost";
import EditSubscription from "../../Components/SubscriptionManagement/EditSubscription/EditSubscription";
import { useDeleteSubscriptionMutation, useGetSubscriptionQuery } from "../../redux/features/subscriptionApi/subscriptionApi";

const Subscription = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { data: subscription } = useGetSubscriptionQuery({
    query: searchTerm,
    page: currentPage,
    limit: itemsPerPage
  });
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const subscriptions = subscription
  // console.log(subscriptions?.data);
  const handleShowModal = () => {
    setShowModal(true);
  }
  const handleCancel = () => {
    setShowModal(false);
  }
  const hndleShowEditModal = (id) => {
    setSubscriptionId(id);
    setShowEditModal(true);
  }
  const handleCancelEdit = () => {
    setShowEditModal(false);
  }
  const handleDelet = (id) => {
    console.log(id);
    try {
      const response = deleteSubscription(id).unwrap();
      console.log(response);
      message.success("Subscription deleted successfully!");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    }
  }

  return (
    <div className="h-[100vh]">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          Subscription
        </h3>
        <button onClick={handleShowModal} className="flex items-center gap-2 bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg"><FaPlus></FaPlus> Add Subscription</button>

      </div>
      <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {
          subscriptions?.data?.map((subscription) => (
            <div key={subscription._id} className="bg-white p-5 rounded-xl border border-primary">
              <div className="flex items-center justify-between mb-2">
                <h1>{subscription?.name}</h1>
                <div className="flex items-center gap-2">
                  <button onClick={() => hndleShowEditModal(subscription._id)} >
                    <FaRegPenToSquare className="text-primary " />
                  </button>
                  <button onClick={() => handleDelet(subscription._id)} >
                    <FaTrash className="text-red-500 " /></button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p>Price</p>
                <p className="text-primary">{subscription?.price?.amount} {subscription?.price?.currency} </p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p>Validity</p>
                <p className="text-primary">{subscription?.validity?.value} {subscription?.validity?.type}</p>
              </div>
              <div>
                <h1>Feature list</h1>
                {/* bullet list */}
                <ul className="list-disc list-inside flex flex-col gap-2  text-neutral-500">
                  {
                    subscription?.features?.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))
                  }

                </ul>
              </div>
            </div>
          )
          )


        }

      </div>
      <MessageCost />

      {/* Add Subscription Modal */}
      <Modal title="Add Subscription" open={showModal} onCancel={handleCancel} footer={null}>
        <AddSubscription  onCancel={handleCancel}/>
      </Modal>


      {/* Add Subscription Modal */}
      <Modal title="Edit Subscription" open={showEditModal} onCancel={handleCancelEdit} footer={null}>
        <EditSubscription subscriptionId={subscriptionId} onCancel={handleCancelEdit}/>
      </Modal>

    </div>
  );
};

export default Subscription;