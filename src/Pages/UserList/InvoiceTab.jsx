import React, { useRef } from "react";
import { Table, Button, Row, Col, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";
import { MdSpatialTracking } from "react-icons/md";
import { useGetCurrentInvoiceByUserIdQuery } from "../../redux/features/invoice/invoiceApi";

const primaryColor = "#FF4D4F";

const InvoiceTab = ({ userId }) => {
  const { data, isLoading, isError, error } = useGetCurrentInvoiceByUserIdQuery(userId);
  const printRef = useRef();

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

  if (!data?.data) {
    return <Alert message="No current invoice found." type="info" />;
  }

  const invoice = data.data;

  const getBookTitle = (bookId) => {
    // Replace with actual logic to fetch book title
    return `Book Title for ID: ${bookId}`;
  };

  const invoiceData = invoice.soldBooks.map((item, index) => {
    const keepQty = item.quantity || 0;
    const maxQty = 1;
    const skipQty = maxQty - keepQty > 0 ? maxQty - keepQty : 0;

    return {
      key: item._id || index.toString(),
      invoiceId: invoice.invoiceId,
      description: getBookTitle(item.bookId),
      quantity: item.quantity,
      baseCost: `$${invoice.dueAmount}`,
      total: `$${invoice.totalAmount}`,
      keep: keepQty,
      skip: skipQty,
    };
  });

  const columns = [
    { title: "Invoice ID", dataIndex: "invoiceId", key: "invoiceId" },
    { title: "Book Title", dataIndex: "description", key: "description" },
    { title: "Skip", dataIndex: "skip", key: "skip" },
    { title: "Keep", dataIndex: "keep", key: "keep" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Base Cost", dataIndex: "baseCost", key: "baseCost" },
    { title: "Total Cost", dataIndex: "total", key: "total" },
  ];

  // Print handler
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=900");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            @media print {
              @page { size: A4; margin: 20mm; }
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #333;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f0f0f0;
            }
            .header-section {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .header-section div {
              flex: 1;
            }
            .header-section div:not(:last-child) {
              margin-right: 20px;
            }
            h2 {
              margin-top: 0;
            }
            .total-row {
              margin-top: 20px;
              text-align: right;
              font-weight: bold;
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // Tracking button click handler
  const handleTrackingClick = () => {
    if (invoice.trackingUrl) {
      window.open(invoice.trackingUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("Tracking URL not available");
    }
  };

  return (
    <div className="p-6">
      {/* Action Buttons */}
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

      {/* Printable Invoice Content */}
      <div ref={printRef}>
        {/* Invoice Header */}
        <div className="header-section">
          <div>
            <h2>Invoice From:</h2>
            <p>Virginia Walker</p>
            <p>9694 Krajick Locks Suite 635</p>
          </div>
          <div>
            <h2>Invoice To:</h2>
            <p>{invoice.user.email}</p>
            <p>{invoice.user.phone}</p>
          </div>
          <div>
            <h2>Dates:</h2>
            <p>Invoice Date: {new Date(invoice.createdAt).toLocaleDateString()}</p>
            <p>Due Date: {new Date(invoice.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Invoice Table */}
        <Table
          columns={columns}
          dataSource={invoiceData}
          pagination={false}
          rowKey="key"
          bordered
          style={{ marginTop: 20 }}
        />

        {/* Total Cost */}
        <div className="total-row">
          Total: <span style={{ color: primaryColor }}>${invoice.totalAmount || 0}</span>
        </div>
      </div>

      {/* Buttons */}
      <Row justify="end" className="mt-6">
        <Col>
          <Button
            onClick={handleTrackingClick}
            icon={<MdSpatialTracking />}
            style={{ marginRight: "10px", color: primaryColor }}
          >
            Tracking Product
          </Button>
          <Button
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            style={{ marginRight: "10px", color: primaryColor }}
          >
            Print
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceTab;
