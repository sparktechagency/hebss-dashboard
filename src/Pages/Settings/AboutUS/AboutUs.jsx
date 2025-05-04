import React, { useState } from "react";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateOrUpdateAboutUsMutation } from "../../../redux/features/about/aboutApi";

const AboutUs = () => {
  const [content, setContent] = useState(""); // Content for ReactQuill
  const [loading, setLoading] = useState(false);

  // Use the mutation hook for creating/updating the "About Us" section
  const [createOrUpdateAboutUs, { isLoading }] = useCreateOrUpdateAboutUsMutation();

  // Submit handler for the form
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Create or update About Us content
      await createOrUpdateAboutUs({ description: content }).unwrap();

      message.success("About Us updated successfully!");
    } catch (error) {
      message.error("Failed to update About Us. Please try again.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">About Us</h2>

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
          className="px-6 py-2 text-white rounded-lg bg-primary"
          disabled={loading || isLoading}
        >
          {loading || isLoading ? "Updating..." : "Update About Us"}
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
