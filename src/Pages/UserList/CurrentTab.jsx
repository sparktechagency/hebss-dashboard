import { useNavigate } from "react-router-dom";
import { AllImages } from "../../assets/image/AllImages";
import { Button, Card, Spin, Alert } from "antd";
import { Edit } from "lucide-react";
import { useGetBoxByCategoryIdQuery } from "../../redux/features/box/boxApi";
import { AiOutlineUser } from "react-icons/ai";

const CurrentBoxTab = ({ categoryId }) => {
  const navigate = useNavigate();

  if (!categoryId) {
    return (
      <div className="flex justify-center items-center min-h-[200px] p-6">
        <div className="w-full max-w-lg p-6 text-center bg-white border-l-4 border-blue-500 shadow-xl rounded-xl">
          <div className="flex flex-col items-center gap-4">
            <AiOutlineUser className="w-12 h-12 text-blue-500" />
            <h2 className="text-2xl font-bold text-blue-600">
              User Not Subscribed
            </h2>
            <p className="text-sm text-gray-700 md:text-base">
              This user has not subscribed yet. After subscribing, the CurrentBox will be available here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    data: boxData,
    error: boxError,
    isLoading: boxLoading,
  } = useGetBoxByCategoryIdQuery(categoryId, {
    refetchOnMountOrArgChange: true, 
  });

  if (boxLoading) {
    return <Spin tip="Loading boxes by category..." />;
  }

  if (boxError) {
    if (boxError.status === 404) {
      return <Alert message="No boxes found for this category." type="info" />;
    }
    return (
      <Alert
        message="Error fetching boxes"
        type="error"
        description={JSON.stringify(boxError)}
      />
    );
  }

  if (!boxData?.data) {
    return <p>No boxes available for this category.</p>;
  }

  const boxes = Array.isArray(boxData.data) ? boxData.data : [boxData.data];
  const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, "");

  const handleEdit = (id) => {
    navigate(`/edit-box/${id}`);
  };

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Boxes in Category</h3>
      <div className="flex flex-wrap gap-4">
        {boxes.map((box) => {
          const imageSrc = box.image
            ? box.image.startsWith("http")
              ? box.image
              : `${backendUrl}/${box.image.replace(/\\/g, "/")}`
            : AllImages.boxes;

          return (
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
                <p className="text-sm text-gray-600">
                  Pieces: {box.books?.length ?? 0}
                </p>
              </div>
              <Button
                className="mt-4 bg-[#F37975] text-white w-full flex items-center justify-center hover:bg-[#F37975]"
                onClick={() => handleEdit(box._id)}
              >
                <Edit className="mr-2" /> Edit Box
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentBoxTab;
