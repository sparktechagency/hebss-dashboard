import React, { useState } from "react";
import { Card, Switch, Row, Col } from "antd";

const SubscriptionTab = () => {
  const [isActive, setIsActive] = useState(true); 

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
      <h3 className="mb-4 text-xl font-semibold">Purchased Subscription</h3>
      <Card
        key={sub.id}
        className="relative w-1/4 p-6 bg-white border border-gray-200 shadow-lg rounded-xl"
      >
        <h3 className="text-xl font-bold text-center text-gray-800">
          {sub.title}
        </h3>
        <p className="text-sm text-center text-gray-500">{sub.chargeType}</p>
        <p className="my-4 text-3xl font-bold text-center text-gray-900">
          ${sub.price}
        </p>

        <ul className="text-sm text-center text-gray-700">
          {sub.features.map((feature, index) => (
            <li key={index} className="py-1">
              {feature}
            </li>
          ))}
        </ul>

        {/* Subscription status and toggle */}
        <Row justify="center" className="mt-6">
          <Col>
            <p className="font-semibold text-center text-gray-800">
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
