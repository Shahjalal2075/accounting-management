import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SaleList = () => {

    const [invoices, setInvoices] = useState([]);

    const [selectedDate1, setSelectedDate1] = useState(null);

    const [searchStatus, setSearchStatus] = useState(false);

    

    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };

    useEffect(() => {
        fetch(`https://account-ser.vercel.app/sale-invoice`)
            .then(res => res.json())
            .then(data => setInvoices(data));
    }, [])


    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://account-ser.vercel.app/sale-invoice/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => {
                        res.json()
                    })
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                ` has been deleted.`,
                                'success'
                            )
                        }
                    })
                setTimeout(() => {
                    window.location.reload();
                }, 600);
            }
        })
    }

    const filterInvoicesByDate = () => {
        let filteredInvoices = invoices.filter(invoice => {

            const firstDate = selectedDate1 ? `${selectedDate1.getDate()}-${selectedDate1.getMonth() + 1}-${selectedDate1.getFullYear()}` : `1-1-2016`;
            const secondDate = firstDate;

            console.log(firstDate)

            const invoiceDate = new Date(invoice.fecha);
            return invoiceDate >= new Date(firstDate) && invoiceDate <= new Date(secondDate);
        });
        return filteredInvoices;
    };

    const handleFilter = () => {
        setSearchStatus(!searchStatus);
    }

    return (
        <div className='bg-[#eee] pt-8 pb-14 px-8'>
            <h2 className="text-[#28084B] text-2xl font-bold pb-8">Consultar Facturas de Ventas</h2>
            <div className="flex pb-6 justify-between items-center">
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
                    <button onClick={handleFilter} className="px-4 cursor-pointer py-2 rounded-lg bg-[#733CFF] border border-[#733CFF] hover:border-[#733CFF] text-[#fff] hover:text-[#733CFF] hover:bg-[#fff]" disabled={(selectedDate1 === null) ? true : false}>
                        {
                            searchStatus ? 'Clear' : 'Filter'
                        }
                    </button>

                </div>
            </div>
            <div className="overflow-x-auto bg-[#fff] p-2 rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>NCF</th>
                            <th>Tipo de ID</th>
                            <th>Company ID</th>
                            <th>Company Name</th>
                            <th>Fecha</th>
                            <th>Fecha de pago</th>
                            <th>Forma de pago</th>
                            <th>Modificado</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchStatus ?
                                filterInvoicesByDate().map((invoice) =>
                                    <tr key={invoice._id}>
                                        <td>{invoice.nfc}</td>
                                        <td>{invoice.id}</td>
                                        <td>{invoice.rnc}</td>
                                        <td>{invoice.company}</td>
                                        <td>{invoice.fecha}</td>
                                        <td>{invoice.fechDePago}</td>
                                        <td>{invoice.formaDePago}</td>
                                        <td>{invoice.modificado}</td>
                                        <td className='flex justify-between'>
                                            <Link to={`/sale-invoice/${invoice._id}`} className=' text-[green] font-bold flex justify-center items-center'>
                                                <FaRegEdit />
                                            </Link>
                                            <button onClick={() => handleDelete(invoice._id)} className=' text-[red] font-bold'>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                )
                                :
                                invoices.map((invoice) =>
                                    <tr key={invoice._id}>
                                        <td>{invoice.nfc}</td>
                                        <td>{invoice.id}</td>
                                        <td>{invoice.rnc}</td>
                                        <td>{invoice.company}</td>
                                        <td>{invoice.fecha}</td>
                                        <td>{invoice.fechDePago}</td>
                                        <td>{invoice.formaDePago}</td>
                                        <td>{invoice.modificado}</td>
                                        <td className='flex justify-between'>
                                            <Link to={`/sale-invoice/${invoice._id}`} className=' text-[green] font-bold flex justify-center items-center'>
                                                <FaRegEdit />
                                            </Link>
                                            <button onClick={() => handleDelete(invoice._id)} className=' text-[red] font-bold'>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SaleList;
