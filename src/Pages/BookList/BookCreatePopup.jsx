import { useState } from "react";
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
  useCreateBookMutation,
  useGetAllCategoryQuery,
  useGetAllGradeQuery,
  useGetAllCollectionQuery,
} from "../../redux/features/products/productsApi";

const AddBookPopup = ({ visible, onClose }) => {
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
    summary: "",
    discountAvailable: false,
    discountType: "",
    discountPrice: "",
    category: "",
    weight: "",
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoryQuery();

  const {
    data: grades,
    isLoading: gradesLoading,
    error: gradesError,
  } = useGetAllGradeQuery();

  const {
    data: collections,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useGetAllCollectionQuery();

  const categoryList =
    categories?.data || categories?.categories || categories || [];
  const gradeList = grades?.data || grades?.grades || grades || [];
  const collectionList =
    collections?.data || collections?.collections || collections || [];

  const [createBook, { isLoading }] = useCreateBookMutation();

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

  // const handleSave = async () => {
  //   if (!bookData.category || !bookData.grade || !bookData.collections) {
  //     message.error("Please select Category, Grade, and Collection");
  //     return;
  //   }

  //   const formData = new FormData();

  //   formData.append("category", bookData.category);
  //   formData.append("grade", bookData.grade);
  //   formData.append("bookCollection", bookData.collections);
  //   formData.append("name", bookData.name);
  //   formData.append("author", bookData.author);
  //   formData.append("description", bookData.summary);
  //   formData.append("quantity", String(bookData.quantity));
  //   formData.append("format", "paper");
  //   formData.append("status", "instock");
  //   formData.append("isArabic", "false");
  //   formData.append("bookLanguage", bookData.language);
  //   formData.append("level", bookData.level);
  //   formData.append("weight", String(parseFloat(bookData.weight) || 0));

  //   formData.append(
  //     "price",
  //     JSON.stringify({ amount: Number(bookData.price), currency: "USD" })
  //   );

  //   formData.append("isDiscount", bookData.discountAvailable ? "true" : "false");

  //   if (bookData.discountAvailable) {
  //     formData.append(
  //       "discountPrice",
  //       JSON.stringify({
  //         type: bookData.discountType,
  //         amount: Number(bookData.discountPrice),
  //         currency: "USD",
  //       })
  //     );
  //   }

  //   if (bookData.cover) {
  //     formData.append("coverImage", bookData.cover);
  //   }

  //   try {
  //     await createBook(formData).unwrap();
  //     message.success("Book created successfully!");
  //     onClose();
  //   } catch (err) {
  //     message.error("Failed to create book. Please try again.");
  //     console.error("Error details:", err);
  //     if (err?.data) {
  //       console.error("Backend response:", err.data);
  //     }
  //   }
  // };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("category", bookData.category);
    formData.append("grade", bookData.grade);
    formData.append("bookCollection", bookData.collections);
    formData.append("name", bookData.name);
    formData.append("author", bookData.author);
    formData.append("description", bookData.summary);
    formData.append("quantity", String(bookData.quantity));
    formData.append("format", "paper");
    formData.append("status", "instock");
    formData.append("isArabic", "false");
    formData.append("bookLanguage", bookData.language);
    formData.append("level", bookData.level);
    formData.append("weight", String(parseFloat(bookData.weight) || 0));
    formData.append(
      "price",
      JSON.stringify({ amount: Number(bookData.price), currency: "USD" })
    );
    formData.append(
      "isDiscount",
      bookData.discountAvailable ? "true" : "false"
    );
    if (bookData.discountAvailable) {
      formData.append(
        "discountPrice",
        JSON.stringify({
          type: bookData.discountType,
          amount: Number(bookData.discountPrice),
          currency: "USD",
        })
      );
    }
    if (bookData.cover) {
      formData.append("coverImage", bookData.cover);
    }
    try {
      await createBook(formData).unwrap();
      message.success("Book created successfully!");
      onClose();
    } catch (err) {
      message.error("Failed to create book. Please try again.");
      console.error("Full error object:", err);
      if (err?.data) console.error("Backend response data:", err.data);
      if (err?.error) console.error("Backend error message:", err.error);
    }
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
            className="object-cover w-full h-40"
          />
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <Select
              placeholder="Select Category"
              onChange={(value) => handleSelectChange("category", value)}
              loading={categoriesLoading}
              allowClear
              value={bookData.category || undefined}
            >
              {categoryList.map((cat) => (
                <Select.Option
                  key={cat._id || cat.id}
                  value={cat._id || cat.id}
                >
                  {cat.title}
                </Select.Option>
              ))}
            </Select>
            {categoriesError && (
              <p style={{ color: "red" }}>Failed to load categories</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Reader Grade</label>
            <Select
              placeholder="Select Grade"
              onChange={(value) => handleSelectChange("grade", value)}
              loading={gradesLoading}
              allowClear
              value={bookData.grade || undefined}
            >
              {gradeList.map((grade) => (
                <Select.Option
                  key={grade._id || grade.id}
                  value={grade._id || grade.id}
                >
                  {grade.title}
                </Select.Option>
              ))}
            </Select>
            {gradesError && (
              <p style={{ color: "red" }}>Failed to load grades</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Collections</label>
            <Select
              placeholder="Select Collection"
              onChange={(value) => handleSelectChange("collections", value)}
              loading={collectionsLoading}
              allowClear
              value={bookData.collections || undefined}
            >
              {collectionList.map((col) => (
                <Select.Option
                  key={col._id || col.id}
                  value={col._id || col.id}
                >
                  {col.title}
                </Select.Option>
              ))}
            </Select>
            {collectionsError && (
              <p style={{ color: "red" }}>Failed to load collections</p>
            )}
          </div>

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
              placeholder="120"
              type="number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <Input
              name="quantity"
              value={bookData.quantity}
              onChange={handleInputChange}
              placeholder="225"
              type="number"
            />
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
              value={bookData.language || undefined}
            >
              <Select.Option value="arabic">Arabic</Select.Option>
              <Select.Option value="english">English</Select.Option>
              <Select.Option value="french">French</Select.Option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Level</label>
            <Select
              value={bookData.level}
              onChange={(value) => handleSelectChange("level", value)}
              placeholder="Select Level"
            >
              <Select.Option value="beginner">Beginner</Select.Option>
              <Select.Option value="intermediate">Intermediate</Select.Option>
              <Select.Option value="advanced">Advanced</Select.Option>
            </Select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Weight (kg)</label>
            <Input
              name="weight"
              value={bookData.weight}
              onChange={handleInputChange}
              placeholder="0.32"
              type="number"
              step="0.01"
            />
          </div>

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

          <div className="col-span-2">
            <label className="block text-sm font-medium">
              Discount Available
            </label>
            <Switch
              checked={bookData.discountAvailable}
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
                  value={bookData.discountPrice}
                  onChange={handleInputChange}
                  placeholder="10"
                  type="number"
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
          Save Book
        </Button>
      </div>
    </Modal>
  );
};

export default AddBookPopup;
