import React, { useState } from "react";
import { Table, Button, Row, Col, Input, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

// Sample invoice history data
const invoiceHistoryData = [
  {
    key: "1",
    invoiceId: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "04 Sep 2019",
    price: "$80",
  },
  {
    key: "2",
    invoiceId: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "28 Oct 2019",
    price: "$80",
  },
  {
    key: "3",
    invoiceId: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "23 Nov 2019",
    price: "$80",
  },
  {
    key: "4",
    invoiceId: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "05 Dec 2019",
    price: "$80",
  },
  {
    key: "5",
    invoiceId: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "29 Jan 2019",
    price: "$80",
  },
  {
    key: "6",
    invoiceId: "00006",
    name: "Alfred Murray",
    address: "543 Weinmann Mountain",
    date: "29 Feb 2019",
    price: "$80",
  },
  {
    key: "7",
    invoiceId: "00007",
    name: "Maggie Sullivan",
    address: "New Scottieberg",
    date: "29 Mar 2019",
    price: "$80",
  },
  {
    key: "8",
    invoiceId: "00008",
    name: "Rosie Todd",
    address: "New Jon",
    date: "30 Apr 2019",
    price: "$80",
  },
  {
    key: "9",
    invoiceId: "00009",
    name: "Dollie Hines",
    address: "124 Lyla Forge Suite 975",
    date: "29 May 2019",
    price: "$80",
  },
];

const InvoiceHistoryPage = () => {
  const [searchText, setSearchText] = useState(""); // For search functionality
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Store selected invoice for modal
  const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility

  // Handle viewing an invoice
  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true); // Show modal when an invoice is clicked
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInvoice(null); // Clear the selected invoice when modal is closed
  };

  // Columns for the table
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
          onClick={() => handleView(record)} // Show modal when View button is clicked
        >
          View
        </Button>
      ),
    },
  ];

  // Filter data based on search text
  const filteredData = invoiceHistoryData.filter(
    (invoice) =>
      invoice.name.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.address.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.date.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Invoice History</h3>

      {/* Search Bar */}
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

      {/* Table with pagination */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 5,
        }}
        rowKey="key"
      />

      {/* Modal to show invoice details */}
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
