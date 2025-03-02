import { DatePicker } from "antd";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetDashboardQuery } from "../../../redux/features/DashboardApi/dashboardApi";

const EarningGrowth = () => {
    const [selectedYear, setSelectedYear] = useState(dayjs().year());
    const { data: analytics } = useGetDashboardQuery();
    console.log(analytics?.data?.chartData);

    const appointmentStatistics = analytics?.data?.chartData?.months.map((month, index) => ({
        name: month,
        appontment: analytics?.data?.chartData?.subscriptionStatistics[index],
    }));
    console.log(appointmentStatistics);





    const onChange = (date, dateString) => {
        setSelectedYear(dateString);
    };

    return (
        <div className="mt-4 p-4">
            <div className="bg-gray-50 rounded-lg shadow px-4 py-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h1 className="text-lg md:text-xl font-medium">
                        Earning Growth
                    </h1>
                    <DatePicker
                        onChange={onChange}
                        defaultValue={dayjs(selectedYear, "YYYY")}
                        format={"YYYY"}
                        picker="year"
                        className="w-full md:w-auto"
                    />
                </div>

                {/* Chart Section */}
                <div className="mt-6" style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={appointmentStatistics}
                            margin={{
                                top: 10,
                                right: 20,
                                left: -10,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorappontment" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `${value}%`} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="appontment"
                                stroke="#d4af37"
                                fillOpacity={1}
                                fill="url(#colorappontment)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EarningGrowth;
