import React, { useState } from "react";
import { Tabs, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";

import ProfileTab from "./ProfileTab";
import InvoiceTab from "./InvoiceTab";
import CurrentBoxTab from "./CurrentTab";
import SubscriptionTab from "./SubscriptionTab";
import SendMailTab from "./SendMail";
import TabPane from "antd/es/tabs/TabPane";
const UserDetails = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch user data by ID
  const { data: userData, error: userError, isLoading: userLoading } = useGetSingleUserQuery(userId);

  // console.log("User data :", userData)

  if (userLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spin size="large" tip="Loading user details..." />
      </div>
    );
  }

  if (userError) {
    return <Alert message="Error loading user" type="error" description={JSON.stringify(userError)} />;
  }

  const user = userData?.data;


  if (!user) {
    return <Alert message="User not found" type="warning" />;
  }

  // Extract categoryId safely from user data
  const categoryId = user?.survey?.category || null;

  return (
    <div className="flex min-h-screen p-6 bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
          <TabPane tab="Profile" key="profile">
            <ProfileTab user={user} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </TabPane>

          <TabPane tab="Invoice" key="invoice">
            <InvoiceTab userId={user._id} />
          </TabPane>

          <TabPane tab="Current Box" key="currentBox">
            <CurrentBoxTab categoryId={categoryId} />
          </TabPane>

          <TabPane tab="Subscription" key="subscription">
            <SubscriptionTab userId={user._id} />
          </TabPane>

          <TabPane tab="Send Mail" key="sendMail">
            <SendMailTab userId={user._id} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDetails;
