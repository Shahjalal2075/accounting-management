import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
//import { PieChart, Pie, Cell } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {

    /* For BarChart Start */
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://account-ser.vercel.app/sales-report')
            .then(res => res.json())
            .then(data => {
                const top12Data = data.slice(0, 12);
                setData(top12Data);
            });
    }, [])

    /* For BarChart End */

    /* For PieChart Start 
    const [data2, setData2] = useState([]);
    useEffect(() => {
        fetch('https://account-ser.vercel.app/concepto-report')
            .then(res => res.json())
            .then(data => {
                const top12Data = data.slice(0, 11);
                setData2(top12Data);
            });
    }, [])

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
    /* For PieChart End */

    const [filterData, setFilterData] = useState([]);
    const [searchStatus, setSearchStatus] = useState(false);

    const [selectedDate1, setSelectedDate1] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);

    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };
    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };

    const handleFilter = () => {
        setSearchStatus(!searchStatus);
        setFilterData([]);

        const firstDate = selectedDate1 && `${selectedDate1.getDate()}-${selectedDate1.getMonth() + 1}-${selectedDate1.getFullYear()}`;
        const parts1 = firstDate.split('-');
        const day1 = parseInt(parts1[0]);
        const month1 = parseInt(parts1[1]);
        const year1 = parseInt(parts1[2]);

        const secondDate = selectedDate2 && `${selectedDate2.getDate()}-${selectedDate2.getMonth() + 1}-${selectedDate2.getFullYear()}`;
        const parts2 = secondDate.split('-');
        const day2 = parseInt(parts2[0]);
        const month2 = parseInt(parts2[1]);
        const year2 = parseInt(parts2[2]);

        console.log(`Day1: ${day2}`);
        console.log(`Month1: ${month2}`);
        console.log(`Year1: ${year2}`);


        if (data && data.length > 0) {
            let newInvoice = [];
            for (let i = 0; i < data.length; i++) {
                if ((i + 1) >= month1 && (i + 1) <= month2) {
                    newInvoice = [...newInvoice, data[i]];
                }
            }
            setFilterData(newInvoice);
        }
    }

    console.log(filterData)

    return (
        <div className='bg-[#eee] pt-8 pb-14 px-8'>
            <div className="flex pb-10 items-center justify-between">
                <div className="">
                    <h2 className="text-[#28084B] text-2xl font-bold">Dashboard</h2>
                </div>
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="input bg-[#fff] input-bordered w-full flex items-center">
                            <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="dd-mm-yyyy"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className=' font-medium'>a</h2>
                    </div>
                    <div>
                        <div className="input bg-[#fff] input-bordered w-full flex items-center">
                            <DatePicker
                                selected={selectedDate2}
                                onChange={handleDateChange2}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="dd-mm-yyyy"
                            />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleFilter} className="px-4 cursor-pointer py-2 rounded-lg bg-[#733CFF] border border-[#733CFF] hover:border-[#733CFF] text-[#fff] hover:text-[#733CFF] hover:bg-[#fff]" disabled={(selectedDate1 === null) ? true : false}>
                            {
                                searchStatus ? 'Clear' : 'Filtrar'
                            }
                        </button>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#fff] rounded-lg py-8 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
                    <div className="flex justify-center items-center gap-4">
                        <div className="p-5 bg-[#FFEEC3] rounded-xl">
                            <p className="text-3xl font-bold text-[#FFb800]"><FaDollarSign /></p>
                        </div>
                        <div className="">
                            <h2 className="text-sm text-[#878A99] font-medium">Total Income</h2>
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? ((filterData[0] ? filterData[0].Sale : 0) + (filterData[1] ? filterData[1].Sale : 0) + (filterData[2] ? filterData[2].Sale : 0) + (filterData[3] ? filterData[3].Sale : 0) + (filterData[4] ? filterData[4].Sale : 0) + (filterData[5] ? filterData[5].Sale : 0) + (filterData[6] ? filterData[6].Sale : 0) + (filterData[7] ? filterData[7].Sale : 0) + (filterData[8] ? filterData[8].Sale : 0) + (filterData[9] ? filterData[9].Sale : 0) + (filterData[10] ? filterData[10].Sale : 0) + (filterData[11] ? filterData[11].Sale : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? ((data[0] ? data[0].Sale : 0) + (data[1] ? data[1].Sale : 0) + (data[2] ? data[2].Sale : 0) + (data[3] ? data[3].Sale : 0) + (data[4] ? data[4].Sale : 0) + (data[5] ? data[5].Sale : 0) + (data[6] ? data[6].Sale : 0) + (data[7] ? data[7].Sale : 0) + (data[8] ? data[8].Sale : 0) + (data[9] ? data[9].Sale : 0) + (data[10] ? data[10].Sale : 0) + (data[11] ? data[11].Sale : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? ((filterData[0] ? filterData[0].Purchase : 0) + (filterData[1] ? filterData[1].Purchase : 0) + (filterData[2] ? filterData[2].Purchase : 0) + (filterData[3] ? filterData[3].Purchase : 0) + (filterData[4] ? filterData[4].Purchase : 0) + (filterData[5] ? filterData[5].Purchase : 0) + (filterData[6] ? filterData[6].Purchase : 0) + (filterData[7] ? filterData[7].Purchase : 0) + (filterData[8] ? filterData[8].Purchase : 0) + (filterData[9] ? filterData[9].Purchase : 0) + (filterData[10] ? filterData[10].Purchase : 0) + (filterData[11] ? filterData[11].Purchase : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? ((data[0] ? data[0].Purchase : 0) + (data[1] ? data[1].Purchase : 0) + (data[2] ? data[2].Purchase : 0) + (data[3] ? data[3].Purchase : 0) + (data[4] ? data[4].Purchase : 0) + (data[5] ? data[5].Purchase : 0) + (data[6] ? data[6].Purchase : 0) + (data[7] ? data[7].Purchase : 0) + (data[8] ? data[8].Purchase : 0) + (data[9] ? data[9].Purchase : 0) + (data[10] ? data[10].Purchase : 0) + (data[11] ? data[11].Purchase : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? ((filterData[0] ? filterData[0].STax : 0) + (filterData[1] ? filterData[1].STax : 0) + (filterData[2] ? filterData[2].STax : 0) + (filterData[3] ? filterData[3].STax : 0) + (filterData[4] ? filterData[4].STax : 0) + (filterData[5] ? filterData[5].STax : 0) + (filterData[6] ? filterData[6].STax : 0) + (filterData[7] ? filterData[7].STax : 0) + (filterData[8] ? filterData[8].STax : 0) + (filterData[9] ? filterData[9].STax : 0) + (filterData[10] ? filterData[10].STax : 0) + (filterData[11] ? filterData[11].STax : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? ((data[0] ? data[0].STax : 0) + (data[1] ? data[1].STax : 0) + (data[2] ? data[2].STax : 0) + (data[3] ? data[3].STax : 0) + (data[4] ? data[4].STax : 0) + (data[5] ? data[5].STax : 0) + (data[6] ? data[6].STax : 0) + (data[7] ? data[7].STax : 0) + (data[8] ? data[8].STax : 0) + (data[9] ? data[9].STax : 0) + (data[10] ? data[10].STax : 0) + (data[11] ? data[11].STax : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? ((filterData[0] ? filterData[0].PTax : 0) + (filterData[1] ? filterData[1].PTax : 0) + (filterData[2] ? filterData[2].PTax : 0) + (filterData[3] ? filterData[3].PTax : 0) + (filterData[4] ? filterData[4].PTax : 0) + (filterData[5] ? filterData[5].PTax : 0) + (filterData[6] ? filterData[6].PTax : 0) + (filterData[7] ? filterData[7].PTax : 0) + (filterData[8] ? filterData[8].PTax : 0) + (filterData[9] ? filterData[9].PTax : 0) + (filterData[10] ? filterData[10].PTax : 0) + (filterData[11] ? filterData[11].PTax : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? ((data[0] ? data[0].PTax : 0) + (data[1] ? data[1].PTax : 0) + (data[2] ? data[2].PTax : 0) + (data[3] ? data[3].PTax : 0) + (data[4] ? data[4].PTax : 0) + (data[5] ? data[5].PTax : 0) + (data[6] ? data[6].PTax : 0) + (data[7] ? data[7].PTax : 0) + (data[8] ? data[8].PTax : 0) + (data[9] ? data[9].PTax : 0) + (data[10] ? data[10].PTax : 0) + (data[11] ? data[11].PTax : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? ((filterData[0] ? filterData[0].STax : 0) + (filterData[1] ? filterData[1].STax : 0) + (filterData[2] ? filterData[2].STax : 0) + (filterData[3] ? filterData[3].STax : 0) + (filterData[4] ? filterData[4].STax : 0) + (filterData[5] ? filterData[5].STax : 0) + (filterData[6] ? filterData[6].STax : 0) + (filterData[7] ? filterData[7].STax : 0) + (filterData[8] ? filterData[8].STax : 0) + (filterData[9] ? filterData[9].STax : 0) + (filterData[10] ? filterData[10].STax : 0) + (filterData[11] ? filterData[11].STax : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? ((data[0] ? data[0].STax : 0) + (data[1] ? data[1].STax : 0) + (data[2] ? data[2].STax : 0) + (data[3] ? data[3].STax : 0) + (data[4] ? data[4].STax : 0) + (data[5] ? data[5].STax : 0) + (data[6] ? data[6].STax : 0) + (data[7] ? data[7].STax : 0) + (data[8] ? data[8].STax : 0) + (data[9] ? data[9].STax : 0) + (data[10] ? data[10].STax : 0) + (data[11] ? data[11].STax : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? ((filterData[0] ? filterData[0].PTax : 0) + (filterData[1] ? filterData[1].PTax : 0) + (filterData[2] ? filterData[2].PTax : 0) + (filterData[3] ? filterData[3].PTax : 0) + (filterData[4] ? filterData[4].PTax : 0) + (filterData[5] ? filterData[5].PTax : 0) + (filterData[6] ? filterData[6].PTax : 0) + (filterData[7] ? filterData[7].PTax : 0) + (filterData[8] ? filterData[8].PTax : 0) + (filterData[9] ? filterData[9].PTax : 0) + (filterData[10] ? filterData[10].PTax : 0) + (filterData[11] ? filterData[11].PTax : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? ((data[0] ? data[0].PTax : 0) + (data[1] ? data[1].PTax : 0) + (data[2] ? data[2].PTax : 0) + (data[3] ? data[3].PTax : 0) + (data[4] ? data[4].PTax : 0) + (data[5] ? data[5].PTax : 0) + (data[6] ? data[6].PTax : 0) + (data[7] ? data[7].PTax : 0) + (data[8] ? data[8].PTax : 0) + (data[9] ? data[9].PTax : 0) + (data[10] ? data[10].PTax : 0) + (data[11] ? data[11].PTax : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? ((((filterData[0] ? filterData[0].STax : 0) + (filterData[1] ? filterData[1].STax : 0) + (filterData[2] ? filterData[2].STax : 0) + (filterData[3] ? filterData[3].STax : 0) + (filterData[4] ? filterData[4].STax : 0) + (filterData[5] ? filterData[5].STax : 0) + (filterData[6] ? filterData[6].STax : 0) + (filterData[7] ? filterData[7].STax : 0) + (filterData[8] ? filterData[8].STax : 0) + (filterData[9] ? filterData[9].STax : 0) + (filterData[10] ? filterData[10].STax : 0) + (filterData[11] ? filterData[11].STax : 0))) - (((filterData[0] ? filterData[0].PTax : 0) + (filterData[1] ? filterData[1].PTax : 0) + (filterData[2] ? filterData[2].PTax : 0) + (filterData[3] ? filterData[3].PTax : 0) + (filterData[4] ? filterData[4].PTax : 0) + (filterData[5] ? filterData[5].PTax : 0) + (filterData[6] ? filterData[6].PTax : 0) + (filterData[7] ? filterData[7].PTax : 0) + (filterData[8] ? filterData[8].PTax : 0) + (filterData[9] ? filterData[9].PTax : 0) + (filterData[10] ? filterData[10].PTax : 0) + (filterData[11] ? filterData[11].PTax : 0)))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? ((((data[0] ? data[0].STax : 0) + (data[1] ? data[1].STax : 0) + (data[2] ? data[2].STax : 0) + (data[3] ? data[3].STax : 0) + (data[4] ? data[4].STax : 0) + (data[5] ? data[5].STax : 0) + (data[6] ? data[6].STax : 0) + (data[7] ? data[7].STax : 0) + (data[8] ? data[8].STax : 0) + (data[9] ? data[9].STax : 0) + (data[10] ? data[10].STax : 0) + (data[11] ? data[11].STax : 0))) - (((data[0] ? data[0].PTax : 0) + (data[1] ? data[1].PTax : 0) + (data[2] ? data[2].PTax : 0) + (data[3] ? data[3].PTax : 0) + (data[4] ? data[4].PTax : 0) + (data[5] ? data[5].PTax : 0) + (data[6] ? data[6].PTax : 0) + (data[7] ? data[7].PTax : 0) + (data[8] ? data[8].PTax : 0) + (data[9] ? data[9].PTax : 0) + (data[10] ? data[10].PTax : 0) + (data[11] ? data[11].PTax : 0)))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-20 flex justify-center">

                <div className="hidden lg:flex lg:flex-col">
                    <BarChart
                        width={900}
                        height={400}
                        data={searchStatus ? filterData : data}
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
                        data={searchStatus ? filterData : data}
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
                        data={searchStatus ? filterData : data}
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? (((filterData[0] ? filterData[0].Sale : 0) + (filterData[1] ? filterData[1].Sale : 0) + (filterData[2] ? filterData[2].Sale : 0) + (filterData[3] ? filterData[3].Sale : 0) + (filterData[4] ? filterData[4].Sale : 0) + (filterData[5] ? filterData[5].Sale : 0) + (filterData[6] ? filterData[6].Sale : 0) + (filterData[7] ? filterData[7].Sale : 0) + (filterData[8] ? filterData[8].Sale : 0) + (filterData[9] ? filterData[9].Sale : 0) + (filterData[10] ? filterData[10].Sale : 0) + (filterData[11] ? filterData[11].Sale : 0)) - ((filterData[0] ? filterData[0].STax : 0) + (filterData[1] ? filterData[1].STax : 0) + (filterData[2] ? filterData[2].STax : 0) + (filterData[3] ? filterData[3].STax : 0) + (filterData[4] ? filterData[4].STax : 0) + (filterData[5] ? filterData[5].STax : 0) + (filterData[6] ? filterData[6].STax : 0) + (filterData[7] ? filterData[7].STax : 0) + (filterData[8] ? filterData[8].STax : 0) + (filterData[9] ? filterData[9].STax : 0) + (filterData[10] ? filterData[10].STax : 0) + (filterData[11] ? filterData[11].STax : 0))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? (((data[0] ? data[0].Sale : 0) + (data[1] ? data[1].Sale : 0) + (data[2] ? data[2].Sale : 0) + (data[3] ? data[3].Sale : 0) + (data[4] ? data[4].Sale : 0) + (data[5] ? data[5].Sale : 0) + (data[6] ? data[6].Sale : 0) + (data[7] ? data[7].Sale : 0) + (data[8] ? data[8].Sale : 0) + (data[9] ? data[9].Sale : 0) + (data[10] ? data[10].Sale : 0) + (data[11] ? data[11].Sale : 0)) - ((data[0] ? data[0].STax : 0) + (data[1] ? data[1].STax : 0) + (data[2] ? data[2].STax : 0) + (data[3] ? data[3].STax : 0) + (data[4] ? data[4].STax : 0) + (data[5] ? data[5].STax : 0) + (data[6] ? data[6].STax : 0) + (data[7] ? data[7].STax : 0) + (data[8] ? data[8].STax : 0) + (data[9] ? data[9].STax : 0) + (data[10] ? data[10].STax : 0) + (data[11] ? data[11].STax : 0))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? (((filterData[0] ? filterData[0].Purchase : 0) + (filterData[1] ? filterData[1].Purchase : 0) + (filterData[2] ? filterData[2].Purchase : 0) + (filterData[3] ? filterData[3].Purchase : 0) + (filterData[4] ? filterData[4].Purchase : 0) + (filterData[5] ? filterData[5].Purchase : 0) + (filterData[6] ? filterData[6].Purchase : 0) + (filterData[7] ? filterData[7].Purchase : 0) + (filterData[8] ? filterData[8].Purchase : 0) + (filterData[9] ? filterData[9].Purchase : 0) + (filterData[10] ? filterData[10].Purchase : 0) + (filterData[11] ? filterData[11].Purchase : 0)) - ((filterData[0] ? filterData[0].PTax : 0) + (filterData[1] ? filterData[1].PTax : 0) + (filterData[2] ? filterData[2].PTax : 0) + (filterData[3] ? filterData[3].PTax : 0) + (filterData[4] ? filterData[4].PTax : 0) + (filterData[5] ? filterData[5].PTax : 0) + (filterData[6] ? filterData[6].PTax : 0) + (filterData[7] ? filterData[7].PTax : 0) + (filterData[8] ? filterData[8].PTax : 0) + (filterData[9] ? filterData[9].PTax : 0) + (filterData[10] ? filterData[10].PTax : 0) + (filterData[11] ? filterData[11].PTax : 0))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? (((data[0] ? data[0].Purchase : 0) + (data[1] ? data[1].Purchase : 0) + (data[2] ? data[2].Purchase : 0) + (data[3] ? data[3].Purchase : 0) + (data[4] ? data[4].Purchase : 0) + (data[5] ? data[5].Purchase : 0) + (data[6] ? data[6].Purchase : 0) + (data[7] ? data[7].Purchase : 0) + (data[8] ? data[8].Purchase : 0) + (data[9] ? data[9].Purchase : 0) + (data[10] ? data[10].Purchase : 0) + (data[11] ? data[11].Purchase : 0)) - ((data[0] ? data[0].PTax : 0) + (data[1] ? data[1].PTax : 0) + (data[2] ? data[2].PTax : 0) + (data[3] ? data[3].PTax : 0) + (data[4] ? data[4].PTax : 0) + (data[5] ? data[5].PTax : 0) + (data[6] ? data[6].PTax : 0) + (data[7] ? data[7].PTax : 0) + (data[8] ? data[8].PTax : 0) + (data[9] ? data[9].PTax : 0) + (data[10] ? data[10].PTax : 0) + (data[11] ? data[11].PTax : 0))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
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
                            <p className="text-base text-[#111] font-semibold">{searchStatus ?
                                ((filterData.length > 0) ? ((((filterData[0] ? filterData[0].Sale : 0) + (filterData[1] ? filterData[1].Sale : 0) + (filterData[2] ? filterData[2].Sale : 0) + (filterData[3] ? filterData[3].Sale : 0) + (filterData[4] ? filterData[4].Sale : 0) + (filterData[5] ? filterData[5].Sale : 0) + (filterData[6] ? filterData[6].Sale : 0) + (filterData[7] ? filterData[7].Sale : 0) + (filterData[8] ? filterData[8].Sale : 0) + (filterData[9] ? filterData[9].Sale : 0) + (filterData[10] ? filterData[10].Sale : 0) + (filterData[11] ? filterData[11].Sale : 0)) - ((filterData[0] ? filterData[0].STax : 0) + (filterData[1] ? filterData[1].STax : 0) + (filterData[2] ? filterData[2].STax : 0) + (filterData[3] ? filterData[3].STax : 0) + (filterData[4] ? filterData[4].STax : 0) + (filterData[5] ? filterData[5].STax : 0) + (filterData[6] ? filterData[6].STax : 0) + (filterData[7] ? filterData[7].STax : 0) + (filterData[8] ? filterData[8].STax : 0) + (filterData[9] ? filterData[9].STax : 0) + (filterData[10] ? filterData[10].STax : 0) + (filterData[11] ? filterData[11].STax : 0))) - (((filterData[0] ? filterData[0].Purchase : 0) + (filterData[1] ? filterData[1].Purchase : 0) + (filterData[2] ? filterData[2].Purchase : 0) + (filterData[3] ? filterData[3].Purchase : 0) + (filterData[4] ? filterData[4].Purchase : 0) + (filterData[5] ? filterData[5].Purchase : 0) + (filterData[6] ? filterData[6].Purchase : 0) + (filterData[7] ? filterData[7].Purchase : 0) + (filterData[8] ? filterData[8].Purchase : 0) + (filterData[9] ? filterData[9].Purchase : 0) + (filterData[10] ? filterData[10].Purchase : 0) + (filterData[11] ? filterData[11].Purchase : 0)) - ((filterData[0] ? filterData[0].PTax : 0) + (filterData[1] ? filterData[1].PTax : 0) + (filterData[2] ? filterData[2].PTax : 0) + (filterData[3] ? filterData[3].PTax : 0) + (filterData[4] ? filterData[4].PTax : 0) + (filterData[5] ? filterData[5].PTax : 0) + (filterData[6] ? filterData[6].PTax : 0) + (filterData[7] ? filterData[7].PTax : 0) + (filterData[8] ? filterData[8].PTax : 0) + (filterData[9] ? filterData[9].PTax : 0) + (filterData[10] ? filterData[10].PTax : 0) + (filterData[11] ? filterData[11].PTax : 0)))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)
                                :
                                ((data.length > 0) ? ((((data[0] ? data[0].Sale : 0) + (data[1] ? data[1].Sale : 0) + (data[2] ? data[2].Sale : 0) + (data[3] ? data[3].Sale : 0) + (data[4] ? data[4].Sale : 0) + (data[5] ? data[5].Sale : 0) + (data[6] ? data[6].Sale : 0) + (data[7] ? data[7].Sale : 0) + (data[8] ? data[8].Sale : 0) + (data[9] ? data[9].Sale : 0) + (data[10] ? data[10].Sale : 0) + (data[11] ? data[11].Sale : 0)) - ((data[0] ? data[0].STax : 0) + (data[1] ? data[1].STax : 0) + (data[2] ? data[2].STax : 0) + (data[3] ? data[3].STax : 0) + (data[4] ? data[4].STax : 0) + (data[5] ? data[5].STax : 0) + (data[6] ? data[6].STax : 0) + (data[7] ? data[7].STax : 0) + (data[8] ? data[8].STax : 0) + (data[9] ? data[9].STax : 0) + (data[10] ? data[10].STax : 0) + (data[11] ? data[11].STax : 0))) - (((data[0] ? data[0].Purchase : 0) + (data[1] ? data[1].Purchase : 0) + (data[2] ? data[2].Purchase : 0) + (data[3] ? data[3].Purchase : 0) + (data[4] ? data[4].Purchase : 0) + (data[5] ? data[5].Purchase : 0) + (data[6] ? data[6].Purchase : 0) + (data[7] ? data[7].Purchase : 0) + (data[8] ? data[8].Purchase : 0) + (data[9] ? data[9].Purchase : 0) + (data[10] ? data[10].Purchase : 0) + (data[11] ? data[11].Purchase : 0)) - ((data[0] ? data[0].PTax : 0) + (data[1] ? data[1].PTax : 0) + (data[2] ? data[2].PTax : 0) + (data[3] ? data[3].PTax : 0) + (data[4] ? data[4].PTax : 0) + (data[5] ? data[5].PTax : 0) + (data[6] ? data[6].PTax : 0) + (data[7] ? data[7].PTax : 0) + (data[8] ? data[8].PTax : 0) + (data[9] ? data[9].PTax : 0) + (data[10] ? data[10].PTax : 0) + (data[11] ? data[11].PTax : 0)))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-20 flex justify-center">

                <div className="flex lg:flex-col">
                    <div className="grid lg:grid-cols-2 grid-cols-1">
                        {/* <PieChart width={400} height={400} className="text-[10px]">
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
                        </PieChart> */}
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

            </div>
        </div>
    );
};

export default Dashboard;