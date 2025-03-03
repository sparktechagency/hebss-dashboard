import React, { useState } from "react";
import { Card, Switch, Row, Col } from "antd";

const SubscriptionTab = () => {
  const [isActive, setIsActive] = useState(true); // State to track if the subscription is active

  const sub = {
    id: 1,
    title: "Basic",
    chargeType: "Monthly",
    price: "14.99",
    features: ["Free Setup", "Bandwidth Limit 10 GB", "20 User Connection"],
  };

  // Handle toggle change
  const handleToggle = (checked) => {
    setIsActive(checked);
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Purchased Subscription</h3>
      <Card
        key={sub.id}
        className="p-6 rounded-xl w-1/4 shadow-lg bg-white relative border border-gray-200"
      >
        <h3 className="text-xl font-bold text-center text-gray-800">
          {sub.title}
        </h3>
        <p className="text-sm text-gray-500 text-center">{sub.chargeType}</p>
        <p className="text-3xl font-bold text-gray-900 text-center my-4">
          ${sub.price}
        </p>

        <ul className="text-center text-gray-700 text-sm">
          {sub.features.map((feature, index) => (
            <li key={index} className="py-1">
              {feature}
            </li>
          ))}
        </ul>

        {/* Subscription status and toggle */}
        <Row justify="center" className="mt-6">
          <Col>
            <p className="text-center text-gray-800 font-semibold">
              Subscription Status:{" "}
              <span
                className={`${
                  isActive ? "text-green-500" : "text-red-500"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </p>
            <div className="flex justify-center mt-2">
              <Switch
                checked={isActive}
                onChange={handleToggle}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SubscriptionTab;
