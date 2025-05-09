import React from "react";
import { AllImages } from "../../assets/image/AllImages";
import { Button, Card } from "antd";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CurrentBoxTab = () => {
  const navigate = useNavigate();
  const box = {
    id: 1,
    name: "Tiny Mu'mins Box",
    price: "$14.99",
    pieces: 722,
    image: "/box1.jpg",
    type: "box",
  };

  const handleEdit = (boxId) => {
    navigate(`/edit-box/${boxId}`);
  };

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Assigned Box</h3>
      <Card
        key={box.id}
        className="flex flex-col items-center w-1/4 p-4 text-center bg-white rounded-lg shadow-lg"
      >
        <div className="flex flex-col items-center">
          <img
            src={AllImages.boxes}
            alt={box.name}
            className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h3 className="text-lg font-semibold">{box.name}</h3>
          <p className="text-sm text-gray-600">{box.price}</p>
          <p className="text-sm text-gray-600">Piece {box.pieces}</p>
        </div>
        <Button
          className="mt-4 bg-[#F37975] text-white w-full flex items-center justify-center hover:bg-[#F37975]"
          onClick={() => handleEdit(box.id)}
        >
          <Edit className="mr-2" /> Edit Box
        </Button>
      </Card>
    </div>
  );
};

export default CurrentBoxTab;
