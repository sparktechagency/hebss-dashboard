import React, { useState, useEffect } from "react";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useCreateOrUpdatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} from "../../../redux/features/about/aboutApi";

const PrivacyPolicy = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetPrivacyPolicyQuery();

  const [createOrUpdatePrivacyPolicy] = useCreateOrUpdatePrivacyPolicyMutation();

  useEffect(() => {
    // console.log("Fetched data:", data);
    if (data && data.data && data.data.privacyPolicy) {
      setValue(data.data.privacyPolicy);
    } else {
      setValue(""); // clear if no data
    }
  }, [data]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createOrUpdatePrivacyPolicy({ privacyPolicy: value }).unwrap();
      message.success("Privacy Policy updated successfully");
      refetch(); // re-fetch after update to sync UI
    } catch (err) {
      console.error("Update failed:", err);
      message.error("Failed to update Privacy Policy");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading Privacy Policy...</p>;
  if (error) return <p>Error loading Privacy Policy. Try refreshing.</p>;

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">Privacy Policy</h2>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="h-[200px] mb-12"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-2 mt-16 text-white rounded-lg bg-primary"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Privacy Policy"}
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
