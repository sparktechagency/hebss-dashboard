import {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Spin,
  Alert,
  message,
  InputNumber,
  Radio,
} from "antd";
import { Link } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";
import { MdPaid, MdSpatialTracking } from "react-icons/md";
import { GiCargoShip } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useGetCurrentInvoiceByUserIdQuery } from "../../redux/features/invoice/invoiceApi";

const primaryColor = "#FF4D4F";

const InvoiceTab = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);
  const { data, isLoading, isError, error, refetch } =
    useGetCurrentInvoiceByUserIdQuery(userId);
  const printRef = useRef();

  const invoice = data?.data;

  // State to track which books are skipped
  const [skipState, setSkipState] = useState({});
  // State to track the quantity for books that are not skipped
  const [quantities, setQuantities] = useState({});

  // Assuming dueAmount is the unit price for each book
  // If your API provides a price per book (e.g., book.price), use that instead of baseCost.
  const baseCost = Number(invoice?.dueAmount) || 0; 

  // --- FIX START ---

  // Initialize skipState and quantities from fetched invoice data (soldBooks)
  useEffect(() => {
    if (!invoice?.box?.books) return;

    const initialSkip = {};
    const qty = {};

    invoice.box.books.forEach((book) => {
      const soldBook = invoice.soldBooks?.find(
        (sb) => sb.bookId._id === book._id
      );
      
      // Determine initial skip state: not skipped if found in soldBooks
      const isKept = !!soldBook;
      initialSkip[book._id] = !isKept;
      
      // Initial quantity: use sold quantity, or 1 if kept, or 0 if skipped/not found
      qty[book._id] = soldBook?.quantity || (isKept ? 1 : 0);
    });

    setSkipState(initialSkip);
    setQuantities(qty);
  }, [invoice]); // Re-run when the invoice data changes

  // Recalculate invoice data whenever book list, skip state, or quantities change
  const invoiceData = useMemo(() => {
    if (!invoice?.box?.books) return [];
    
    return invoice.box.books.map((book) => {
      const skipped = skipState[book._id] ?? true;
      
      // FIX: Only use quantity if the book is NOT skipped.
      const quantity = !skipped ? (quantities[book._id] || 0) : 0;
      
      // FIX: Calculate total based on the quantity and baseCost (unit price)
      const total = quantity * baseCost;
      
      return {
        key: book._id,
        invoiceId: invoice.invoiceId,
        description: book.name,
        skip: skipped,
        quantity, // This is the calculated quantity (0 if skipped)
        baseCost,
        total,
      };
    });
  }, [invoice?.box?.books, skipState, quantities, baseCost, invoice?.invoiceId]);

  // Total amount recalculates automatically when invoiceData changes
  const totalAmount = useMemo(() => {
    return invoiceData.reduce((acc, book) => acc + book.total, 0);
  }, [invoiceData]);

  // --- FIX END ---
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spin size="large" tip="Loading invoice..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px] p-6">
        <div className="w-full max-w-lg p-6 text-center bg-white border-l-4 border-red-500 shadow-xl rounded-xl">
          <div className="flex flex-col items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-red-600">
              Invoice Not Available
            </h2>
            <p className="text-sm text-gray-700 md:text-base">
              The invoice for this user is not created at this moment. Please wait for the next month.
            </p>
          </div>
        </div>
      </div>
    );
  }


  if (!invoice || !invoice?.user || !invoice?.box?.books) {
    return <Alert message="No valid invoice found." type="info" />;
  }

  const toggleSkip = (bookId, value) => {
    setSkipState((prev) => ({ ...prev, [bookId]: value }));
    // When skipping, set the quantity to 0 in the quantities state for clarity, 
    // although it's handled in useMemo as well.
    if (value === true) { 
        setQuantities((prev) => ({ ...prev, [bookId]: 0 }));
    } else {
        // When un-skipping, set quantity to 1 if it was 0, otherwise keep existing
        setQuantities((prev) => ({ ...prev, [bookId]: prev[bookId] > 0 ? prev[bookId] : 1 }));
    }
  };

  const updateQuantity = (bookId, value) => {
    // Ensure value is at least 1 when updating quantity
    const finalValue = Math.max(1, value || 1); 
    setQuantities((prev) => ({ ...prev, [bookId]: finalValue }));
  };

  const columns = [
    {
      title: "S/N",
      render: (text, record, index) => index + 1,
    },
    { title: "Book Title", dataIndex: "description" },
    {
      title: "Action",
      dataIndex: "key",
      render: (bookId) => (
        <Radio.Group
          value={skipState[bookId] ? "skip" : "keep"}
          onChange={(e) => toggleSkip(bookId, e.target.value === "skip")}
        >
          <Radio value="keep">Keep</Radio>
          <Radio value="skip">Skip</Radio>
        </Radio.Group>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "key",
      // Use the 'quantity' from the memoized invoiceData for display
      render: (bookId, record) =>
        !skipState[bookId] ? (
          <InputNumber
            min={1}
            value={record.quantity} // Use record.quantity for display
            onChange={(val) => updateQuantity(bookId, val)}
          />
        ) : (
          record.quantity // Will be 0 if skipped
        ),
    },
    {
      title: "Base Cost",
      dataIndex: "baseCost",
      render: (cost) => `$${cost.toFixed(2)}`,
    },
    {
      title: "Total Cost",
      dataIndex: "total",
      render: (total) =>
        typeof total === "number" ? `$${total.toFixed(2)}` : "$0.00",
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
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 8px; }
            th { background-color: #f0f0f0; }
            .header-section { display: flex; justify-content: space-between; margin-bottom: 20px; }
            h2 { margin: 0; }
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
    if (invoice.trackingUrl) {
      window.open(invoice.trackingUrl, "_blank");
    } else {
      alert("Tracking URL not available");
    }
  };

  const handleTrackingLabel = () => {
    if (invoice.returnLabelUrl) {
      window.open(invoice.returnLabelUrl, "_blank");
    } else {
      alert("Return Label URL not available");
    }
  };

  const handleMakeShip = async () => {
    try {
      if (!token) return message.error("Unauthorized. Please login.");

      const address = {
        name: invoice.user?.name || "Customer",
        phone: invoice.user?.phone || "0000000000",
        street1: invoice.user?.address?.street1,
        city: invoice.user?.address?.city,
        state: invoice.user?.address?.state,
        zip: invoice.user?.address?.zip,
        country: invoice.user?.address?.country || "US",
      };

      if (!address.street1 || !address.zip) {
        return message.error("Incomplete address for shipping.");
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/get-shipping-rates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            toAddress: address,
            parcelDetails: {
              weight: invoice.box?.weight?.toString() || "17.6",
            },
          }),
        }
      );

      const result = await response.json();

      console.log("📦 Full backend response:", result);

      alert(JSON.stringify(result, null, 2));

      if (response.ok && result?.data) {
        message.success("Shipping created successfully!");
        refetch();

        if (result.data?.trackingUrl) {
          window.open(result.data.trackingUrl, "_blank");
        }
      } else {
          throw new Error(result?.error || result?.message || "Shipping failed.");
      }

    } catch (err) {
      console.error("Shipping Error:", err);
      message.error(err.message || "Shipping failed.");
    }
  };


  const getpaid = async () => {
    try {
      if (!token) return message.error("Unauthorized. Please login.");

      const soldBooks = invoice.box.books
        .filter((book) => !skipState[book._id])
        .map((book) => ({
          bookId: book._id,
          quantity: quantities[book._id] || 0,
        }))
        .filter((book) => book.quantity > 0);

      if (!soldBooks.length) return message.warning("No books selected for payment.");

      const payload = {
        soldBooks,
        extraBooks: [],
        returnLabelUrl: invoice.returnLabelUrl || "",
        returnTrackingCode: invoice.returnTrackingCode || "",
        trackingUrl: invoice.trackingUrl || "",
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/invoice/paid/${invoice._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.statusCode !== 200) throw new Error(result.message);
      message.success("Payment successful!");
      refetch();
    } catch (err) {
      console.error("Payment Error:", err);
      message.error(err.message || "Payment failed.");
    }
  };

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
          rowKey="key"
          pagination={{ pageSize: 8 }}
          bordered
          style={{ marginTop: 20 }}
        />

        <div className="flex justify-end py-2 mt-2 gap-x-10">
          <div>
            <Button
              onClick={handleMakeShip}
              icon={<GiCargoShip />}
              style={{ marginRight: 10, color: primaryColor }}
            >
              Make Ship
            </Button>
            <Button
              onClick={getpaid}
              icon={<MdPaid />}
              style={{ marginRight: 10, color: primaryColor }}
            >
              Get Paid
            </Button>
          </div>
          <p className="text-xl font-bold">
            Total: <span style={{ color: primaryColor }}>${totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <Row justify="end" className="mt-6">
        <Col>
          <Button
            onClick={handleTrackingClick}
            icon={<MdSpatialTracking />}
            style={{ marginRight: 10, color: primaryColor }}
          >
            Tracking
          </Button>
          <Button
            onClick={handleTrackingLabel}
            icon={<TbTruckReturn />}
            style={{ marginRight: 10, color: primaryColor }}
          >
            Return Label
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