/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateOrUpdatePrivacyPolicyMutation } from "../../../redux/features/about/aboutApi";

const PrivacyPolicy = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [createOrUpdatePrivacyPolicy] =
    useCreateOrUpdatePrivacyPolicyMutation();

  const handleSubmit = async (value) => {
    setLoading(true);
    try {
      await createOrUpdatePrivacyPolicy({ privacyPolicy: value });
      message.success("Privacy Policy updated successfully");
    } catch (error) {
      message.error("Failed to update Privacy Policy");
    } finally {
      setLoading(false);
    }
  };

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
          onClick={() => handleSubmit(value)}
          className="px-6 py-2 mt-16 text-white rounded-lg bg-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Privacy Policy"}
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
