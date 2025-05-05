import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Input,
  Select,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useEditBlogMutation,
  useGetAllBlogsQuery,
} from "../../redux/features/blog/blogApi";

const primaryColor = "#F37975";
const { Option } = Select;

const BlogPage = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    category: "",
    title: "",
    description: "",
    image: null,
  });

  // Use the createBlog mutation from Redux Toolkit
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [editBlog] = useEditBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  // Fetch blogs using the Redux Toolkit Query
  const {
    data: blogs = [],
    error,
    isLoading: blogsLoading,
  } = useGetAllBlogsQuery();

  // Log the fetched blogs to check the structure
  useEffect(() => {
    console.log("Blogs Data:", blogs); // Log the data to inspect its structure
  }, [blogs]);

  console.log(blogs.data);

  // Fetch categories when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://10.0.60.55:5003/v1/category/retrieve"
        ); // Update with your category endpoint
        const data = await response.json();
        if (data.status === "success") {
          setCategories(data.data); // Set categories state
        } else {
          message.error("Failed to fetch categories");
        }
      } catch (error) {
        // console.error("Error fetching categories:", error);
        message.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  // Handle Create Blog
  const handleCreateBlog = () => {
    setIsEditing(false);
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

  const handleSaveBlog = async () => {
    try {
      const blogData = {
        category: newBlog.category,
        title: newBlog.title,
        description: newBlog.description,
        image: newBlog.image,
      };

      if (isEditing) {
        // Edit the blog
        await editBlog({ id: currentBlog._id, data: blogData }).unwrap();
        message.success("Blog updated successfully!");
      } else {
        // Create new blog
        await createBlog(blogData).unwrap();
        message.success("Blog created successfully!");
      }

      setIsModalVisible(false);
    } catch (error) {
      message.error("An error occurred while saving the blog.");
    }
  };

  // Handle Delete Blog
  // const handleDeleteBlog = (key) => {
  //   setBlogs(blogList.filter((blog) => blog.key !== key));
  // };
  const handleDeleteBlog = async (_id) => {
    try {
      await deleteBlog(_id).unwrap();
      message.success("Blog deleted successfully!");
    } catch (error) {
      message.error("An error occurred while deleting the blog.");
    }
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

  // Check if blogs are still loading or if there's an error
  if (blogsLoading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="mb-4 text-2xl font-semibold">Blog</h3>
        <Button
          type="primary"
          onClick={handleCreateBlog}
          style={{ marginBottom: "20px", backgroundColor: primaryColor }}
        >
          Create Blog
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {blogs.data && blogs.data.length > 0 ? (
          blogs.data.map((blog) => (
            <Col key={blog.key} span={8}>
              <Card
                title={blog.title}
                cover={<img alt={blog.title} src={AllImages.blog} />}
                actions={[
                  <EditOutlined onClick={() => handleEditBlog(blog)} />,
                  <DeleteOutlined
                    onClick={() => handleDeleteBlog(blog._id)}
                    style={{ color: "red" }}
                  />,
                ]}
              >
                <p>{blog.description}</p>
              </Card>
            </Col>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
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
          <Button
            key="save"
            type="primary"
            onClick={handleSaveBlog}
            loading={isLoading}
          >
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
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.title} ({category.ageGroup})
              </Option>
            ))}
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
