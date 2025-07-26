import React, { useState } from "react";
import { Table, Button, Input, Row, Col, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useGetAllReviewsQuery } from "../../redux/features/reviews/reviewsApi";

const { Search } = Input;

const ReviewsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const { data: response = {}, isLoading, error } = useGetAllReviewsQuery();
  const reviews = response?.data || [];
  


  const handleViewClick = (review) => {
    setSelectedReview(review);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedReview(null);
  };

  // Handle search filtering with null-safe logic
  const filteredData = reviews.filter((review) => {
    const userName = review.user?.name || "";
    const createdAt = review.createdAt || "";
    const comment = review.comment || "";
    return (
      userName.toLowerCase().includes(searchText.toLowerCase()) ||
      createdAt.toLowerCase().includes(searchText.toLowerCase()) ||
      comment.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const columns = [
    {
      title: "Name",
      key: "user",
      render: (_, record) => record.user?.firstName || "Unknown",
    },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    { title: "Difficulty", dataIndex: "difficulty", key: "difficulty" },
    {
      title: "Reader Thought",
      dataIndex: "readerThought",
      key: "readerThought",
    },
    {
      title: "Topic & Theme",
      dataIndex: "topicAndTheme",
      key: "topicAndTheme",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          icon={<ArrowRightOutlined />}
          style={{ backgroundColor: "#FF4D4F", color: "white" }}
          onClick={() => handleViewClick(record)}
        >
          View
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-semibold">Reviews</h3>

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

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 12 }}
        rowKey={(record) => record.id || record.createdAt}
        locale={{ emptyText: "No reviews found matching your search." }}
      />

      {selectedReview && (
        <Modal
          title="Review Details"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          <p>
            <strong>User:</strong> {selectedReview.user?.name || "Unknown"}
          </p>
          <p>
            <strong>Comment:</strong> {selectedReview.comment || "N/A"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(selectedReview.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Difficulty:</strong> {selectedReview.difficulty || "N/A"}
          </p>
          <p>
            <strong>Reader Thought:</strong>{" "}
            {selectedReview.readerThought || "N/A"}
          </p>
          <p>
            <strong>Topic & Theme:</strong>{" "}
            {selectedReview.topicAndTheme || "N/A"}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default ReviewsPage;
