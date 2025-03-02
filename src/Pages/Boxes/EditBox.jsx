import { useState } from "react";
import { Card, Table, Button, Select, Pagination, Input, Checkbox } from "antd";
import { Grid, List } from "lucide-react";
import { SearchOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";

const initialBooks = Array.from({ length: 30 }, (_, i) => ({
  key: i,
  name: `Allah Made All of Me (${225 + i})`,
  price: "$120.00",
  readerAge: "Tiny Mu'mins (0-3) age",
  grade: "1st",
  collection: "Arabic Books",
  author: "Unknown",
  language: "English",
  level: "Beginner",
  image: AllImages.book,
  isChecked: i < 5, // First 5 books are pre-checked
}));

const EditBoxPage = () => {
  const [books, setBooks] = useState(initialBooks);
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const paginatedBooks = books.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const primaryColor = "#F37975";

  const handleCheckboxChange = (key) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.key === key ? { ...book, isChecked: !book.isChecked } : book
      )
    );
  };

  const handleSaveChanges = () => {
    console.log(
      "Updated book selections:",
      books.filter((book) => book.isChecked)
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Edit Box</h1>
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
        </div>
      </div>

      <div className="flex justify-end items-center mb-4 gap-4">
        <div className="flex gap-4">
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
        <Button
          className="bg-[#F37975] text-white hover:bg-[#F37975] px-4 py-2"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedBooks.map((book) => (
            <Card
              key={book.key}
              className="shadow-lg p-4 rounded-lg bg-white relative"
            >
              <Checkbox
                checked={book.isChecked}
                onChange={() => handleCheckboxChange(book.key)}
                className="absolute top-2 right-2"
              />
              <img
                src={book.image}
                alt="Book"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-600">{book.readerAge}</p>
              <p className="text-sm text-gray-600">{book.collection}</p>
              <p className="text-lg font-bold text-red-500">{book.price}</p>
            </Card>
          ))}
        </div>
      ) : (
        <Table
          dataSource={paginatedBooks}
          pagination={false}
          className="shadow-md bg-white rounded-lg overflow-hidden"
          columns={[
            {
              title: "Select",
              key: "select",
              render: (_, record) => (
                <Checkbox
                  checked={record.isChecked}
                  onChange={() => handleCheckboxChange(record.key)}
                />
              ),
            },
            { title: "Book Name", dataIndex: "name", key: "name" },
            { title: "Price", dataIndex: "price", key: "price" },
            { title: "Reader Age", dataIndex: "readerAge", key: "readerAge" },
            { title: "Reader Grade", dataIndex: "grade", key: "grade" },
            {
              title: "Collections",
              dataIndex: "collection",
              key: "collection",
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
    </div>
  );
};

export default EditBoxPage;
