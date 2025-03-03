import React, { useState } from "react";
import { Card, Button, Modal, Input, Select, Row, Col, Upload } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";

// Sample blog data
const blogData = [
  {
    key: "1",
    category: "Tech",
    title: "The Future of AI",
    description:
      "Exploring the advancements and impact of Artificial Intelligence.",
    image: "image1.jpg",
  },
  {
    key: "2",
    category: "Health",
    title: "10 Tips for Healthy Living",
    description: "Practical advice for a healthier lifestyle.",
    image: "image2.jpg",
  },
  {
    key: "3",
    category: "Business",
    title: "Effective Leadership Skills",
    description: "How to develop strong leadership skills in business.",
    image: "image3.jpg",
  },
  // Add more blog data as needed
];

const primaryColor = "#F37975";

const { Option } = Select;

const BlogPage = () => {
  const [blogs, setBlogs] = useState(blogData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Flag to track if it's edit mode
  const [currentBlog, setCurrentBlog] = useState(null); // Store current blog data for editing

  const [newBlog, setNewBlog] = useState({
    category: "",
    title: "",
    description: "",
    image: null,
  });

  // Handle Create Blog
  const handleCreateBlog = () => {
    setIsEditing(false); // Reset to create mode
    setNewBlog({
      category: "",
      title: "",
      description: "",
      image: null,
    });
    setIsModalVisible(true);
  };

  // Handle Edit Blog
  const handleEditBlog = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
    setNewBlog({
      category: blog.category,
      title: blog.title,
      description: blog.description,
      image: blog.image,
    });
    setIsModalVisible(true);
  };

  // Handle Save Blog (Create or Edit)
  const handleSaveBlog = () => {
    if (isEditing) {
      // Update existing blog
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.key === currentBlog.key ? { ...blog, ...newBlog } : blog
        )
      );
    } else {
      // Create a new blog
      setBlogs([
        ...blogs,
        {
          ...newBlog,
          key: blogs.length + 1,
          image: newBlog.image || "default.jpg", // Image fallback
        },
      ]);
    }
    setIsModalVisible(false);
  };

  // Handle Delete Blog
  const handleDeleteBlog = (key) => {
    setBlogs(blogs.filter((blog) => blog.key !== key));
  };

  // Handle Modal Close
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Handle form input changes
  const handleInputChange = (e, field) => {
    setNewBlog({ ...newBlog, [field]: e.target.value });
  };

  // Handle category select
  const handleCategoryChange = (value) => {
    setNewBlog({ ...newBlog, category: value });
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    setNewBlog({ ...newBlog, image: file.name });
    return false; // Prevent upload to the server
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-4">Blog</h3>
        <Button
          type="primary"
          onClick={handleCreateBlog}
          style={{ marginBottom: "20px", backgroundColor: primaryColor }}
        >
          Create Blog
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {blogs.map((blog) => (
          <Col key={blog.key} span={8}>
            <Card
              title={blog.title}
              cover={<img alt={blog.title} src={AllImages.blog} />}
              actions={[
                <EditOutlined onClick={() => handleEditBlog(blog)} />,
                <DeleteOutlined
                  onClick={() => handleDeleteBlog(blog.key)}
                  style={{ color: "red" }}
                />,
              ]}
            >
              <p>{blog.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for creating or editing blog */}
      <Modal
        title={isEditing ? "Edit Blog" : "Create Blog"}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveBlog}>
            Save
          </Button>,
        ]}
      >
        <div>
          <label>Category</label>
          <Select
            value={newBlog.category}
            onChange={handleCategoryChange}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <Option value="Tech">Tech</Option>
            <Option value="Health">Health</Option>
            <Option value="Business">Business</Option>
            <Option value="Lifestyle">Lifestyle</Option>
          </Select>

          <label>Title</label>
          <Input
            value={newBlog.title}
            onChange={(e) => handleInputChange(e, "title")}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Description</label>
          <Input.TextArea
            value={newBlog.description}
            onChange={(e) => handleInputChange(e, "description")}
            rows={4}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Image</label>
          <Upload
            beforeUpload={handleImageUpload}
            showUploadList={false}
            style={{ marginBottom: "10px" }}
          >
            <Button>Upload Image</Button>
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default BlogPage;
