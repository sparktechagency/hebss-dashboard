import React, { useState, useEffect } from "react";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useCreateOrUpdateTremsMutation,
  useGetTermsQuery,
} from "../../../redux/features/about/aboutApi";

const TermsCondition = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError, refetch } = useGetTermsQuery();
  const [createOrUpdateTrems] = useCreateOrUpdateTremsMutation();

  useEffect(() => {
    console.log("Fetched terms data:", data);
    if (data && data.data && data.data.termsCondition) {
      setContent(data.data.termsCondition);
    }
  }, [data]);



  const handleSubmit = async () => {
  setLoading(true);
  try {
    await createOrUpdateTrems({ termsCondition: content }).unwrap();
    message.success("Terms & Conditions updated successfully!");
    await refetch(); // refetch fresh data after update
  } catch (error) {
    message.error("Failed to update Terms & Conditions. Please try again.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (isLoading) return <p>Loading Terms & Conditions...</p>;
  if (isError) return <p>Failed to load Terms & Conditions content.</p>;

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">Terms & Conditions</h2>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-[200px] mb-12"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 mt-16 text-white rounded-lg bg-primary"
        >
          {loading ? "Updating..." : "Update Terms & Conditions"}
        </button>
      </div>
    </div>
  );
};

export default TermsCondition;
