import React, { useState, useEffect } from "react";
import { Card, Switch, Row, Col, Spin, Alert, message } from "antd";
import {
  useGetSubscriptionByUserIdQuery,
  useCancelSubscriptionMutation,
  useCreateSubscriptionMutation,
} from "../../redux/features/subscription/subscriptionApi";

const SubscriptionTab = ({ userId }) => {
  const { data, error, isLoading } = useGetSubscriptionByUserIdQuery(userId, {
    skip: !userId,
  });

  const [cancelSubscription, { isLoading: isCancelling }] = useCancelSubscriptionMutation();
  const [createSubscription, { isLoading: isCreating }] = useCreateSubscriptionMutation();

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
        // Activate subscription - send required fields
        await createSubscription({
          userId,
          type: subscriptonInfo?.type || "defaultType",
          name: subscriptonInfo?.name || "defaultName",
          subscriptionId: subscriptonInfo?._id,
        }).unwrap();
        message.success("Subscription activated successfully");
      } else {
        // Cancel subscription - send required fields for patch
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

  if (!userId)
    return <Alert type="warning" message="User ID is missing" />;
  if (isLoading) return <Spin tip="Loading subscription..." />;
  if (error)
    return (
      <Alert
        type="error"
        message="Error fetching subscription"
        description={JSON.stringify(error)}
      />
    );
  if (!subscriptionPurchases)
    return <Alert type="info" message="No subscription found." />;

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
            {/* <li className="py-1">
              Stripe Price ID: {subscriptionPurchases.subscription?.priceId}
            </li>
            <li className="py-1">User ID: {subscriptionPurchases.user}</li> */}
          <li className="py-1">
            Payment Status: {subscriptionPurchases.paymentStatus}
          </li>
        </ul>

        {/* Features List */}
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
              <Switch
                checked={isActive}
                onChange={handleToggle}
                loading={loading}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SubscriptionTab;
