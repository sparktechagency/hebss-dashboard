import { useState } from "react";
import { Card, Table, Button, Select, Pagination, Input, Spin } from "antd";
import { Grid, List, Edit, Trash2 } from "lucide-react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";
import AddBookPopup from "./BookCreatePopup";
import EditBookPopup from "./BookEdit";
import {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useUpdateBookMutation,
} from "../../redux/features/products/productsApi";

const BookList = () => {
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // Fetch books using the Redux API hook
  const { data, isLoading, isError } = useGetAllBooksQuery();
  const [updateBook] = useUpdateBookMutation();
  const [createBook] = useCreateBookMutation();

  const pageSize = 8;
  const books = data?.data || []; // Access books from the API response using data.data

  // Safeguard to ensure `books` is an array before calling `.slice()`
  const paginatedBooks = Array.isArray(books)
    ? books.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const primaryColor = "#F37975";

  // Handle adding a new book
  const handleAddBook = async (newBook) => {
    try {
      await createBook(newBook); // Use API mutation to create the book
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  // Handle editing a book
  const handleEditBook = async (updatedBook) => {
    try {
      await updateBook(updatedBook); // Use API mutation to update the book
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Open the edit modal with the selected book's details
  const openEditModal = (book) => {
    setEditingBook(book);
    setIsEditModalVisible(true);
  };

  // Display loading and error states
  if (isLoading) {
    return <Spin size="large" className="p-10" />;
  }

  if (isError) {
    return <div>Error loading books.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex flex-wrap items-center gap-4">
          <Input
            placeholder="Search products..."
            prefix={<SearchOutlined className="text-gray-500" />}
            className="w-72"
          />
          <Select defaultValue="Category" className="w-40">
            <Select.Option value="fiction">Fiction</Select.Option>
            <Select.Option value="non-fiction">Non-Fiction</Select.Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add New Product
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-4 mb-4">
        <Button
          onClick={() => setView("grid")}
          icon={<Grid />}
          style={{
            backgroundColor: view === "grid" ? primaryColor : "",
            color: view === "grid" ? "white" : "black",
          }}
        />
        <Button
          onClick={() => setView("list")}
          icon={<List />}
          style={{
            backgroundColor: view === "list" ? primaryColor : "",
            color: view === "list" ? "white" : "black",
          }}
        />
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedBooks.map((book) => (
            <Card
              key={book._id}
              className="relative p-4 bg-white rounded-lg shadow-lg"
            >
              <img
                src={book.coverImage || AllImages.book}
                alt="Book"
                className="object-cover w-full h-48 mb-4 rounded-md"
              />
              <h3 className="text-lg font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-600">{book.bookLanguage}</p>
              <p className="text-sm text-gray-600">{book.bookCollection}</p>
              <p className="text-lg font-bold text-red-500">
                {book.price.amount} {book.price.currency}
              </p>
              <div className="flex justify-between mt-2">
                <Edit
                  className="text-gray-600 cursor-pointer hover:text-[#F37975]"
                  onClick={() => openEditModal(book)}
                />
                <Trash2 className="text-gray-600 cursor-pointer hover:text-red-500" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Table
          dataSource={paginatedBooks}
          pagination={false}
          className="overflow-hidden bg-white rounded-lg shadow-md"
          columns={[
            { title: "Book Name", dataIndex: "name", key: "name" },
            { title: "Price", dataIndex: "price.amount", key: "price" },
            {
              title: "Reader Age",
              dataIndex: "bookLanguage",
              key: "bookLanguage",
            },
            { title: "Grade", dataIndex: "level", key: "level" },
            {
              title: "Collections",
              dataIndex: "bookCollection",
              key: "bookCollection",
            },
            {
              title: "Actions",
              key: "actions",
              render: (text, record) => (
                <div className="flex gap-2">
                  <Edit
                    className="text-gray-600 cursor-pointer hover:text-[#F37975]"
                    onClick={() => openEditModal(record)}
                  />
                  <Trash2 className="text-gray-600 cursor-pointer hover:text-red-500" />
                </div>
              ),
            },
          ]}
        />
      )}

      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={books.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      {/* Add and Edit Book Modals */}
      <AddBookPopup
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={handleAddBook}
      />
      <EditBookPopup
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        book={editingBook}
        onSave={handleEditBook}
      />
    </div>
  );
};

export default BookList;
