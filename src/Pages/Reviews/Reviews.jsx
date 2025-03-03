import React, { useState } from "react";
import { Table, Button, Input, Row, Col, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

// Sample review data
const reviewData = [
  {
    key: "1",
    user: "Abdul",
    feedbackDate: "8/16/13",
    comments: "Os botões estão bem posicionados ...",
    review: "4.5/5",
  },
  {
    key: "2",
    user: "basar",
    feedbackDate: "4/21/12",
    comments: "A navegação pelo site é intuitiva e ...",
    review: "4.5/5",
  },
  {
    key: "3",
    user: "habiba",
    feedbackDate: "11/7/16",
    comments: "Alguns links não funcionam corretam...",
    review: "4.5/5",
  },
  {
    key: "4",
    user: "basar",
    feedbackDate: "5/30/14",
    comments: "Alguns links não funcionam corretam...",
    review: "4.5/5",
  },
  {
    key: "5",
    user: "habiba",
    feedbackDate: "6/21/19",
    comments: "A página demora muito para carrega...",
    review: "4.5/5",
  },
  {
    key: "6",
    user: "abdul",
    feedbackDate: "8/15/17",
    comments: "A organização do conteúdo na página...",
    review: "4.5/5",
  },
  {
    key: "7",
    user: "basar",
    feedbackDate: "2/11/12",
    comments: "Os botões estão bem posicionados ...",
    review: "4.5/5",
  },
  {
    key: "8",
    user: "habiba",
    feedbackDate: "5/19/12",
    comments: "Alguns links não funcionam corretam...",
    review: "4.5/5",
  },
  {
    key: "9",
    user: "basar",
    feedbackDate: "4/4/18",
    comments: "A combinação de cores usada é ag...",
    review: "4.5/5",
  },
  {
    key: "10",
    user: "habiba",
    feedbackDate: "9/4/12",
    comments: "A página demora muito para carrega...",
    review: "4.5/5",
  },
  {
    key: "11",
    user: "abdul",
    feedbackDate: "8/21/15",
    comments: "A organização do conteúdo na página...",
    review: "4.5/5",
  },
  {
    key: "12",
    user: "basar",
    feedbackDate: "8/21/15",
    comments: "A página demora muito para carrega...",
    review: "4.5/5",
  },
];

const ReviewsPage = () => {
  const [searchText, setSearchText] = useState(""); // For search functionality
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectedReview, setSelectedReview] = useState(null); // Selected review details

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

  // Columns for the table
  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Feedback Date", dataIndex: "feedbackDate", key: "feedbackDate" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Review", dataIndex: "review", key: "review" },
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

  // Filter data based on search text
  const filteredData = reviewData.filter(
    (review) =>
      review.user.toLowerCase().includes(searchText.toLowerCase()) ||
      review.feedbackDate.toLowerCase().includes(searchText.toLowerCase()) ||
      review.comments.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

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
        rowKey="key"
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
            <strong>Feedback Date:</strong> {selectedReview.feedbackDate}
          </p>
          <p>
            <strong>Comments:</strong> {selectedReview.comments}
          </p>
          <p>
            <strong>Review:</strong> {selectedReview.review}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default ReviewsPage;
