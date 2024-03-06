import { FaDollarSign } from "react-icons/fa6";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const Dashboard = () => {

    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ];

    return (
        <div className='bg-[#eee] pt-8 pb-14 px-8'>
            <h2 className="text-[#28084B] text-2xl font-bold pb-8">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#FFEEC3] rounded-xl">
                            <p className="text-3xl font-bold text-[#FFb800]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Total Income</h2>
                            <p className="text-base text-[#111] font-semibold">35,000.00</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#d1f3ff] rounded-xl">
                            <p className="text-3xl font-bold text-[#42cdff]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Total Outcome</h2>
                            <p className="text-base text-[#111] font-semibold">35,000.00</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#ceffd5] rounded-xl">
                            <p className="text-3xl font-bold text-[#52fb6a]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Income - Outcome</h2>
                            <p className="text-base text-[#111] font-semibold">35,000.00</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#fccaff] rounded-xl">
                            <p className="text-3xl font-bold text-[#f555ff]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Purchase - Sale</h2>
                            <p className="text-base text-[#111] font-semibold">35,000.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-20 flex justify-center">

                <div className="hidden lg:flex lg:flex-col">
                    <BarChart
                        width={900}
                        height={400}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </div>
                <div className="hidden md:flex md:flex-col lg:hidden">
                    <BarChart
                        width={600}
                        height={350}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </div>
                <div className="flex flex-col md:hidden">
                    <BarChart
                        width={350}
                        height={200}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;