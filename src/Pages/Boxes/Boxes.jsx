import { Card, Button, Spin } from "antd";
import { Edit } from "lucide-react";
import { AllImages } from "../../assets/image/AllImages";
import { useNavigate } from "react-router-dom";
import { useGetAllBoxQuery } from "../../redux/features/box/boxApi";

const BoxesList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllBoxQuery();

  const boxes = Array.isArray(data?.data) ? data.data : [];

  const handleEdit = (id) => {
    navigate(`/edit-box/${id}`);
  };

  if (isLoading) return <Spin size="large" className="p-10" />;
  if (isError) return <div>Error: {error.message}</div>;

  const regularBoxes = boxes.filter((box) => box.type === "regular");
  const giftBoxes = boxes.filter((box) => box.type === "gift");

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Boxes</h1>

      {/* Regular Boxes */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {regularBoxes.map((box) => (
          <Card
            key={box._id}
            className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-lg"
          >
            <img
              src={box.image || AllImages.boxes}
              alt={box.title}
              className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-lg font-semibold">{box.title}</h3>
    
            <p className="text-sm text-gray-600">
              Price: {box.price.amount} {box.price.currency}
            </p>
            {/* <p className="text-sm text-gray-600">Pieces: {box.piece}</p> */}
             <p className="text-sm text-gray-600">Pieces: {box.books?.length}</p>

            <Button
              className="mt-4 bg-[#F37975] text-white w-full flex items-center justify-center hover:bg-[#F37975]"
              onClick={() => handleEdit(box._id)}
            >
              <Edit className="mr-2" /> Edit Box
            </Button>
          </Card>
        ))}
      </div>

      {/* Gift Boxes */}
      <h2 className="mt-10 mb-6 text-2xl font-bold">Gift Boxes</h2>
      <div className="grid grid-cols-1">
        {giftBoxes.map((box) => (
          <Card
            key={box._id}
            className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-lg"
          >
            <img
              src={box.image || AllImages.boxes}
              alt={box.title}
              className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-lg font-semibold">{box.title}</h3>
            <p className="text-sm text-gray-600">
              {box.books?.length || 0} Books
            </p>
            <p className="text-sm text-gray-600">
              Price: {box.price.amount} {box.price.currency}
            </p>
            <p className="text-sm text-gray-600">Pieces: {box.piece}</p>

            <Button
              className="mt-4 bg-[#F37975] text-white w-full flex items-center justify-center hover:bg-[#F37975]"
              onClick={() => handleEdit(box._id)}
            >
              <Edit className="mr-2" /> Edit Box
            </Button>
          </Card>
        ))}
      </div>

      {/* Totals */}
      <div className="p-6 mt-10 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold">Summary</h2>
        <p>Total Boxes: {boxes.length}</p>
        <p>
          Total Books:{" "}
          {boxes.reduce((sum, box) => sum + (box.books?.length || 0), 0)}
        </p>
        <p>
          Total Price:{" "}
          {boxes.reduce((sum, box) => sum + (box.price?.amount || 0), 0)} USD
        </p>
      </div>
    </div>
  );
};

export default BoxesList;
