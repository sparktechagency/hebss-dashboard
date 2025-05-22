import React from "react";
import { Table, Button, Row, Col, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";
import { useGetCurrentInvoiceByUserIdQuery } from "../../redux/features/invoice/invoiceApi";

const primaryColor = "#FF4D4F";

const InvoiceTab = ({ userId }) => {
  // Fetch current invoice by userId
  const { data, isLoading, isError, error } = useGetCurrentInvoiceByUserIdQuery(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spin size="large" tip="Loading invoice..." />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error loading invoice"
        type="error"
        description={error?.data?.message || error?.error || "Failed to fetch invoice data."}
      />
    );
  }

  // If no invoice data
  if (!data?.data) {
    return <Alert message="No current invoice found." type="info" />;
  }

  const invoice = data.data;

  // Map soldBooks with book description and quantity
  // Since you only have bookId and quantity, adjust description as needed or fetch book details separately
  const invoiceData = invoice.soldBooks.map((item, index) => ({
    key: item._id || index.toString(),
    description: `Book ID: ${item.bookId}`, // Replace with book title if you fetch it separately
    quantity: item.quantity,
    baseCost: "$0", // Base cost is not in response; adjust if you have data
    total: "$0",    // Total cost per item; compute if you have prices
  }));

  // Compute totalCost from invoice.totalAmount if available
  const totalCost = invoice.totalAmount || 0;

  const columns = [
    { title: "Serial No.", dataIndex: "key", key: "key" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Skip",
      dataIndex: "skip",
      key: "skip",
      render: () => <input type="checkbox" />,
    },
    {
      title: "Keep",
      dataIndex: "keep",
      key: "keep",
      render: () => <input type="checkbox" />,
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Base Cost", dataIndex: "baseCost", key: "baseCost" },
    { title: "Total Cost", dataIndex: "total", key: "total" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-end gap-2 mb-4">
        <Link to="/invoice-history">
          <Button
            type="default"
            style={{ border: "none", backgroundColor: primaryColor, color: "white" }}
          >
            Invoice History
          </Button>
        </Link>
        <Link to="/book-list">
          <Button
            type="default"
            style={{ border: "none", backgroundColor: primaryColor, color: "white" }}
          >
            Add New Book
          </Button>
        </Link>
      </div>

      {/* Invoice Header */}
      <div className="flex justify-between mb-4">
        <div>
          <p className="font-semibold">Invoice From:</p>
          <p>Virginia Walker</p>
          <p>9694 Krajick Locks Suite 635</p>
        </div>
        <div>
          <p className="font-semibold">Invoice To:</p>
          <p>{invoice.user.email}</p>
          <p>{invoice.user.phone}</p>
        </div>
        <div>
          <p className="font-semibold">
            Invoice Date: {new Date(invoice.createdAt).toLocaleDateString()}
          </p>
          <p className="font-semibold">
            Due Date: {/* You can add due date from invoice if available */}
          </p>
        </div>
      </div>

      {/* Invoice Table */}
      <Table columns={columns} dataSource={invoiceData} pagination={false} rowKey="key" />

      {/* Total Cost */}
      <Row justify="end" className="mt-4">
        <Col>
          <p className="font-semibold">
            Total: <span style={{ color: primaryColor }}>${totalCost}</span>
          </p>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row justify="end" className="mt-6">
        <Col>
          <Button icon={<PrinterOutlined />} style={{ marginRight: "10px", color: primaryColor }}>
            Print
          </Button>
          {/* Add Send button if needed */}
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceTab;
