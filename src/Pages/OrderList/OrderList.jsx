import { useState } from "react";
import {
  Table,
  Input,
  Pagination,
  Modal,
  Button,
  Dropdown,
  Menu,
  Row,
  Col,
  Divider,
  Spin,
} from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/orderApi";

const { Search } = Input;

const OrderList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Fetch orders from API
  const { data: response, isLoading, refetch, error } = useGetAllOrdersQuery({
    search: searchText,
    page: currentPage,
    limit: pageSize,
  });

  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const orders = response?.data || [];
  const totalOrders = response?.meta?.totalData || 0;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "ordered":
        return "gold";
      case "ongoing":
        return "blue";
      case "delivered":
        return "green";
      case "pending":
        return "orange";
      default:
        return "gray";
    }
  };

  const showOrderDetails = (order) => {
    setCurrentOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // reset page on search
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const updateOrderStatusHandler = async (order, newStatus) => {
    try {
      await updateOrderStatus({ orderId: order._id, status: newStatus }).unwrap();
      refetch(); // refresh table after update
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Name", dataIndex: ["user", "name"], key: "name" },
    { title: "Email", dataIndex: ["user", "email"], key: "email" },
    {
      title: "Address",
      key: "address",
      render: (_, record) =>
        `${record.shippingAddress?.street || ""}, ${record.shippingAddress?.city || ""}, ${record.shippingAddress?.state || ""}, ${record.shippingAddress?.zipCode || ""}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: getStatusColor(status), fontWeight: "bold" }}>{status}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button type="link" icon={<EyeOutlined />} onClick={() => showOrderDetails(record)} />
          <Dropdown
            overlay={
              <Menu onClick={(e) => updateOrderStatusHandler(record, e.key)}>
                <Menu.Item key="Ordered">Ordered</Menu.Item>
                <Menu.Item key="Ongoing">Ongoing</Menu.Item>
                <Menu.Item key="Delivered">Delivered</Menu.Item>
                <Menu.Item key="Pending">Pending</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="link" icon={<EditOutlined />} />
          </Dropdown>
        </div>
      ),
    },
  ];

  const modalContent = currentOrder && (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <p><strong>Order ID:</strong> {currentOrder.orderId}</p>
          <p><strong>Order Date:</strong> {new Date(currentOrder.createdAt).toLocaleString()}</p>
        </Col>
        <Col span={12}>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: getStatusColor(currentOrder.status), fontWeight: "bold" }}>
              {currentOrder.status}
            </span>
          </p>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <p><strong>Name:</strong> {currentOrder.user?.name}</p>
          <p><strong>Email:</strong> {currentOrder.user?.email}</p>
          <p><strong>Phone:</strong> {currentOrder.user?.phone || "Not provided"}</p>
        </Col>
        <Col span={12}>
          <p>
            <strong>Address:</strong>{" "}
            {`${currentOrder.shippingAddress?.street}, ${currentOrder.shippingAddress?.city}, ${currentOrder.shippingAddress?.state}, ${currentOrder.shippingAddress?.zipCode}`}
          </p>
        </Col>
      </Row>
      <Divider />
      <p><strong>Items:</strong></p>
      <ul>
        {currentOrder.items.map((item, index) => (
          <li key={index} className="flex items-center mb-2">
            <img src={AllImages.book} alt={item.name} className="w-12 h-12 mr-4" />
            <span>{item.name || "Item"} - ${item.price?.amount || 0}</span>
          </li>
        ))}
      </ul>
      <p><strong>Total Price:</strong> ${currentOrder.total?.amount || 0}</p>
    </div>
  );

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <h2 className="text-3xl font-bold">Orders</h2>
        <Search placeholder="Search orders..." onChange={(e) => handleSearch(e.target.value)} className="w-72" allowClear />
      </div>

      <div className="p-5 bg-white rounded shadow-md">
        <Table columns={columns} dataSource={orders} pagination={false} rowKey="_id" scroll={{ x: "max-content" }} />

        <div className="flex justify-center mt-4">
          <Pagination
            current={response?.meta?.currentPage || 1}
            pageSize={response?.meta?.limit || pageSize}
            total={totalOrders}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>

      <Modal title="Order Details" visible={isModalVisible} onCancel={handleCancel} footer={[
        <Button key="close" onClick={handleCancel}>Close</Button>
      ]}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default OrderList;
