import { useState, useMemo } from "react";
import { Card, Table, Button, Select, Pagination, Input, Spin, message } from "antd";
import { Grid, List, Edit, Trash2 } from "lucide-react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";
import AddBookPopup from "./BookCreatePopup";
import EditBookPopup from "./BookEdit";
import {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "../../redux/features/products/productsApi";

const BookList = () => {
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // New states for sorting and filters
  const [sortOrder, setSortOrder] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [shortPositionFilter, setShortPositionFilter] = useState("");

  // Fetch books using the Redux API hook
  const { data, isLoading, isError } = useGetAllBooksQuery();
  const [updateBook] = useUpdateBookMutation();
  const [createBook] = useCreateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const pageSize = 8;
  const books = data?.data || [];

  // Filter books based on search, price, short position inputs
  const filteredBooks = useMemo(() => {
    if (!Array.isArray(books)) return [];

    return books.filter((book) => {
      const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        priceFilter === "" || 
        (book.price?.amount && book.price.amount === Number(priceFilter));

      const matchesShortPosition =
        shortPositionFilter === "" ||
        (book.shortPosition && book.shortPosition.toString().includes(shortPositionFilter));

      return matchesSearch && matchesPrice && matchesShortPosition;
    });
  }, [books, searchTerm, priceFilter]);

  // Sort the filtered books by price based on sortOrder
  const sortedBooks = useMemo(() => {
    if (sortOrder === "lowToHigh") {
      return [...filteredBooks].sort((a, b) => (a.price?.amount || 0) - (b.price?.amount || 0));
    } else if (sortOrder === "highToLow") {
      return [...filteredBooks].sort((a, b) => (b.price?.amount || 0) - (a.price?.amount || 0));
    } else {
      return filteredBooks;
    }
  }, [filteredBooks, sortOrder]);

  // Paginate the sorted books
  const paginatedBooks = sortedBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const primaryColor = "#F37975";

  // Handle adding a new book
  const handleAddBook = async (newBook) => {
    try {
      await createBook(newBook);
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  // Handle editing a book
  const handleEditBook = async (updatedBook) => {
    try {
      await updateBook(updatedBook);
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Handle deleting a book
  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId).unwrap();
      message.success("Book deleted successfully!");
    } catch (error) {
      message.error("Failed to delete book.");
      console.error("Error deleting book:", error);
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            placeholder="Price"
            type="number"
            min={0}
            className="w-32"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
          <Input
            placeholder="Short Position"
            className="hidden w-32"
            value={shortPositionFilter}
            onChange={(e) => setShortPositionFilter(e.target.value)}
          />
          <Select defaultValue="Category" className="w-40">
            <Select.Option value="fiction">Fiction</Select.Option>
            <Select.Option value="non-fiction">Non-Fiction</Select.Option>
          </Select>
          <Select
            defaultValue="none"
            className="w-40"
            onChange={(value) => setSortOrder(value)}
          >
            <Select.Option value="none">Sort by Price</Select.Option>
            <Select.Option value="lowToHigh">Price: Low to High</Select.Option>
            <Select.Option value="highToLow">Price: High to Low</Select.Option>
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
              <p className="text-sm text-gray-600">{book.bookCollection?.title || ""}</p>
              <p className="text-lg font-bold text-red-500">
                {book.price?.amount} {book.price?.currency}
              </p>
              <div className="flex justify-between mt-2">
                <Edit
                  className="text-gray-600 cursor-pointer hover:text-[#F37975]"
                  onClick={() => openEditModal(book)}
                />
                <Trash2
                  className="text-gray-600 cursor-pointer hover:text-red-500"
                  onClick={() => handleDeleteBook(book._id)}
                />
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
            {
              title: "Price",
              key: "price",
              render: (_, record) =>
                record.price ? `${record.price.amount} ${record.price.currency}` : "",
            },
            { title: "Reader Age", dataIndex: "bookLanguage", key: "bookLanguage" },
            { title: "Grade", dataIndex: "level", key: "level" },
            {
              title: "Collections",
              key: "bookCollection",
              render: (_, record) => record.bookCollection?.title || "",
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => (
                <div className="flex gap-2">
                  <Edit
                    className="text-gray-600 cursor-pointer hover:text-[#F37975]"
                    onClick={() => openEditModal(record)}
                  />
                  <Trash2
                    className="text-gray-600 cursor-pointer hover:text-red-500"
                    onClick={() => handleDeleteBook(record._id)}
                  />
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
          total={sortedBooks.length}
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
