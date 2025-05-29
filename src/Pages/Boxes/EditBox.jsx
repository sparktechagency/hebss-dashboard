import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Select,
  Pagination,
  Input,
  Checkbox,
  Spin,
  message,
} from "antd";
import { Grid, List } from "lucide-react";
import { SearchOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateBoxMutation,
  useGetBoxByIdQuery,
} from "../../redux/features/box/boxApi";
import { useGetAllBooksQuery } from "../../redux/features/products/productsApi";

const EditBoxPage = () => {
  const navigate = useNavigate();
  const { boxId } = useParams();

  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Helper to fix and build full image URLs
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return AllImages.book; // fallback image

    const fixedPath = imagePath.replace(/\\/g, "/"); // fix backslashes

    if (/^https?:\/\//i.test(fixedPath)) return fixedPath; // absolute URL

    return `${backendBaseUrl.replace(/\/$/, "")}/${fixedPath.replace(/^\//, "")}`;
  };

  // Fetch box data
  const {
    data: boxData,
    isLoading: isBoxLoading,
    isError: isBoxError,
    error: boxError,
    refetch: refetchBox,
  } = useGetBoxByIdQuery(boxId, { skip: !boxId });

  // Fetch all books
  const {
    data: allBooksData,
    isLoading: isBooksLoading,
    isError: isBooksError,
    error: booksError,
  } = useGetAllBooksQuery();

  const [updateBox, { isLoading: isUpdating }] = useUpdateBoxMutation();

  const [books, setBooks] = useState([]);
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const primaryColor = "#F37975";

  const isReady =
    !isBoxLoading &&
    !isBooksLoading &&
    boxData?.data &&
    Array.isArray(boxData.data.books) &&
    allBooksData?.data &&
    Array.isArray(allBooksData.data);

  useEffect(() => {
    if (!isReady) return;

    const boxBookIds = boxData.data.books.map((id) => id.toString());

    const formattedBooks = allBooksData.data.map((book) => {
      const bookIdStr = book._id.toString();

      // Use coverImage if exists, else image
      const rawImage = book.coverImage || book.image || "";

      return {
        key: bookIdStr,
        _id: bookIdStr,
        name: book.name || book.title || "Untitled Book",
        price:
          typeof book.price === "object"
            ? `${book.price.amount} ${book.price.currency}`
            : book.price || "$0.00",
        readerAge: book.readerAge || "All ages",
        grade: book.grade || "N/A",
        collection: book.collection || "N/A",
        author: book.author || "Unknown",
        language: book.language || "English",
        level: book.level || "Beginner",
        image: getFullImageUrl(rawImage),
        isChecked: boxBookIds.includes(bookIdStr),
      };
    });

    setBooks(formattedBooks);
  }, [boxData, allBooksData, isReady]);

  const paginatedBooks = books.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCheckboxChange = (key) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.key === key ? { ...book, isChecked: !book.isChecked } : book
      )
    );
  };

  const handleSaveChanges = async () => {
    if (!boxData || !boxData.data) {
      alert("Box data not loaded yet.");
      return;
    }

    const selectedBooks = books.filter((book) => book.isChecked);
    const selectedBookIds = selectedBooks.map((book) => book._id);

    const currentBookIds = (boxData.data.books || []).map((id) => id.toString());

    const addedBooks = selectedBookIds.filter((id) => !currentBookIds.includes(id));
    const removedBooks = currentBookIds.filter((id) => !selectedBookIds.includes(id));

    const payload = {
      addedBooks,
      removedBooks,
    };

    try {
      const res = await updateBox({ _id: boxId, data: payload }).unwrap();
      console.log("Update response:", res);
      message.success("Box updated successfully!");
      refetchBox();
    } catch (err) {
      console.error("Update error:", err);
      message.success(
        "Failed to update box: " +
          (err?.data?.message || err.error || "Unknown error")
      );
    }
  };

  if (!isReady || isUpdating) return <Spin size="large" className="p-10" />;

  if (isBoxError)
    return (
      <div>
        Error loading box:{" "}
        {boxError?.data?.message || boxError?.error || "Unknown error"}
      </div>
    );

  if (isBooksError)
    return (
      <div>
        Error loading books:{" "}
        {booksError?.data?.message || booksError?.error || "Unknown error"}
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <h1 className="text-3xl font-bold">Edit Box</h1>
        <div className="flex flex-wrap items-center gap-4">
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

      <div className="flex items-center justify-end gap-4 mb-4">
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
        <div
          key={boxData?.data?._id || "box-books-grid"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {paginatedBooks.map((book) => (
            <Card
              key={book.key}
              className="relative p-4 bg-white rounded-lg shadow-lg"
            >
              <Checkbox
                checked={book.isChecked}
                onChange={() => handleCheckboxChange(book.key)}
                className="absolute top-2 right-2"
              />
              <img
                src={book.image}
                alt={book.name}
                className="object-cover w-full h-48 mb-4 rounded-md"
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
          className="overflow-hidden bg-white rounded-lg shadow-md"
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
            { title: "Collections", dataIndex: "collection", key: "collection" },
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
    </div>
  );
};

export default EditBoxPage;
