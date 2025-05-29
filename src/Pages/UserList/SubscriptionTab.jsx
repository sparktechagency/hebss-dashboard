import React, { useState, useEffect } from "react";
import { Card, Switch, Row, Col, Spin, Alert } from "antd";
import { useGetSubscriptionByUserIdQuery } from "../../redux/features/subscription/subscriptionApi";

const SubscriptionTab = ({ userId }) => {
  // Fetch subscription data only if userId exists
  const { data, error, isLoading } = useGetSubscriptionByUserIdQuery(userId, {
    skip: !userId,
  });

  // Local UI toggle state for subscription active status
  const [isActive, setIsActive] = useState(false);

  // Debug: Log API response to inspect its structure
  useEffect(() => {
    console.log("Subscription API data:", data);
  }, [data]);

  // Safely extract subscriptionPurchases and subscriptonInfo,
  // whether data is full response or already the nested data object
  const subscriptionPurchases =
    data?.data?.subscriptionPurchases || data?.subscriptionPurchases;
  const subscriptonInfo =
    data?.data?.subscriptonInfo || data?.subscriptonInfo;

  // Set initial isActive state from backend data
  useEffect(() => {
    if (subscriptionPurchases?.isActive !== undefined) {
      setIsActive(subscriptionPurchases.isActive);
    }
  }, [subscriptionPurchases]);

  const handleToggle = (checked) => {
    setIsActive(checked);
    // TODO: Call mutation to update isActive status on backend if needed
  };

  // Handle loading and error states
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
            Stripe Price ID: {subscriptionPurchases.subscription?.priceId}
          </li>
          <li className="py-1">User ID: {subscriptionPurchases.user}</li>
          <li className="py-1">
            Payment Status: {subscriptionPurchases.paymentStatus}
          </li>
        </ul>

        {/* Subscription status and toggle */}
        <Row justify="center" className="mt-6">
          <Col>
            <p className="font-semibold text-center text-gray-800">
              Subscription Status:{" "}
              <span className={isActive ? "text-green-500" : "text-red-500"}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </p>
            <div className="flex justify-center mt-2">
              <Switch checked={isActive} onChange={handleToggle} />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SubscriptionTab;
