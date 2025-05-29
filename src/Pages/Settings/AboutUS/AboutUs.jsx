import React, { useState, useEffect } from "react";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useCreateOrUpdateAboutUsMutation,
  useGetAboutUsQuery,
} from "../../../redux/features/about/aboutApi";

const AboutUs = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing About Us content
  const { data, isLoading, isError, refetch } = useGetAboutUsQuery();

  // Mutation to update
  const [createOrUpdateAboutUs] = useCreateOrUpdateAboutUsMutation();

  useEffect(() => {
    if (data && data.data && data.data.description) {
      setContent(data.data.description);
    }
  }, [data]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createOrUpdateAboutUs({ description: content }).unwrap();
      message.success("About Us updated successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to update About Us. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading About Us...</p>;
  if (isError) return <p>Failed to load About Us content</p>;

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">About Us</h2>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-[200px] mb-12"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-white rounded-lg bg-primary"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update About Us"}
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
