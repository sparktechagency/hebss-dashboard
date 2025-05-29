import { useState, useEffect } from "react";
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
  const [bookData, setBookData] = useState({
    ...book,
    price: book?.price || { amount: "", currency: "USD" },
    discountPrice: book?.discountAmount || "",
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  useEffect(() => {
    if (book) {
      setBookData({
        ...book,
        price: book.price || { amount: "", currency: "USD" },
        discountPrice: book.discountAmount || "",
      });
    }
  }, [book]);

  // Generic input handler for simple fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Price amount input handler (nested object)
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

  // Quantity input handler with explicit number conversion
  const handleQuantityChange = (e) => {
    let val = e.target.value;
    if (val === "") val = 0;
    else val = parseInt(val, 10);
    setBookData((prev) => ({
      ...prev,
      quantity: val,
    }));
  };

  // Select change handler
  const handleSelectChange = (name, value) => {
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Discount toggle switch
  const handleDiscountToggle = (checked) => {
    setBookData((prev) => ({
      ...prev,
      discountAvailable: checked,
    }));
  };

  // Discount type radio group
  const handleDiscountTypeChange = (e) => {
    setBookData((prev) => ({
      ...prev,
      discountType: e.target.value,
    }));
  };

  // Discount price input handler
  const handleDiscountPriceChange = (e) => {
    setBookData((prev) => ({
      ...prev,
      discountPrice: e.target.value,
    }));
  };

  // Upload handler (cover image)
  const handleUpload = ({ file }) => {
    setBookData((prev) => ({
      ...prev,
      cover: file,
    }));
  };


  const handleSave = async () => {
  const updatedBook = {
    ...bookData,
    price: {
      amount: parseFloat(bookData.price.amount) || 0,
      currency: "USD",
    },
    discountAmount: parseFloat(bookData.discountPrice) || 0,
    // Remove quantity from update to check if backend changes it
    // quantity: Number(bookData.quantity) || 0,
  };

  try {
    await updateBook({
      bookId: book._id,
      updatedBook,
    }).unwrap();
    message.success("Book updated successfully!");
    onClose();
  } catch (err) {
    console.error(err);
    message.error("Failed to update book.");
  }
};





  // Save handler with validated and cleaned payload
  // const handleSave = async () => {
  //   const updatedBook = {
  //     ...bookData,
  //     price: {
  //       amount: parseFloat(bookData.price.amount) || 0,
  //       currency: "USD",
  //     },
  //     discountAmount: parseFloat(bookData.discountPrice) || 0,
  //     quantity: Number(bookData.quantity) || 0,
  //   };

  //   console.log("Saving updated book:", updatedBook);

  //   try {
  //     await updateBook({
  //       bookId: book._id,
  //       updatedBook,
  //     }).unwrap();
  //     message.success("Book updated successfully!");
  //     onClose();
  //     if (onSave) onSave(updatedBook);
  //   } catch (err) {
  //     if (err?.data) {
  //       console.error("Server error response:", err.data);
  //       message.error(`Failed to update book: ${err.data.message || JSON.stringify(err.data)}`);
  //     } else if (err?.error) {
  //       console.error("Error:", err.error);
  //       message.error(`Failed to update book: ${err.error}`);
  //     } else {
  //       console.error("Unknown error:", err);
  //       message.error("Failed to update book. Please try again.");
  //     }
  //   }
  // };

  return (
    <Modal
      title="Edit Product"
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
              value={bookData.price.amount || ""}
              onChange={handlePriceChange}
              placeholder="$0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <Input
              name="quantity"
              type="number"
              min={0}
              value={bookData.quantity || ""}
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
              <Select.Option value="1st">1st</Select.Option>
              <Select.Option value="2nd">2nd</Select.Option>
              <Select.Option value="3rd">3rd</Select.Option>
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
