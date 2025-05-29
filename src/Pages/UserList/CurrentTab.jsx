import { useNavigate } from "react-router-dom";
import { AllImages } from "../../assets/image/AllImages";
import { Button, Card, Spin, Alert } from "antd";
import { Edit } from "lucide-react";
import { useGetBoxByUserIdQuery } from "../../redux/features/box/boxApi";

const CurrentBoxTab = ({ userId }) => {
  const navigate = useNavigate();

  if (!userId) {
    return <Alert message="User ID missing" type="warning" />;
  }

  const {
    data: boxData,
    error: boxError,
    isLoading: boxLoading,
  } = useGetBoxByUserIdQuery(userId);

  if (boxLoading) {
    return <Spin tip="Loading assigned box..." />;
  }

  if (boxError) {
    if (boxError.status === 404) {
      return (
        <Alert message="No assigned box found for this user." type="info" />
      );
    }
    return (
      <Alert
        message="Error fetching box"
        type="error"
        description={JSON.stringify(boxError)}
      />
    );
  }

  if (!boxData?.data) {
    return <p>No box assigned or details not available.</p>;
  }

  const box = boxData.data;

  const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, "");
  const imageSrc = box.image
    ? `${backendUrl}/${box.image.replace(/\\/g, "/")}`
    : AllImages.boxes;

  const handleEdit = (id) => {
    navigate(`/edit-box/${id}`);
  };

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Assigned Box</h3>
      <Card
        key={box._id}
        className="flex flex-col items-center w-1/4 p-4 text-center bg-white rounded-lg shadow-lg"
      >
        <div className="flex flex-col items-center">
          <img
            src={imageSrc}
            alt={box.title || "Box Image"}
            className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h3 className="text-lg font-semibold">
            {box.title || "Unnamed Box"}
          </h3>
          <p className="text-sm text-gray-600">
            Price:{" "}
            {box.price?.amount
              ? `${box.price.amount} ${box.price.currency}`
              : "Price N/A"}
          </p>
          <p className="text-sm text-gray-600">Piece: {box.piece || "N/A"}</p>
        </div>
        <Button
          className="mt-4 bg-[#F37975] text-white w-full flex items-center justify-center hover:bg-[#F37975]"
          onClick={() => handleEdit(box._id)}
        >
          <Edit className="mr-2" /> Edit Box
        </Button>
      </Card>
    </div>
  );
};

export default CurrentBoxTab;
