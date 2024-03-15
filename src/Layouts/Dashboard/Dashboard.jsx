import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from "recharts";

const Dashboard = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://account-ser.vercel.app/sales-report')
            .then(res => res.json())
            .then(data => {
                const top12Data = data.slice(0, 12);
                setData(top12Data);
            });
    }, [])

    console.log(data);

    const data2 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
        { name: "Group D", value: 200 },
        { name: "Group D", value: 200 }
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#00C49F", "#FFBB28"];

    const RADIAN = Math.PI / 180;
    function renderCustomizedLabel({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }
    console.log(data2);

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
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? ((data[0].Sale ? data[0].Sale : 0) + (data[1].Sale ? data[1].Sale : 0) + (data[2].Sale ? data[2].Sale : 0) + (data[3].Sale ? data[3].Sale : 0) + (data[4].Sale ? data[4].Sale : 0) + (data[5].Sale ? data[5].Sale : 0) + (data[6].Sale ? data[6].Sale : 0) + (data[7].Sale ? data[7].Sale : 0) + (data[8].Sale ? data[8].Sale : 0) + (data[9].Sale ? data[9].Sale : 0) + (data[10].Sale ? data[10].Sale : 0) + (data[11].Sale ? data[11].Sale : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
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
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? ((data[0].Purchase ? data[0].Purchase : 0) + (data[1].Purchase ? data[1].Purchase : 0) + (data[2].Purchase ? data[2].Purchase : 0) + (data[3].Purchase ? data[3].Purchase : 0) + (data[4].Purchase ? data[4].Purchase : 0) + (data[5].Purchase ? data[5].Purchase : 0) + (data[6].Purchase ? data[6].Purchase : 0) + (data[7].Purchase ? data[7].Purchase : 0) + (data[8].Purchase ? data[8].Purchase : 0) + (data[9].Purchase ? data[9].Purchase : 0) + (data[10].Purchase ? data[10].Purchase : 0) + (data[11].Purchase ? data[11].Purchase : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#ceffd5] rounded-xl">
                            <p className="text-3xl font-bold text-[#52fb6a]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Tax Income</h2>
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? (((data[0].Sale ? data[0].Sale : 0) + (data[1].Sale ? data[1].Sale : 0) + (data[2].Sale ? data[2].Sale : 0) + (data[3].Sale ? data[3].Sale : 0) + (data[4].Sale ? data[4].Sale : 0) + (data[5].Sale ? data[5].Sale : 0) + (data[6].Sale ? data[6].Sale : 0) + (data[7].Sale ? data[7].Sale : 0) + (data[8].Sale ? data[8].Sale : 0) + (data[9].Sale ? data[9].Sale : 0) + (data[10].Sale ? data[10].Sale : 0) + (data[11].Sale ? data[11].Sale : 0)) - ((data[0].Purchase ? data[0].Purchase : 0) + (data[1].Purchase ? data[1].Purchase : 0) + (data[2].Purchase ? data[2].Purchase : 0) + (data[3].Purchase ? data[3].Purchase : 0) + (data[4].Purchase ? data[4].Purchase : 0) + (data[5].Purchase ? data[5].Purchase : 0) + (data[6].Purchase ? data[6].Purchase : 0) + (data[7].Purchase ? data[7].Purchase : 0) + (data[8].Purchase ? data[8].Purchase : 0) + (data[9].Purchase ? data[9].Purchase : 0) + (data[10].Purchase ? data[10].Purchase : 0) + (data[11].Purchase ? data[11].Purchase : 0))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#fccaff] rounded-xl">
                            <p className="text-3xl font-bold text-[#f555ff]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Tax Outcome</h2>
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? (((data[0].Sale ? data[0].Sale : 0) + (data[1].Sale ? data[1].Sale : 0) + (data[2].Sale ? data[2].Sale : 0) + (data[3].Sale ? data[3].Sale : 0) + (data[4].Sale ? data[4].Sale : 0) + (data[5].Sale ? data[5].Sale : 0) + (data[6].Sale ? data[6].Sale : 0) + (data[7].Sale ? data[7].Sale : 0) + (data[8].Sale ? data[8].Sale : 0) + (data[9].Sale ? data[9].Sale : 0) + (data[10].Sale ? data[10].Sale : 0) + (data[11].Sale ? data[11].Sale : 0)) - ((data[0].Purchase ? data[0].Purchase : 0) + (data[1].Purchase ? data[1].Purchase : 0) + (data[2].Purchase ? data[2].Purchase : 0) + (data[3].Purchase ? data[3].Purchase : 0) + (data[4].Purchase ? data[4].Purchase : 0) + (data[5].Purchase ? data[5].Purchase : 0) + (data[6].Purchase ? data[6].Purchase : 0) + (data[7].Purchase ? data[7].Purchase : 0) + (data[8].Purchase ? data[8].Purchase : 0) + (data[9].Purchase ? data[9].Purchase : 0) + (data[10].Purchase ? data[10].Purchase : 0) + (data[11].Purchase ? data[11].Purchase : 0))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#FFEEC3] rounded-xl">
                            <p className="text-3xl font-bold text-[#FFb800]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Tax on Sales</h2>
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? ((data[0].Sale ? data[0].Sale : 0) + (data[1].Sale ? data[1].Sale : 0) + (data[2].Sale ? data[2].Sale : 0) + (data[3].Sale ? data[3].Sale : 0) + (data[4].Sale ? data[4].Sale : 0) + (data[5].Sale ? data[5].Sale : 0) + (data[6].Sale ? data[6].Sale : 0) + (data[7].Sale ? data[7].Sale : 0) + (data[8].Sale ? data[8].Sale : 0) + (data[9].Sale ? data[9].Sale : 0) + (data[10].Sale ? data[10].Sale : 0) + (data[11].Sale ? data[11].Sale : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#d1f3ff] rounded-xl">
                            <p className="text-3xl font-bold text-[#42cdff]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Tax on Purchases</h2>
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? ((data[0].Purchase ? data[0].Purchase : 0) + (data[1].Purchase ? data[1].Purchase : 0) + (data[2].Purchase ? data[2].Purchase : 0) + (data[3].Purchase ? data[3].Purchase : 0) + (data[4].Purchase ? data[4].Purchase : 0) + (data[5].Purchase ? data[5].Purchase : 0) + (data[6].Purchase ? data[6].Purchase : 0) + (data[7].Purchase ? data[7].Purchase : 0) + (data[8].Purchase ? data[8].Purchase : 0) + (data[9].Purchase ? data[9].Purchase : 0) + (data[10].Purchase ? data[10].Purchase : 0) + (data[11].Purchase ? data[11].Purchase : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#ceffd5] rounded-xl">
                            <p className="text-3xl font-bold text-[#52fb6a]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Tax Sales - Tax Purchases</h2>
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? (((data[0].Sale ? data[0].Sale : 0) + (data[1].Sale ? data[1].Sale : 0) + (data[2].Sale ? data[2].Sale : 0) + (data[3].Sale ? data[3].Sale : 0) + (data[4].Sale ? data[4].Sale : 0) + (data[5].Sale ? data[5].Sale : 0) + (data[6].Sale ? data[6].Sale : 0) + (data[7].Sale ? data[7].Sale : 0) + (data[8].Sale ? data[8].Sale : 0) + (data[9].Sale ? data[9].Sale : 0) + (data[10].Sale ? data[10].Sale : 0) + (data[11].Sale ? data[11].Sale : 0)) - ((data[0].Purchase ? data[0].Purchase : 0) + (data[1].Purchase ? data[1].Purchase : 0) + (data[2].Purchase ? data[2].Purchase : 0) + (data[3].Purchase ? data[3].Purchase : 0) + (data[4].Purchase ? data[4].Purchase : 0) + (data[5].Purchase ? data[5].Purchase : 0) + (data[6].Purchase ? data[6].Purchase : 0) + (data[7].Purchase ? data[7].Purchase : 0) + (data[8].Purchase ? data[8].Purchase : 0) + (data[9].Purchase ? data[9].Purchase : 0) + (data[10].Purchase ? data[10].Purchase : 0) + (data[11].Purchase ? data[11].Purchase : 0))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
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
                        <Bar dataKey="Sale" fill="#8884d8" />
                        <Bar dataKey="Purchase" fill="#82ca9d" />
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
                        <Bar dataKey="Sale" fill="#8884d8" />
                        <Bar dataKey="Purchase" fill="#82ca9d" />
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
                        <Bar dataKey="Sale" fill="#8884d8" />
                        <Bar dataKey="Purchase" fill="#82ca9d" />
                    </BarChart>
                </div>

            </div>
            <h2 className="text-[#28084B] text-2xl font-bold pb-8 mt-12">Without Tax Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#FFEEC3] rounded-xl">
                            <p className="text-3xl font-bold text-[#FFb800]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Total Income</h2>
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? ((data[0].Sale ? data[0].Sale : 0) + (data[1].Sale ? data[1].Sale : 0) + (data[2].Sale ? data[2].Sale : 0) + (data[3].Sale ? data[3].Sale : 0) + (data[4].Sale ? data[4].Sale : 0) + (data[5].Sale ? data[5].Sale : 0) + (data[6].Sale ? data[6].Sale : 0) + (data[7].Sale ? data[7].Sale : 0) + (data[8].Sale ? data[8].Sale : 0) + (data[9].Sale ? data[9].Sale : 0) + (data[10].Sale ? data[10].Sale : 0) + (data[11].Sale ? data[11].Sale : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
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
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? ((data[0].Purchase ? data[0].Purchase : 0) + (data[1].Purchase ? data[1].Purchase : 0) + (data[2].Purchase ? data[2].Purchase : 0) + (data[3].Purchase ? data[3].Purchase : 0) + (data[4].Purchase ? data[4].Purchase : 0) + (data[5].Purchase ? data[5].Purchase : 0) + (data[6].Purchase ? data[6].Purchase : 0) + (data[7].Purchase ? data[7].Purchase : 0) + (data[8].Purchase ? data[8].Purchase : 0) + (data[9].Purchase ? data[9].Purchase : 0) + (data[10].Purchase ? data[10].Purchase : 0) + (data[11].Purchase ? data[11].Purchase : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
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
                            <p className="text-base text-[#111] font-semibold">{(data.length > 0) ? (((data[0].Sale ? data[0].Sale : 0) + (data[1].Sale ? data[1].Sale : 0) + (data[2].Sale ? data[2].Sale : 0) + (data[3].Sale ? data[3].Sale : 0) + (data[4].Sale ? data[4].Sale : 0) + (data[5].Sale ? data[5].Sale : 0) + (data[6].Sale ? data[6].Sale : 0) + (data[7].Sale ? data[7].Sale : 0) + (data[8].Sale ? data[8].Sale : 0) + (data[9].Sale ? data[9].Sale : 0) + (data[10].Sale ? data[10].Sale : 0) + (data[11].Sale ? data[11].Sale : 0)) - ((data[0].Purchase ? data[0].Purchase : 0) + (data[1].Purchase ? data[1].Purchase : 0) + (data[2].Purchase ? data[2].Purchase : 0) + (data[3].Purchase ? data[3].Purchase : 0) + (data[4].Purchase ? data[4].Purchase : 0) + (data[5].Purchase ? data[5].Purchase : 0) + (data[6].Purchase ? data[6].Purchase : 0) + (data[7].Purchase ? data[7].Purchase : 0) + (data[8].Purchase ? data[8].Purchase : 0) + (data[9].Purchase ? data[9].Purchase : 0) + (data[10].Purchase ? data[10].Purchase : 0) + (data[11].Purchase ? data[11].Purchase : 0))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-20 flex justify-center">

                <div className="hidden lg:flex lg:flex-col">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data2}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
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
                        <Bar dataKey="Sale" fill="#8884d8" />
                        <Bar dataKey="Purchase" fill="#82ca9d" />
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
                        <Bar dataKey="Sale" fill="#8884d8" />
                        <Bar dataKey="Purchase" fill="#82ca9d" />
                    </BarChart>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;