import { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Upload, Switch, Radio, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUpdateBookMutation } from "../../redux/features/products/productsApi";

const EditBookPopup = ({ visible, onClose, book, onSave }) => {
  const [bookData, setBookData] = useState({
    ...book,
  });
  const [updateBook, { isLoading, isError, isSuccess, error }] = useUpdateBookMutation();  // Using the hook

  useEffect(() => {
    if (book) {
      setBookData({ ...book });
    }
  }, [book]);

  const handleInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setBookData({ ...bookData, [name]: value });
  };

  const handleUpload = ({ file }) => {
    setBookData({ ...bookData, cover: file });
  };

  const handleDiscountToggle = (checked) => {
    setBookData({ ...bookData, discountAvailable: checked });
  };

  const handleDiscountTypeChange = (e) => {
    setBookData({ ...bookData, discountType: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Trigger the mutation to update the book
      const updatedBook = await updateBook({ bookId: book._id, updatedBook: bookData }).unwrap();
     
      // If successful, show success message
      message.success("Book updated successfully!");
      onClose();  // Close the modal after saving
    } catch (err) {
      // If error, show error message
      message.error("Failed to update book. Please try again.");
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
    >
      <div className="flex flex-col gap-4">
        <Upload beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
          <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
        </Upload>
        {bookData.cover && (
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
              value={bookData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Product Price</label>
            <Input
              name="price"
              value={bookData.price}
              onChange={handleInputChange}
              placeholder="$0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Reader Age</label>
            <Select
              value={bookData.readerAge}
              onChange={(value) => handleSelectChange("readerAge", value)}
              placeholder="Select Age Group"
            >
              <Select.Option value="0-3">0-3</Select.Option>
              <Select.Option value="4-7">4-7</Select.Option>
              <Select.Option value="8+">8+</Select.Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Reader Grade</label>
            <Select
              value={bookData.grade}
              onChange={(value) => handleSelectChange("grade", value)}
              placeholder="Select Grade"
            >
              <Select.Option value="1st">1st</Select.Option>
              <Select.Option value="2nd">2nd</Select.Option>
              <Select.Option value="3rd">3rd</Select.Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Collections</label>
            <Select
              value={bookData.collection}
              onChange={(value) => handleSelectChange("collection", value)}
              placeholder="Select Collection"
            >
              <Select.Option value="Fiction">Fiction</Select.Option>
              <Select.Option value="Non-Fiction">Non-Fiction</Select.Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Author</label>
            <Input
              name="author"
              value={bookData.author}
              onChange={handleInputChange}
              placeholder="Enter author's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Language</label>
            <Select
              value={bookData.language}
              onChange={(value) => handleSelectChange("language", value)}
              placeholder="Select Language"
            >
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Arabic">Arabic</Select.Option>
              <Select.Option value="French">French</Select.Option>
            </Select>
          </div>

          {/* Level Dropdown */}
          <div>
            <label className="block text-sm font-medium">Level</label>
            <Select
              value={bookData.level}
              onChange={(value) => handleSelectChange("level", value)}
              placeholder="Select Level"
            >
              <Select.Option value="Beginner">Beginner</Select.Option>
              <Select.Option value="Intermediate">Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
            </Select>
          </div>

          {/* Summary Field */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Summary</label>
            <Input.TextArea
              name="summary"
              value={bookData.summary}
              onChange={handleInputChange}
              placeholder="Enter a brief summary of the book"
              rows={4}
              className="w-full"
            />
          </div>

          {/* Discount Available Toggle */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">
              Discount Available
            </label>
            <Switch
              checked={bookData.discountAvailable}
              onChange={handleDiscountToggle}
            />
          </div>

          {/* Discount Type and Discount Price */}
          {bookData.discountAvailable && (
            <div className="flex col-span-2 gap-4">
              {/* Discount Type (Radio Buttons) */}
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

              {/* Discount Price */}
              <div className="w-1/2">
                <label className="block text-sm font-medium">Discount Price</label>
                <Input
                  name="discountPrice"
                  value={bookData.discountPrice}
                  onChange={handleInputChange}
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
          onClick={handleSave}  // Calling the save handler
          loading={isLoading}  // Show loading state when mutation is in progress
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditBookPopup;
