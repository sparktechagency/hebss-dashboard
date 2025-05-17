import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col, Input, Modal, Spin, Alert } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useGetInvoiceHistoryByIdQuery } from "../../redux/features/invoice/invoiceApi";

const InvoiceHistoryPage = () => {
    const [searchText, setSearchText] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", "67c308af6f9bb7542aed1784");
      console.log("Default userId set in localStorage");
    }
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", "your-valid-jwt-token");
      console.log("Default token set in localStorage");
    }
  }, []);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId") || "";

  console.log("userId from localStorage:", userId);

  // Skip API call if userId is empty
  const { data, error, isLoading } = useGetInvoiceHistoryByIdQuery(userId, {
    skip: !userId,
  });

  // Safely extract invoices array
  const invoiceHistoryData = Array.isArray(data?.invoices) ? data.invoices : [];

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInvoice(null);
  };

  const columns = [
    { title: "Invoice ID", dataIndex: "invoiceId", key: "invoiceId" },
    { title: "NAME", dataIndex: "name", key: "name" },
    { title: "ADDRESS", dataIndex: "address", key: "address" },
    { title: "DATE", dataIndex: "date", key: "date" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "View",
      key: "view",
      render: (text, record) => (
        <Button
          icon={<EyeOutlined />}
          style={{ backgroundColor: "#FF4D4F", color: "white" }}
          onClick={() => handleView(record)}
        >
          View
        </Button>
      ),
    },
  ];

  const filteredData = invoiceHistoryData.filter(
    (invoice) =>
      invoice.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.address?.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.date?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-semibold">Invoice History</h3>

      <Row justify="end" className="mb-4">
        <Col>
          <Input
            placeholder="Search invoices..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "300px" }}
          />
        </Col>
      </Row>

      {!userId && (
        <Alert
          message="User ID not found. Please log in."
          type="warning"
          showIcon
          className="mb-4"
        />
      )}

      {isLoading && <Spin tip="Loading invoices..." />}

      {error && (
        <Alert
          message="Error loading invoices"
          description={error?.message || "Unknown error"}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      {!isLoading && !error && userId && (
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowKey={(record) => record.invoiceId || record.key}
        />
      )}

      {selectedInvoice && (
        <Modal
          title="Invoice Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <p>
            <strong>Invoice ID:</strong> {selectedInvoice.invoiceId}
          </p>
          <p>
            <strong>Name:</strong> {selectedInvoice.name}
          </p>
          <p>
            <strong>Address:</strong> {selectedInvoice.address}
          </p>
          <p>
            <strong>Date:</strong> {selectedInvoice.date}
          </p>
          <p>
            <strong>Price:</strong> {selectedInvoice.price}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceHistoryPage;
