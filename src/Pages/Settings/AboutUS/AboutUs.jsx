import React, { useState } from "react";
import { Form, Input, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutUs = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success("About Us updated successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">About Us</h2>
        <Form name="aboutUs" onFinish={onFinish} layout="vertical">
          {/* <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item> */}

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

          <Form.Item className="mt-16">
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-lg bg-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update About Us"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AboutUs;
