import React, { useState } from "react";
import { Form, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateOrUpdateTremsMutation } from "../../../redux/features/about/aboutApi";

const TermsCondition = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  // Use the mutation hook for creating/updating the "Terms & Conditions" section
  const [createOrUpdateTerms, { isLoading }] = useCreateOrUpdateTremsMutation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create or update Terms & Conditions content
      await createOrUpdateTerms({ description: content }).unwrap();

      message.success("Terms & Conditions updated successfully!");
    } catch (error) {
      message.error("Failed to update Terms & Conditions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">Terms & Conditions</h2>

        {/* ReactQuill Editor */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent} // Update state with Quill editor content
          className="h-[200px] mb-12"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="px-6 py-2 mt-16 text-white rounded-lg bg-primary"
          disabled={loading || isLoading}
        >
          {loading || isLoading ? "Updating..." : "Update Terms & Conditions"}
        </button>
      </div>
    </div>
  );
};

export default TermsCondition;
