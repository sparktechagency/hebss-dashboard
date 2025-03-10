import React, { useState } from "react";
import { Tabs } from "antd";
import ProfileTab from "./ProfileTab";
import InvoiceTab from "./InvoiceTab";
import CurrentBoxTab from "./CurrentTab";
import SubscriptionTab from "./SubscriptionTab";
import SendMailTab from "./SendMail";

const { TabPane } = Tabs;

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex">
      <div className="w-full shadow-lg rounded-lg p-6 bg-white">
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
          <TabPane tab="Profile" key="profile">
            <ProfileTab isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </TabPane>

          <TabPane tab="Invoice" key="invoice">
            <InvoiceTab />
          </TabPane>

          <TabPane tab="Current Box" key="currentBox">
            <CurrentBoxTab />
          </TabPane>

          <TabPane tab="Subscription" key="subscription">
            <SubscriptionTab />
          </TabPane>

          <TabPane tab="Send Mail" key="sendMail">
            <SendMailTab />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDetails;
