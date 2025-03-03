import React from "react";
import { Table, Button, Row, Col } from "antd";
import { Link } from "react-router-dom"; // Import Link for routing
import { PrinterOutlined, SendOutlined } from "@ant-design/icons";

// Define the primary color
const primaryColor = "#FF4D4F"; // Assuming the provided primary color is red (adjust if different)

const InvoiceTab = () => {
  const invoiceData = [
    { key: "1", description: "Product A", quantity: 2, baseCost: "$20", total: "$40" },
    { key: "2", description: "Product B", quantity: 2, baseCost: "$50", total: "$100" },
    { key: "3", description: "Product C", quantity: 5, baseCost: "$100", total: "$500" },
    { key: "4", description: "Product D", quantity: 4, baseCost: "$1000", total: "$4000" },
  ];

  const columns = [
    { title: "Serial No.", dataIndex: "key", key: "key" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Skip", dataIndex: "skip", key: "skip", render: () => <input type="checkbox" /> },
    { title: "Keep", dataIndex: "keep", key: "keep", render: () => <input type="checkbox" /> },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Base Cost", dataIndex: "baseCost", key: "baseCost" },
    { title: "Total Cost", dataIndex: "total", key: "total" },
  ];

  const totalCost = invoiceData.reduce((total, item) => total + parseFloat(item.total.replace('$', '')), 0); // Calculate total cost

  return (
    <div className="p-6">
      {/* Buttons: Invoice History and Add New - Positioned at the top */}
      <div className="flex justify-end mb-4 gap-2">
        <Link to="/invoice-history">
          <Button type="default" style={{ border: "none", backgroundColor: primaryColor, color: "white" }}>
            Invoice History
          </Button>
        </Link>
        <Link to="/add-book-to-invoice">
          <Button type="default" style={{ border: "none", backgroundColor: primaryColor, color: "white" }}>
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
          <p>Austin Miller</p>
          <p>Brookview</p>
        </div>
        <div>
          <p className="font-semibold">Invoice Date: 12 Nov 2019</p>
          <p className="font-semibold">Due Date: 25 Dec 2019</p>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} dataSource={invoiceData} pagination={false} rowKey="key" />

      {/* Total Cost and Buttons at the bottom */}
      <Row justify="end" className="mt-4">
        <Col>
          <p className="font-semibold">Total: <span style={{ color: primaryColor }}>${totalCost}</span></p>
        </Col>
      </Row>

      <Row justify="end" className="mt-6">
        <Col>
          <Button icon={<PrinterOutlined />} style={{ marginRight: "10px", color: primaryColor }}>
            Print
          </Button>
          {/* <Button type="primary" icon={<SendOutlined />}>
            Send
          </Button> */}
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceTab;
