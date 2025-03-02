import { useState } from "react";
import { Card, Table, Button, Select, Pagination, Input, Modal } from "antd";
import { Grid, List, Edit, Trash2 } from "lucide-react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";
import AddBookPopup from "./BookCreatePopup";
import EditBookPopup from "./BookEdit";

const initialBooks = Array.from({ length: 30 }, (_, i) => ({
  key: i,
  name: `Allah Made All of Me (${225 + i})`,
  price: "$120.00",
  readerAge: "Tiny Mu'mins (0-3) age",
  grade: "1st",
  quantity: 279,
  collection: "Arabic Books",
  author: "Unknown",
  language: "English",
  level: "Beginner",
  image: AllImages.book,
}));

const BookList = () => {
  const [books, setBooks] = useState(initialBooks);
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const pageSize = 8;
  const paginatedBooks = books.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const primaryColor = "#F37975";

  const handleAddBook = (newBook) => {
    setBooks([...books, { ...newBook, key: books.length }]);
    setIsAddModalVisible(false);
  };

  const handleEditBook = (updatedBook) => {
    setBooks(books.map((book) => (book.key === updatedBook.key ? updatedBook : book)));
    setIsEditModalVisible(false);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setIsEditModalVisible(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Book List</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Search books..."
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
            Add New Book
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedBooks.map((book) => (
            <Card key={book.key} className="shadow-lg p-4 rounded-lg bg-white relative">
              <img src={book.image} alt="Book" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-600">{book.readerAge}</p>
              <p className="text-sm text-gray-600">{book.collection}</p>
              <p className="text-lg font-bold text-red-500">{book.price}</p>
              <div className="flex justify-between mt-2">
                <Edit className="text-gray-600 cursor-pointer hover:text-[#F37975]" onClick={() => openEditModal(book)} />
                <Trash2 className="text-gray-600 cursor-pointer hover:text-red-500" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Table
          dataSource={paginatedBooks}
          pagination={false}
          className="shadow-md bg-white rounded-lg overflow-hidden"
          columns={[
            { title: "Book Name", dataIndex: "name", key: "name" },
            { title: "Price", dataIndex: "price", key: "price" },
            { title: "Reader Age", dataIndex: "readerAge", key: "readerAge" },
            { title: "Reader Grade", dataIndex: "grade", key: "grade" },
            { title: "Collections", dataIndex: "collection", key: "collection" },
            {
              title: "Actions",
              key: "actions",
              render: (text, record) => (
                <div className="flex gap-2">
                  <Edit className="text-gray-600 cursor-pointer hover:text-[#F37975]" onClick={() => openEditModal(record)} />
                  <Trash2 className="text-gray-600 cursor-pointer hover:text-red-500" />
                </div>
              ),
            },
          ]}
        />
      )}

      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={books.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      <AddBookPopup visible={isAddModalVisible} onClose={() => setIsAddModalVisible(false)} onSave={handleAddBook} />
      <EditBookPopup visible={isEditModalVisible} onClose={() => setIsEditModalVisible(false)} book={editingBook} onSave={handleEditBook} />
    </div>
  );
};

export default BookList;