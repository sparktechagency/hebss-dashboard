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
import { useUpdateBookMutation } from "../../redux/features/products/productsApi";

const EditBookPopup = ({ visible, onClose, book, onSave }) => {
  const [bookData, setBookData] = useState(null);
  const initializedRef = useRef(false);
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  useEffect(() => {
    if (visible && book && !initializedRef.current) {
      setBookData({
        ...book,
        price: book.price || { amount: "", currency: "USD" },
        discountPrice:
          book.discountAmount !== undefined
            ? String(book.discountAmount)
            : "",
        quantity:
          book.quantity !== undefined && book.quantity !== null
            ? String(book.quantity)
            : "",
      });
      initializedRef.current = true;
    }
    if (!visible) {
      initializedRef.current = false;
      setBookData(null);
    }
  }, [visible, book]);

  if (!bookData) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const amount = e.target.value;
    setBookData((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        amount,
      },
    }));
  };

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^\d+$/.test(val)) {
      setBookData((prev) => ({
        ...prev,
        quantity: val,
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDiscountToggle = (checked) => {
    setBookData((prev) => ({
      ...prev,
      discountAvailable: checked,
    }));
  };

  const handleDiscountTypeChange = (e) => {
    setBookData((prev) => ({
      ...prev,
      discountType: e.target.value,
    }));
  };

  const handleDiscountPriceChange = (e) => {
    setBookData((prev) => ({
      ...prev,
      discountPrice: e.target.value,
    }));
  };

  const handleUpload = ({ file }) => {
    setBookData((prev) => ({
      ...prev,
      cover: file,
    }));
  };

  const handleReset = () => {
    if (book) {
      setBookData({
        ...book,
        price: book.price || { amount: "", currency: "USD" },
        discountPrice:
          book.discountAmount !== undefined ? String(book.discountAmount) : "",
        quantity:
          book.quantity !== undefined && book.quantity !== null
            ? String(book.quantity)
            : "",
        cover: book.cover || null,
      });
    }
  };



const handleSave = async () => {
  try {
    const updatedBook = {
      category: bookData.category || book.category?._id,
      grade: bookData.grade,
      bookCollection: bookData.bookCollection,
      name: bookData.name,
      author: bookData.author,
      description: bookData.summary || book.description,
      priceAmount: parseFloat(bookData.price.amount) || 0,
      bookLanguage: bookData.bookLanguage,
      level: bookData.level,
      weight: parseFloat(bookData.weight) || 0,
    };

    // ✅ Only include quantity if it was actually changed
    if (String(bookData.quantity) !== String(book.quantity)) {
      updatedBook.quantity = Number(bookData.quantity);
    }

    // ✅ Only include discount fields if discount is enabled
    if (bookData.discountAvailable) {
      updatedBook.discountAvailable = true;
      updatedBook.discountType = bookData.discountType;
      updatedBook.discountPrice = Number(bookData.discountPrice) || 0;
    } else {
      updatedBook.discountAvailable = false;
    }

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
      title="Edit Product"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="p-4"
      destroyOnClose={false}
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
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <Input
              name="name"
              value={bookData.name || ""}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Product Price</label>
            <Input
              name="priceAmount"
              type="number"
              step="0.01"
              value={bookData.price.amount || ""}
              onChange={handlePriceChange}
              placeholder="$0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <Input
              name="quantity"
              value={bookData.quantity}
              onChange={handleQuantityChange}
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Reader Age</label>
            <Select
              value={bookData.readerAge || undefined}
              onChange={(value) => handleSelectChange("readerAge", value)}
              placeholder="Select Age Group"
              allowClear
            >
              <Select.Option value="0-3">0-3</Select.Option>
              <Select.Option value="4-7">4-7</Select.Option>
              <Select.Option value="8+">8+</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Reader Grade</label>
            <Select
              value={bookData.grade || undefined}
              onChange={(value) => handleSelectChange("grade", value)}
              placeholder="Select Grade"
              allowClear
            >
              <Select.Option className='w-full' value="1st">1st</Select.Option>
              <Select.Option className='w-full' value="2nd">2nd</Select.Option>
              <Select.Option  className='w-full' value="3rd">3rd</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Collections</label>
            <Select
              value={bookData.bookCollection || bookData.collection || undefined}
              onChange={(value) => handleSelectChange("bookCollection", value)}
              placeholder="Select Collection"
              allowClear
            >
              <Select.Option value="Fiction">Fiction</Select.Option>
              <Select.Option value="Non-Fiction">Non-Fiction</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Author</label>
            <Input
              name="author"
              value={bookData.author || ""}
              onChange={handleInputChange}
              placeholder="Enter author's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Language</label>
            <Select
              value={bookData.bookLanguage || bookData.language || undefined}
              onChange={(value) => handleSelectChange("bookLanguage", value)}
              placeholder="Select Language"
              allowClear
            >
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Arabic">Arabic</Select.Option>
              <Select.Option value="French">French</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Level</label>
            <Select
              value={bookData.level || undefined}
              onChange={(value) => handleSelectChange("level", value)}
              placeholder="Select Level"
              allowClear
            >
              <Select.Option value="Beginner">Beginner</Select.Option>
              <Select.Option value="Intermediate">Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
            </Select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Summary</label>
            <Input.TextArea
              name="summary"
              value={bookData.summary || ""}
              onChange={handleInputChange}
              placeholder="Enter a brief summary of the book"
              rows={4}
              className="w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Discount Available</label>
            <Switch
              checked={bookData.discountAvailable || false}
              onChange={handleDiscountToggle}
            />
          </div>

          {bookData.discountAvailable && (
            <div className="flex col-span-2 gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium">Discount Type</label>
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
                <label className="block text-sm font-medium">Discount Price</label>
                <Input
                  name="discountPrice"
                  value={bookData.discountPrice || ""}
                  onChange={handleDiscountPriceChange}
                  placeholder="$0.00"
                />
              </div>
            </div>
          )}
        </div>

        {/* <Button
          type="default"
          onClick={handleReset}
          style={{ marginBottom: 8 }}
        >
          Reset Changes
        </Button> */}

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
