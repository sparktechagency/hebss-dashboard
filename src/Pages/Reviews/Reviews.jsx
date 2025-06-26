import React, { useState } from "react";
import { Table, Button, Input, Row, Col, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useGetAllReviewsQuery } from "../../redux/features/reviews/reviewsApi";

const { Search } = Input;

const ReviewsPage = () => {
  const [searchText, setSearchText] = useState(""); // For search functionality
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectedReview, setSelectedReview] = useState(null); // Selected review details

  // Fetch reviews using the API
  const { data: response = {}, isLoading, error } = useGetAllReviewsQuery();
  const reviews = response?.data || []; // Get reviews from the response

  // console.log(reviews)

  // Handle opening modal and setting selected review
  const handleViewClick = (review) => {
    setSelectedReview(review);
    setIsModalVisible(true); // Show modal when View button is clicked
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedReview(null);
  };

  const columns = [
    { title: "User", dataIndex: "user", key: "user" }, // Display user info
    { title: "Comment", dataIndex: "comment", key: "comment" }, // Display comment
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" }, // Display createdAt date
    { title: "Difficulty", dataIndex: "difficulty", key: "difficulty" }, // Display difficulty
    { title: "Reader Thought", dataIndex: "readerThought", key: "readerThought" }, // Display reader thought
    { title: "Topic & Theme", dataIndex: "topicAndTheme", key: "topicAndTheme" }, // Display topic and theme
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          icon={<ArrowRightOutlined />}
          style={{ backgroundColor: "#FF4D4F", color: "white" }}
          onClick={() => handleViewClick(record)} // Open modal with the clicked review details
        >
          View
        </Button>
      ),
    },
  ];
  const filteredData = reviews.filter(
    (review) =>
      review.user.toLowerCase().includes(searchText.toLowerCase()) ||
      review.feedbackDate.toLowerCase().includes(searchText.toLowerCase()) ||
      review.comments.toLowerCase().includes(searchText.toLowerCase())
  );

  // Show loading or error messages
  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-semibold">Reviews</h3>

      {/* Search Bar */}
      <Row justify="end" className="mb-4">
        <Col>
          <Input
            placeholder="Search reviews..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "300px" }}
          />
        </Col>
      </Row>

      {/* Table with pagination */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 12,
        }}
        rowKey="orderId"
      />

      {/* Modal to show review details */}
      {selectedReview && (
        <Modal
          title="Review Details"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
           <p>
            <strong>User:</strong> {selectedReview.user}
          </p>
          <p>
            <strong>Comment:</strong> {selectedReview.comment}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(selectedReview.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Difficulty:</strong> {selectedReview.difficulty}
          </p>
          <p>
            <strong>Reader Thought:</strong> {selectedReview.readerThought}
          </p>
          <p>
            <strong>Topic & Theme:</strong> {selectedReview.topicAndTheme}
          </p>

        </Modal>
      )}
    </div>
  );
};

export default ReviewsPage;
