import { useState } from "react";
import { Modal, Input, Select, Button, Upload } from "antd";
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
    level: "",
    cover: null,
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

  return (
    <Modal
      title="Add New Book"
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
            <label className="block text-sm font-medium">Book Name</label>
            <Input
              name="name"
              value={bookData.name}
              onChange={handleInputChange}
              placeholder="Enter book name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Book Price</label>
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
          <div>
            <label className="block text-sm font-medium">Level</label>
            <Input
              name="level"
              value={bookData.level}
              onChange={handleInputChange}
              placeholder="Enter book level"
            />
          </div>
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
