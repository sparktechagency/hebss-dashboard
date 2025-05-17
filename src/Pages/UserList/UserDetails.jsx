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

  const userId = "67c308af6f9bb7542aed1784"; // TODO: Replace with real user ID from your auth or store

  return (
    <div className="flex min-h-screen p-6 bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
          <TabPane tab="Profile" key="profile">
            <ProfileTab isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </TabPane>

          <TabPane tab="Invoice" key="invoice">
            <InvoiceTab />
          </TabPane>

          <TabPane tab="Current Box" key="currentBox">
            <CurrentBoxTab userId={userId} />
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
