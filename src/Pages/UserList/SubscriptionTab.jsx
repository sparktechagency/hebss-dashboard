import React, { useState, useEffect } from "react";
import { Card, Switch, Row, Col, Spin, message } from "antd";
import {
  useGetSubscriptionByUserIdQuery,
  useCancelSubscriptionMutation,
  useCreateSubscriptionMutation,
} from "../../redux/features/subscription/subscriptionApi";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const SubscriptionTab = ({ userId }) => {
  const { data, error, isLoading } = useGetSubscriptionByUserIdQuery(userId, {
    skip: !userId,
  });

  const [cancelSubscription, { isLoading: isCancelling }] =
    useCancelSubscriptionMutation();
  const [createSubscription, { isLoading: isCreating }] =
    useCreateSubscriptionMutation();

  const [isActive, setIsActive] = useState(false);

  const subscriptionPurchases =
    data?.data?.subscriptionPurchases || data?.subscriptionPurchases;
  const subscriptonInfo =
    data?.data?.subscriptonInfo || data?.subscriptonInfo;

  useEffect(() => {
    if (subscriptionPurchases?.isActive !== undefined) {
      setIsActive(subscriptionPurchases.isActive);
    }
  }, [subscriptionPurchases]);

  const handleToggle = async (checked) => {
    setIsActive(checked);
    try {
      if (checked) {
        await createSubscription({
          userId,
          type: subscriptonInfo?.type || "defaultType",
          name: subscriptonInfo?.name || "defaultName",
          subscriptionId: subscriptonInfo?._id,
        }).unwrap();

        message.success("Subscription activated successfully");
      } else {
        if (subscriptionPurchases?._id) {
          await cancelSubscription({
            id: subscriptionPurchases._id,
            data: {
              isActive: false,
              type: subscriptonInfo?.type || "defaultType",
              name: subscriptonInfo?.name || "defaultName",
            },
          }).unwrap();

          message.success("Subscription cancelled successfully");
        } else {
          message.error("Subscription ID missing, cannot cancel.");
        }
      }
    } catch (err) {
      console.error(err);
      message.error("Error updating subscription status");
      setIsActive(!checked); // revert toggle on error
    }
  };

  // ====== Conditional UI ======

  if (!userId) {
    return (
      <div className="flex justify-center p-6">
        <div className="w-full max-w-md p-6 text-center border-l-4 border-yellow-400 rounded-lg shadow-lg bg-yellow-50">
          <h2 className="mb-2 text-lg font-semibold text-yellow-600">
            Warning
          </h2>
          <p className="text-gray-700">User ID is missing</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spin size="large" tip="Loading subscription..." />
      </div>
    );
  }

  if (error || !subscriptionPurchases) {
    return (
      <div className="flex justify-center items-center min-h-[200px] p-6">
        <div className="w-full max-w-lg p-6 text-center bg-white border-l-4 border-red-500 shadow-xl rounded-xl">
          <div className="flex flex-col items-center gap-4">
            <AiOutlineExclamationCircle className="w-12 h-12 text-red-500" />
            <h2 className="text-2xl font-bold text-red-600">
              No Subscription
            </h2>
            <p className="text-sm text-gray-700 md:text-base">
              This user has not subscribed yet. They will gain access to
              subscription features once they subscribe.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!subscriptionPurchases) {
    return (
      <div className="flex justify-center p-6">
        <div className="w-full max-w-md p-6 text-center border-l-4 border-blue-400 rounded-lg shadow-lg bg-blue-50">
          <h2 className="mb-2 text-lg font-semibold text-blue-600">Info</h2>
          <p className="text-gray-700">No subscription found.</p>
        </div>
      </div>
    );
  }

  const loading = isCancelling || isCreating;

  return (
    <div className="p-6">
      <h3 className="mb-4 text-xl font-semibold">Purchased Subscription</h3>

      <Card
        key={subscriptionPurchases._id}
        className="relative w-1/4 p-6 bg-white border border-gray-200 shadow-lg rounded-xl"
      >
        <h3 className="text-xl font-bold text-center text-gray-800">
          Plan Name: {subscriptonInfo?.name || "N/A"}
        </h3>

        <p className="text-sm text-center text-gray-500">
          Payment Type: {subscriptionPurchases.paymentType}
        </p>

        <p className="my-4 text-3xl font-bold text-center text-gray-900">
          ${subscriptionPurchases.price || "14.99"}
        </p>

        <ul className="text-sm text-center text-gray-700">
          <li className="py-1">
            Payment Status: {subscriptionPurchases.paymentStatus}
          </li>
        </ul>

        {Array.isArray(subscriptonInfo?.features) && (
          <div className="flex flex-col items-center justify-center mt-4">
            <h4 className="mb-2 font-semibold text-center text-gray-800 text-md">
              Features Included:
            </h4>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {subscriptonInfo.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <Row justify="center" className="mt-6">
          <Col>
            <p className="font-semibold text-center text-gray-800">
              Subscription Status:{" "}
              <span className={isActive ? "text-green-500" : "text-red-500"}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </p>
            <div className="flex justify-center mt-2">
              <Switch checked={isActive} onChange={handleToggle} loading={loading} />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SubscriptionTab;
