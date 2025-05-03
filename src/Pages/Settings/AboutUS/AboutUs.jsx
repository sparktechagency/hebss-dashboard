import React, { useState } from "react";
import { Form, Input, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateOrUpdateAboutUsMutation } from "../../../redux/features/about/aboutApi";
// import { useCreateOrUpdateAboutUsMutation } from "../../redux/features/about/aboutApi";  

const AboutUs = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Use the createOrUpdateAboutUs mutation from RTK Query
  const [createOrUpdateAboutUs, { isLoading }] = useCreateOrUpdateAboutUsMutation();

  const onFinish = async (values) => {
    setLoading(true);

    // Log form values and content to ensure correct data is being sent
    console.log("Form Values:", values);
    console.log("Quill Content:", content);

    try {
      // Create or Update About Us content
      const response = await createOrUpdateAboutUs({
        title: values.title, 
        description: content,  // Send the content (description)
      }).unwrap();

      message.success("About Us updated successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error during API call:", error);  // Log the complete error object

      if (error?.data) {
        // Log and display specific error message
        console.error("API Error Data:", error.data);
        message.error(`Failed to update About Us: ${error.data?.message || error.message}`);
      } else {
        message.error("Failed to update About Us. Please try again.");
      }

      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">About Us</h2>
        <Form name="aboutUs" onFinish={onFinish} layout="vertical">
          {/* Title Input */}
          {/* <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item> */}

          {/* Content (ReactQuill Editor) */}
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input content!" }]}
          >
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-[200px] mb-12"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mt-16">
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-lg bg-primary"
              disabled={loading || isLoading}
            >
              {loading || isLoading ? "Updating..." : "Update About Us"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AboutUs;
