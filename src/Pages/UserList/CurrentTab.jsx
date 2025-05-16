import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AllImages } from "../../assets/image/AllImages";
import { Button, Card, Spin, Alert } from "antd";
import { Edit } from "lucide-react";
import { useGetCurrentInvoiceByUserIdQuery } from "../../redux/features/invoice/invoiceApi";

const CurrentBoxTab = () => {

  const { userId } = useParams(); 
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetCurrentInvoiceByUserIdQuery(userId);

  const handleEdit = (boxId) => {
    navigate(`/edit-box/${boxId}`);
  };

  if (isLoading) {
    return <Spin tip="Loading current invoice..." />;
  }

  if (error) {
    return <Alert message="Error fetching invoice" type="error" />;
  }

  if (!data?.data?.box) {
    return <p>No box assigned currently.</p>;
  }
  const box = data.data.box;
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Assigned Box</h3>
      <Card
        key={box.id || box._id}
        className="flex flex-col items-center w-1/4 p-4 text-center bg-white rounded-lg shadow-lg"
      >
        <div className="flex flex-col items-center">
          <img
            src={AllImages.boxes}
            alt={box.name || "Box Image"}
            className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h3 className="text-lg font-semibold">{box.name || "Unnamed Box"}</h3>
          <p className="text-sm text-gray-600">{box.price || "Price N/A"}</p>
          <p className="text-sm text-gray-600">Piece {box.pieces || "N/A"}</p>
        </div>
        <Button
          className="mt-4 bg-[#F37975] text-white w-full flex items-center justify-center hover:bg-[#F37975]"
          onClick={() => handleEdit(box.id || box._id)}
        >
          <Edit className="mr-2" /> Edit Box
        </Button>
      </Card>
    </div>
  );
};

export default CurrentBoxTab;
