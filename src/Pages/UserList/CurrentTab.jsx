import { useNavigate } from "react-router-dom";
import { AllImages } from "../../assets/image/AllImages";
import { Button, Card, Spin, Alert } from "antd";
import { Edit } from "lucide-react";
import { useGetCurrentInvoiceByUserIdQuery } from "../../redux/features/invoice/invoiceApi";
import { useGetBoxByIdQuery } from "../../redux/features/box/boxApi";

const CurrentBoxTab = ({ userId }) => {
  const navigate = useNavigate();

  if (!userId) {
    return <Alert message="User ID missing" type="warning" />;
  }

  const { data: invoiceData, error: invoiceError, isLoading: invoiceLoading } = useGetCurrentInvoiceByUserIdQuery(userId);

  const boxId = invoiceData?.data?.box;

  const { data: boxData, error: boxError, isLoading: boxLoading } = useGetBoxByIdQuery(boxId, {
    skip: !boxId,
  });

  const handleEdit = (id) => {
    navigate(`/edit-box/${id}`);
  };

  if (invoiceLoading || boxLoading) {
    return <Spin tip="Loading current invoice and box..." />;
  }

  if (invoiceError) {
    // Handle 404 (invoice not found) gracefully
    if (invoiceError.status === 404) {
      return <Alert message="No current invoice found for this user." type="info" />;
    }
    return <Alert message="Error fetching invoice" type="error" description={JSON.stringify(invoiceError)} />;
  }

  if (boxError) {
    return <Alert message="Error fetching box details" type="error" description={JSON.stringify(boxError)} />;
  }

  if (!boxData?.data) {
    return <p>No box assigned or details not available.</p>;
  }

  const box = boxData.data;

  console.log(box)

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
