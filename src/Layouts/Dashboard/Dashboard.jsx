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
        { name: "GASTOS DE PERSONAL", value: 400 },
        { name: "GASTOS POR TRABAJOS, SUMINISTROS Y SERVICIOS", value: 300 },
        { name: "ARRENDAMIENTOS", value: 300 },
        { name: "GASTOS DE ACTIVOS FIJO", value: 200 },
        { name: "GASTOS DE REPRESENTACIÓN", value: 200 },
        { name: "OTRAS DEDUCCIONES ADMITIDAS", value: 200 },
        { name: "GASTOS FINANCIEROS", value: 200 },
        { name: "GASTOS EXTRAORDINARIOS", value: 200 },
        { name: "COMPRAS Y GASTOS QUE FORMARAN PARTE DEL COSTO DE VENTA", value: 200 },
        { name: "ADQUISICIONES DE ACTIVOS", value: 200 },
        { name: "GASTOS DE SEGUROS", value: 200 }
    ];

    const COLORS = ["#00B6CB", "#FFA800", "#03A9F4", "#7AC36A", "#F10096", "#5E35B1", "#00C49F", "#FFBB28", "#FF8042", "#e84f74", "#0B5DCF"];

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
                    <div className="grid grid-cols-2">
                        <PieChart width={400} height={400} className="text-[10px]">
                            <Pie
                                data={data2}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={160}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                        <div className="flex flex-col justify-center gap-3">
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#00B6CB]"></p>
                                <h2>GASTOS DE PERSONAL</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#FFA800]"></p>
                                <h2>GASTOS POR TRABAJOS, SUMINISTROS Y SERVICIOS</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#03A9F4]"></p>
                                <h2>ARRENDAMIENTOS</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#7AC36A]"></p>
                                <h2>GASTOS DE ACTIVOS FIJO</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#F10096]"></p>
                                <h2>GASTOS DE REPRESENTACIÓN</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#5E35B1]"></p>
                                <h2>OTRAS DEDUCCIONES ADMITIDAS</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#00C49F]"></p>
                                <h2>GASTOS FINANCIEROS</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#FFBB28]"></p>
                                <h2>GASTOS EXTRAORDINARIOS</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#FF8042]"></p>
                                <h2>COMPRAS Y GASTOS QUE FORMARAN PARTE DEL COSTO DE VENTA</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#e84f74]"></p>
                                <h2>ADQUISICIONES DE ACTIVOS</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="p-2 rounded-full bg-[#0B5DCF]"></p>
                                <h2>GASTOS DE SEGUROS</h2>
                            </div>
                        </div>
                    </div>
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