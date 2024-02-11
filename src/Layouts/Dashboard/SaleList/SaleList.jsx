import { Link } from "react-router-dom";

const SaleList = () => {
    return (
        <div className='bg-[#F7F8F9] pt-8 pb-14 px-8'>
            <h2 className="text-[#28084B] text-2xl font-bold pb-8">Sale Invoice List</h2>
            <div className="flex justify-end pb-6">
                <Link className='bg-[#111] text-[#fff] font-medium px-4 py-2 rounded-lg'>Add New</Link>
            </div>
            <div className="overflow-x-auto bg-[#fff] p-2 rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NCF</th>
                            <th>Name</th>
                            <th>Invoice Date</th>
                            <th>Due date</th>
                            <th>Status</th>
                            <th>Ref No</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>16</th>
                            <td>Odio non qui culpa d</td>
                            <td>Tanya Vazquez</td>
                            <td>04-01-2024</td>
                            <td>04-01-2024</td>
                            <td>02 - CHEQUES</td>
                            <td>Est soluta molestiae</td>
                            <td className='flex justify-between'>
                                <a className='bg-red-700 rounded-lg px-3 py-2 text-[#fff] font-bold' href="">A</a>
                                <a className='bg-red-700 rounded-lg px-3 py-2 text-[#fff] font-bold' href="">B</a>
                            </td>
                        </tr>
                        <tr>
                            <th>16</th>
                            <td>Odio non qui culpa d</td>
                            <td>Tanya Vazquez</td>
                            <td>04-01-2024</td>
                            <td>04-01-2024</td>
                            <td>02 - CHEQUES</td>
                            <td>Est soluta molestiae</td>
                            <td className='flex justify-between'>
                                <a className='bg-red-700 rounded-lg px-3 py-2 text-[#fff] font-bold' href="">A</a>
                                <a className='bg-red-700 rounded-lg px-3 py-2 text-[#fff] font-bold' href="">B</a>
                            </td>
                        </tr>
                        <tr>
                            <th>16</th>
                            <td>Odio non qui culpa d</td>
                            <td>Tanya Vazquez</td>
                            <td>04-01-2024</td>
                            <td>04-01-2024</td>
                            <td>02 - CHEQUES</td>
                            <td>Est soluta molestiae</td>
                            <td className='flex justify-between'>
                                <a className='bg-red-700 rounded-lg px-3 py-2 text-[#fff] font-bold' href="">A</a>
                                <a className='bg-red-700 rounded-lg px-3 py-2 text-[#fff] font-bold' href="">B</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SaleList;