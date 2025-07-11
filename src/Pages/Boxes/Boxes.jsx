import { useState } from "react";
import { Card, Button, Spin } from "antd";
import { Edit } from "lucide-react";
import { AllImages } from "../../assets/image/AllImages";
import { useNavigate } from "react-router-dom";
import { useGetAllBoxQuery } from "../../redux/features/box/boxApi";

const BoxesList = () => {
  const navigate = useNavigate();

  // Fetching boxes data from API using the custom hook
  const { data, isLoading, isError, error } = useGetAllBoxQuery();

  console.log("API Data:", data); 

  // Safely access the boxes array (from data.data)
  const boxes = Array.isArray(data?.data) ? data.data : [];

  const handleEdit = (id) => {
    navigate(`/edit-box/${id}`);
  };

  if (isLoading) {
    return <Spin size="large" className="p-10" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Boxes</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {boxes.filter((box) => box.type === "regular").map((box) => (
          <Card
            key={box._id}
            className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-lg"
          >
            <div className="flex flex-col items-center">
              <img
                src={AllImages.boxes}
                alt={box.title}
                className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">{box.title}</h3>
              <p className="text-sm text-gray-600">
                {box.price.amount} {box.price.currency}
              </p>
              <p className="text-sm text-gray-600">Piece {box.piece}</p>
            </div>
            <Button
              className="mt-4 bg-[#F37975] text-white w-full flex items-center justify-center hover:bg-[#F37975]"
              onClick={() => handleEdit(box._id)}
            >
              <Edit className="mr-2" /> Edit Box
            </Button>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 mb-6 text-2xl font-bold">Gift Card</h2>
      <div className="grid grid-cols-1">
        {boxes.filter((box) => box.type === "gift").map((box) => (
          <Card
            key={box._id}
            className="flex flex-col items-center p-4 text-center bg-white rounded-lg shadow-lg"
          >
            <div className="flex flex-col items-center">
              <img
                src={AllImages.boxes}
                alt={box.title}
                className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">{box.title}</h3>
              <p className="text-sm text-gray-600">
                {box.price.amount} {box.price.currency}
              </p>
              <p className="text-sm text-gray-600">Piece {box.piece}</p>
            </div>
            <Button
              className="mt-4 bg-[#F37975] text-white w-full flex items-center justify-center hover:bg-[#F37975]"
              onClick={() => handleEdit(box._id)}
            >
              <Edit className="mr-2" /> Edit Box
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoxesList;

