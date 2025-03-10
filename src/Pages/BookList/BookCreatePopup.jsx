import { useState } from "react";
import { Modal, Input, Select, Button, Upload, Switch, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddBookPopup = ({ visible, onClose, onSave }) => {
  const [bookData, setBookData] = useState({
    name: "",
    price: "",
    readerAge: "",
    grade: "",
    quantity: "",
    collections: "",
    author: "",
    language: "",
    level: "Beginner", // Default level is Beginner
    cover: null,
    summary: "",
    discountAvailable: false, // New field for discount toggle
    discountType: "percentage", // Default discount type (percentage)
    discountPrice: "", // Field for discount price
  });

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

  return (
    <Modal
      title="Add New Product"
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
            className="w-full h-40 object-cover"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="Select Age Group"
              onChange={(value) => handleSelectChange("readerAge", value)}
            >
              <Select.Option value="0-3">0-3</Select.Option>
              <Select.Option value="4-7">4-7</Select.Option>
              <Select.Option value="8+">8+</Select.Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Reader Grade</label>
            <Select
              placeholder="Select Grade"
              onChange={(value) => handleSelectChange("grade", value)}
            >
              <Select.Option value="1st">1st</Select.Option>
              <Select.Option value="2nd">2nd</Select.Option>
              <Select.Option value="3rd">3rd</Select.Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Collections</label>
            <Select
              placeholder="Select Collection"
              onChange={(value) => handleSelectChange("collections", value)}
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
              placeholder="Select Language"
              onChange={(value) => handleSelectChange("language", value)}
            >
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Arabic">Arabic</Select.Option>
              <Select.Option value="French">French</Select.Option>
            </Select>
          </div>

          {/* Updated Level Field as Dropdown */}
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

          {/* Updated Summary Field with full width */}
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

          {/* If discount is available, show discount type and price */}
          {bookData.discountAvailable && (
            <div className="col-span-2 flex gap-4">
              {/* Discount Type (Radio Buttons) */}
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

              {/* Discount Price */}
              <div className="w-1/2">
                <label className="block text-sm font-medium">
                  Discount Price
                </label>
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
          onClick={() => onSave(bookData)}
        >
          Save Book
        </Button>
      </div>
    </Modal>
  );
};

export default AddBookPopup;
