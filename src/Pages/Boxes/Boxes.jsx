import { useState } from "react";
import { Card, Button } from "antd";
import { Edit } from "lucide-react";
import { AllImages } from "../../assets/image/AllImages";
import { useNavigate } from "react-router-dom";

const boxes = [
  { id: 1, name: "Tiny Mu'mins Box", price: "$14.99", pieces: 722, image: "/box1.jpg", type: "box" },
  { id: 2, name: "Little Caliphs Box", price: "$14.99", pieces: 722, image: "/box2.jpg", type: "box" },
  { id: 3, name: "Deen Discoverers Box", price: "$14.99", pieces: 722, image: "/box3.jpg", type: "box" },
  { id: 4, name: "Islamic Explorers Box", price: "$14.99", pieces: 722, image: "/box4.jpg", type: "box" },
  { id: 5, name: "Gift Box", price: "$14.99", pieces: 7, image: "/box5.jpg", type: "gift" },
];

const BoxesList = () => {
  const navigate = useNavigate();

  const handleEdit = (boxId) => {
    navigate(`/edit-box/${boxId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Boxes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boxes.filter(box => box.type === "box").map((box) => (
          <Card key={box.id} className="shadow-lg rounded-lg bg-white p-4 text-center flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={AllImages.boxes} alt={box.name} className="w-24 h-24 object-cover rounded-full mb-4 mx-auto" />
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
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6">Gift Card</h2>
      <div className="grid grid-cols-1">
        {boxes.filter(box => box.type === "gift").map((box) => (
          <Card key={box.id} className="shadow-lg rounded-lg bg-white p-4 text-center flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={AllImages.boxes} alt={box.name} className="w-24 h-24 object-cover rounded-full mb-4 mx-auto" />
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
        ))}
      </div>
    </div>
  );
};

export default BoxesList;