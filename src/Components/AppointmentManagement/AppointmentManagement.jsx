import { useParams } from "react-router-dom";
import ConsultationHistory from "./ConsultationHistory";
import { useGetAppointmentQuery } from "../../redux/features/AppointmentApi/appointmentApi";
import GoBackButton from "../Shared/GoBackButton";
import { BASE_URL } from "../../utils/baseUrl";
import { Image } from "antd";

const AppointmentManagement = () => {
    const { id } = useParams();
    const { data: appointmentData } = useGetAppointmentQuery();
    const appointment = appointmentData?.data.find((item) => item._id === id);

    if (!appointment) return <p>No appointment found</p>;
    console.log(appointment);

    return (
        <div className="bg-white p-5">
            <GoBackButton />
            <div className="flex flex-col md:flex-row justify-between items-end border-b  pb-5 ">
                <div>
                    <h1 className="text-xl md:text-3xl font-bold mb-5">Patients details</h1>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <img src={`${BASE_URL}/v1/${appointment?.patient?.profile?.image}`} alt="" className="w-10 h-10 rounded-full" />
                            <p className="font-semibold text-xl">{appointment?.patient?.firstName + " " + appointment?.patient?.lastName}</p>
                        </div>
                        <p >Phone: {appointment?.patient?.phone}</p>
                        <p>Gender:{appointment?.patient?.profile?.gender}</p>

                    </div>

                </div>

                <div className=" " >
                    <h1 className="text-xl md:text-3xl font-bold mb-5">Doctor details</h1>
                    <div className="flex md:flex-row justify-end items-end">
                        <div>
                            <div className=" flex items-center gap-2 pb-2">
                                <p className="font-semibold text-xl">{appointment?.therapist?.firstName + " " + appointment?.therapist?.lastName}</p>
                                <Image src={`${BASE_URL}/v1/${appointment?.therapist?.profile?.image}`} alt="" className="h-10 w-10 rounded-full" height={50} width={50} />

                            </div>
                            <div>
                                <p> Role: {appointment?.therapist?.role}</p>
                                <p>phone:{appointment?.therapist?.phone}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="my-5 border-b border-b-primary pb-10">

                <div className="flex justify-between items-center gap-2">
                    <p className="font-bold">Appointment date :</p>
                    <p>{appointment?.date.split("T")[0]} , {appointment?.slot}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="font-bold">Appointment Fee :</p>
                    <p>{appointment?.feeInfo.bookedFee?.amount + " " + appointment?.feeInfo.bookedFee?.currency}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="font-bold">Appointment Status :</p>
                    <p className={appointment?.status === "pending" ? "text-yellow-500" : appointment?.status === "completed" || appointment?.status === "approved" ? "text-green-500" : appointment?.status === "cancelled" || appointment?.status === "cancelled-approved" || appointment?.status === "missed"
                        || appointment?.status === "cancelled-requested" ? "text-red-500" : appointment?.status === "rescheduled" ? "text-blue-500" : "font-semibold"}>{appointment?.status}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="font-bold">Reason :</p>
                    <p>{appointment?.reason}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="font-bold">Description:</p>
                    <p>{appointment?.description}</p>
                </div>


            </div>
            <ConsultationHistory />

        </div>
    );
};

export default AppointmentManagement;