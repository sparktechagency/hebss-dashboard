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

  const userId = localStorage.getItem("userId") || "";

  const { data, error, isLoading } = useGetInvoiceHistoryByIdQuery(userId, {
    skip: !userId,
  });

  // console.log("Invoice history data:", data);

 

  // **Fix here:** invoice data is in `data` as an array, not `data.invoices`
  const invoiceHistoryData = Array.isArray(data) ? data : [];


//    {!isLoading && !error && invoiceHistoryData.length === 0 && (
//   <Alert
//     message="No invoices found for this user."
//     type="info"
//     showIcon
//     className="mb-4"
//   />
// )}

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInvoice(null);
  };

  // Update columns as per your invoice data structure:
  const columns = [
    { title: "Invoice ID", dataIndex: "invoiceId", key: "invoiceId" },
    { title: "Name", dataIndex: "user", key: "user", render: user => user?.email || "N/A" },
    { title: "Address", dataIndex: "user", key: "address", render: user => user?.address || "N/A" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt", render: date => new Date(date).toLocaleDateString() },
    { title: "Price", dataIndex: "totalAmount", key: "totalAmount", render: amount => `$${amount}` },
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

  // Adjust search filtering for relevant fields
  const filteredData = invoiceHistoryData.filter((invoice) => {
    const userEmail = invoice.user?.email?.toLowerCase() || "";
    const address = invoice.user?.address?.toLowerCase() || "";
    const createdAt = invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString().toLowerCase() : "";

    return (
      userEmail.includes(searchText.toLowerCase()) ||
      address.includes(searchText.toLowerCase()) ||
      createdAt.includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-semibold">Invoice History</h3>

      <Row justify="end" className="mb-4">
        <Col>
          <Input
            placeholder="Search invoices..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
        </Col>
      </Row>

      {!userId && (
        <Alert message="User ID not found. Please log in." type="warning" showIcon className="mb-4" />
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
          rowKey={(record) => record._id || record.invoiceId}
        />
      )}

      {selectedInvoice && (
        <Modal title="Invoice Details" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <p><strong>Invoice ID:</strong> {selectedInvoice.invoiceId}</p>
          <p><strong>Name:</strong> {selectedInvoice.user?.email || "N/A"}</p>
          <p><strong>Address:</strong> {selectedInvoice.user?.address || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(selectedInvoice.createdAt).toLocaleDateString()}</p>
          <p><strong>Price:</strong> ${selectedInvoice.totalAmount}</p>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceHistoryPage;
