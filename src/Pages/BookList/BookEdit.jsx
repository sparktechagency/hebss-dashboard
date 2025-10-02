import { useState, useEffect, useRef } from "react";
import {
  Modal,
  Input,
  Select,
  Button,
  Upload,
  Switch,
  Radio,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useUpdateBookMutation,
  useGetAllCategoryQuery,
  useGetAllGradeQuery,
  useGetAllCollectionQuery,
} from "../../redux/features/products/productsApi";

const EditBookPopup = ({ visible, onClose, book }) => {
  const [bookData, setBookData] = useState(null);
  const initializedRef = useRef(false);

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  // Fetch all categories, grades, and collections
  const { data: categories } = useGetAllCategoryQuery();
  const { data: grades } = useGetAllGradeQuery();
  const { data: collections } = useGetAllCollectionQuery();

  const categoryList = Array.isArray(categories?.data)
    ? categories.data
    : Array.isArray(categories?.categories)
    ? categories.categories
    : Array.isArray(categories)
    ? categories
    : [];

  const gradeList = Array.isArray(grades?.data)
    ? grades.data
    : Array.isArray(grades?.grades)
    ? grades.grades
    : Array.isArray(grades)
    ? grades
    : [];

  const collectionList = Array.isArray(collections?.data)
    ? collections.data
    : Array.isArray(collections?.collections)
    ? collections.collections
    : Array.isArray(collections)
    ? collections
    : [];

  // Initialize bookData when modal opens
  useEffect(() => {
    if (visible && book && !initializedRef.current) {
      setBookData({
        ...book,
        category: book.category?._id || "",
        grade: book.grade?._id || "",
        bookCollection: book.bookCollection?._id || "",
        priceAmount: book.price?.amount || "",
        discountPrice: book.discountAmount ? String(book.discountAmount) : "",
        quantity:
          book.quantity !== undefined && book.quantity !== null
            ? String(book.quantity)
            : "",
        cover: book.cover || null,
      });
      initializedRef.current = true;
    }

    if (!visible) {
      initializedRef.current = false;
      setBookData(null);
    }
  }, [visible, book]);

  if (!bookData) return null;

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = ({ file }) => {
    setBookData((prev) => ({ ...prev, cover: file.originFileObj || file }));
  };

  const handleDiscountToggle = (checked) => {
    setBookData((prev) => ({ ...prev, discountAvailable: checked }));
  };

  const handleDiscountTypeChange = (e) => {
    setBookData((prev) => ({ ...prev, discountType: e.target.value }));
  };

  const handleBookInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "quantity") {
    // Keep only numeric characters
    const numericValue = value === "" ? "" : value.replace(/\D/g, "");
    setBookData((prev) => ({ ...prev, [name]: numericValue }));
  } else {
    setBookData((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleSave = async () => {
    if (!bookData.category || !bookData.grade || !bookData.bookCollection) {
      message.error("Please select Category, Grade, and Collection");
      return;
    }

    const updatedBook = {
      category: bookData.category,
      grade: bookData.grade,
      bookCollection: bookData.bookCollection,
      name: bookData.name,
      author: bookData.author,
      description: bookData.summary || book.description,
      priceAmount: parseFloat(bookData.priceAmount) || 0,
      bookLanguage: bookData.bookLanguage || bookData.language,
      level: bookData.level,
      weight: parseFloat(bookData.weight) || 0,
      // quantity: Number(bookData.quantity) || 0,
    };

    if (String(bookData.quantity) !== String(book.quantity)) {
      updatedBook.quantity = Number(bookData.quantity);
    }

    if (bookData.discountAvailable) {
      updatedBook.discountAvailable = true;
      updatedBook.discountType = bookData.discountType;
      updatedBook.discountPrice = Number(bookData.discountPrice) || 0;
    } else {
      updatedBook.discountAvailable = false;
    }

    try {
      await updateBook({
        bookId: book._id,
        updatedBook,
      }).unwrap();

      message.success("Book updated successfully!");
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      message.error("Failed to update book.");
    }
  };

  return (
    <Modal
      title="Edit Book"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="p-4"
    >
      <div className="flex flex-col gap-4">
        <Upload beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
          <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
        </Upload>
        {bookData.cover && typeof bookData.cover !== "string" && (
          <img
            src={URL.createObjectURL(bookData.cover)}
            alt="Cover Preview"
            className="object-cover w-full h-40"
          />
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <Input
              name="name"
              value={bookData.name || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium">Price</label>
            <Input
              name="priceAmount"
              type="number"
              step="0.01"
              value={bookData.priceAmount || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <Input
              name="quantity"
              value={bookData.quantity}
              onChange={handleBookInputChange}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <Select
              value={bookData.category || undefined}
              onChange={(value) => handleSelectChange("category", value)}
              placeholder="Select Category"
              allowClear
            >
              {categoryList.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.title}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* Grade */}
          <div>
            <label className="block text-sm font-medium">Reader Grade</label>
            <Select
              value={bookData.grade || undefined}
              onChange={(value) => handleSelectChange("grade", value)}
              placeholder="Select Grade"
              allowClear
            >
              {gradeList.map((grade) => (
                <Select.Option key={grade._id} value={grade._id}>
                  {grade.title}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* Collection */}
          <div>
            <label className="block text-sm font-medium">Collections</label>
            <Select
              value={bookData.bookCollection || undefined}
              onChange={(value) => handleSelectChange("bookCollection", value)}
              placeholder="Select Collection"
              allowClear
            >
              {collectionList.map((col) => (
                <Select.Option key={col._id} value={col._id}>
                  {col.title}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium">Author</label>
            <Input
              name="author"
              value={bookData.author || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium">Language</label>
            <Select
              value={bookData.bookLanguage || bookData.language || undefined}
              onChange={(value) => handleSelectChange("bookLanguage", value)}
              placeholder="Select Language"
            >
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Arabic">Arabic</Select.Option>
            </Select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium">Level</label>
            <Select
              value={bookData.level || undefined}
              onChange={(value) => handleSelectChange("level", value)}
              placeholder="Select Level"
            >
              <Select.Option value="Beginner">Beginner</Select.Option>
              <Select.Option value="Intermediate">Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
            </Select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium">Weight</label>
            <Input
              name="weight"
              type="number"
              step="0.01"
              value={bookData.weight || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Summary */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Summary</label>
            <Input.TextArea
              name="summary"
              value={bookData.summary || ""}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          {/* Discount */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">
              Discount Available
            </label>
            <Switch
              checked={bookData.discountAvailable || false}
              onChange={handleDiscountToggle}
            />
          </div>

          {bookData.discountAvailable && (
            <div className="flex col-span-2 gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium">
                  Discount Type
                </label>
                <Radio.Group
                  value={bookData.discountType}
                  onChange={handleDiscountTypeChange}
                  className="w-full"
                >
                  <Radio value="percentage">Percentage</Radio>
                  <Radio value="fixed">Fixed</Radio>
                </Radio.Group>
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium">
                  Discount Price
                </label>
                <Input
                  name="discountPrice"
                  type="number"
                  value={bookData.discountPrice || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
        </div>

        <Button
          type="primary"
          block
          className="mt-4 bg-[#F37975] border-none"
          onClick={handleSave}
          loading={isLoading}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditBookPopup;
