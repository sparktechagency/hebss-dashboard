import React, { useState, useEffect, useMemo, useRef } from "react";
import { Table, Checkbox, Button, Row, Col, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";
import { MdSpatialTracking } from "react-icons/md";
import { useGetCurrentInvoiceByUserIdQuery } from "../../redux/features/invoice/invoiceApi";

const primaryColor = "#FF4D4F";

const InvoiceTab = ({ userId }) => {
  const { data, isLoading, isError, error } = useGetCurrentInvoiceByUserIdQuery(userId);
  const printRef = useRef();

  // Track which books are skipped
  const [skipState, setSkipState] = useState({});
  // Store original quantities (fixed)
  const [originalQuantities, setOriginalQuantities] = useState({});

  useEffect(() => {
    if (!data?.data) return;

    const initialSkip = {};
    const originalQtys = {};

    data.data.box.books.forEach((book) => {
      const soldBook = data.data.soldBooks.find((sb) => sb.bookId._id === book._id);
      initialSkip[book._id] = !soldBook;
      originalQtys[book._id] = soldBook?.quantity || 0;
    });

    setSkipState(initialSkip);
    setOriginalQuantities(originalQtys);
  }, [data]);

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
  const baseCost = Number(invoice.dueAmount) || 0;

  const toggleSkip = (bookId) => {
    setSkipState((prev) => ({ ...prev, [bookId]: !prev[bookId] }));
  };

  const invoiceData = useMemo(() => {
    return invoice.box.books.map((book) => {
      const skipped = skipState[book._id] ?? true;
      const quantity = skipped ? 0 : originalQuantities[book._id] || 0;
      const total = quantity * baseCost;

      return {
        key: book._id,
        invoiceId: invoice.invoiceId,
        description: book.name,
        skip: skipped,
        quantity,
        baseCost,
        total,
      };
    });
  }, [invoice.box.books, skipState, originalQuantities, baseCost, invoice.invoiceId]);

  const totalAmount = useMemo(() => {
    return invoiceData.reduce((acc, book) => acc + book.total, 0);
  }, [invoiceData]);

  const columns = [
    {
      title: "S/N",
      key: "serial",
      render: (text, record, index) => index + 1,
    },
    { title: "Book Title", dataIndex: "description", key: "description" },
    {
      title: "Skip",
      dataIndex: "key",
      key: "skip",
      render: (bookId) => (
        <Checkbox checked={!!skipState[bookId]} onChange={() => toggleSkip(bookId)} />
      ),
    },
    {
      title: "Keep",
      dataIndex: "key",
      key: "keep",
      render: (bookId) => (
        <Checkbox checked={!skipState[bookId]} onChange={() => toggleSkip(bookId)} />
      ),
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Base Cost",
      dataIndex: "baseCost",
      key: "baseCost",
      render: (cost) => `$${cost.toFixed(2)}`,
    },
    {
      title: "Total Cost",
      dataIndex: "total",
      key: "total",
      render: (total) => (typeof total === "number" ? `$${total.toFixed(2)}` : "$0.00"),
    },
  ];

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=900");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            @media print { @page { size: A4; margin: 20mm; } }
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
            .header-section { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .header-section div { flex: 1; }
            .header-section div:not(:last-child) { margin-right: 20px; }
            h2 { margin-top: 0; }
            .total-row { margin-top: 20px; text-align: right; font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handleTrackingClick = () => {
    if (invoice.trackingUrl) window.open(invoice.trackingUrl, "_blank", "noopener,noreferrer");
    else alert("Tracking URL not available");
  };

  const handleTrackingLabel = () => {
    if (invoice.returnLabelUrl) window.open(invoice.returnLabelUrl, "_blank", "noopener,noreferrer");
    else alert("Return Label URL not available");
  };

  return (
    <div className="p-6">
      <div className="flex justify-end gap-2 mb-4">
        <Link to="/invoice-history">
          <Button type="default" style={{ border: "none", backgroundColor: primaryColor, color: "white" }}>
            Invoice History
          </Button>
        </Link>
        <Link to="/book-list">
          <Button type="default" style={{ border: "none", backgroundColor: primaryColor, color: "white" }}>
            Add New Book
          </Button>
        </Link>
      </div>

      <div ref={printRef}>
        <div className="flex justify-between header-section">
          <div>
            <h2>Invoice From:</h2>
            <p>Virginia Walker</p>
            <p>9694 Krajick Locks Suite 635</p>
          </div>
          <div>
            <h2>Invoice To:</h2>
            <p>{invoice.user.email}</p>
            <p>{invoice.user.phone}</p>
            <p>Invoice Date: {new Date(invoice.createdAt).toLocaleDateString()}</p>
            <p>Due Date: {new Date(invoice.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={invoiceData}
          pagination={false}
          rowKey="key"
          bordered
          style={{ marginTop: 20 }}
        />

        <div
          className="total-row"
          style={{ marginTop: 20, textAlign: "right", fontWeight: "bold", fontSize: 18 }}
        >
          Total: <span style={{ color: primaryColor }}>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <Row justify="end" className="mt-6">
        <Col>
          <Button
            onClick={handleTrackingClick}
            icon={<MdSpatialTracking />}
            style={{ marginRight: 10, color: primaryColor }}
          >
            Tracking Status
          </Button>
          <Button
            onClick={handleTrackingLabel}
            icon={<MdSpatialTracking />}
            style={{ marginRight: 10, color: primaryColor }}
          >
            Tracking Label
          </Button>
          <Button
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            style={{ marginRight: 10, color: primaryColor }}
          >
            Print
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceTab;
