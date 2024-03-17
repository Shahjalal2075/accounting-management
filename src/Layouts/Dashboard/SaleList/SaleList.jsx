import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExcelJS from 'exceljs';

const SaleList = () => {

    const [invoices, setInvoices] = useState([]);
    const [filterInvoices, setFilterInvoices] = useState([]);

    const [selectedDate1, setSelectedDate1] = useState(null);

    const [searchStatus, setSearchStatus] = useState(false);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [salesReport, setSalesReport] = useState([]);
    useEffect(() => {
        fetch('https://account-ser.vercel.app/sales-report')
            .then(res => res.json())
            .then(data => setSalesReport(data));
    }, [])



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

                if (invoices && invoices.length > 0) {

                    let dateString = "";
                    let ammt = 0;

                    for (let i = 0; i < invoices.length; i++) {
                        if (invoices[i]._id === id) {
                            dateString = invoices[i].fecha;
                            ammt = invoices[i].totalToPagars;
                        }
                    }

                    const parts = dateString.split('-');
                    const month = parseInt(parts[1]);
                    const monthName = monthNames[month - 1];
                    const Purchase = (salesReport[month - 1].Purchase);
                    const Sale = (salesReport[month - 1].Sale) - ammt;

                    const report = { Purchase, Sale };
                    console.log(report);

                    fetch(`https://account-ser.vercel.app/sales-report/${monthName}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(report)
                    })

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


            }
        })
    }


    const handleFilter = () => {
        setSearchStatus(!searchStatus);
        setFilterInvoices([]);
        const firstDate = selectedDate1 && `${selectedDate1.getDate()}-${selectedDate1.getMonth() + 1}-${selectedDate1.getFullYear()}`;
        if (invoices && invoices.length > 0) {
            let newInvoice = [];
            for (let i = 0; i < invoices.length; i++) {
                if (invoices[i].fecha === firstDate) {
                    newInvoice = [...newInvoice, invoices[i]]
                }
            }
            setFilterInvoices(newInvoice)
        }
    }

    const handleExportFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Excel Sheet");
        sheet.columns = [
            {
                header: "SL",
                key: "sl",
                width: 5,
                alignment: { horizontal: 'center' }
            },
            {
                header: "NCF",
                key: "ncf",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Tipo De ID",
                key: "tipoDeId",
                width: 10,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Company ID",
                key: "companyId",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Company Name",
                key: "companyName",
                width: 30,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Fecha",
                key: "fecha",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Fecha De Pago",
                key: "fechaDePago",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Forma De Pago",
                key: "formaDePago",
                width: 40,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Modificado",
                key: "modificado",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Sub Total",
                key: "subTotal",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Total",
                key: "total",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Total To pagars",
                key: "totalToPagars",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Tax List",
                key: "taxList",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Total Tax",
                key: "totalTax",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Discount List",
                key: "discountList",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Total Discount",
                key: "totalDiscount",
                width: 15,
                alignment: { horizontal: 'center' }
            },

        ];

        invoices?.map((invoice, idx) => {
            let allTax = "";
            let taxAmm = 0;
            for (let i = 0; i < invoice.taxs.length; i++) {
                allTax += (invoice.taxs[i]+(", "));
                taxAmm += invoice.taxAmmount[i];
            }
            let allDis = "";
            for (let i = 0; i < invoice.discounts.length; i++) {
                allDis += invoice.discounts[i];
            }
            sheet.addRow({
                sl: idx + 1,
                ncf: invoice?.nfc,
                tipoDeId: invoice?.id,
                companyId: invoice?.rnc,
                companyName: invoice?.company,
                fecha: invoice?.fecha,
                fechaDePago: invoice?.fechDePago,
                formaDePago: invoice?.formaDePago,
                modificado: invoice?.modificado,
                subTotal: invoice?.subTotals,
                total: invoice?.totals,
                totalToPagars: invoice?.totalToPagars,
                taxList: allTax,
                totalTax: ((invoice?.subTotals*taxAmm)/100),
                discountList: allDis,
                totalDiscount: (invoice?.totals-invoice?.totalToPagars),
            })
        })

        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
            })
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'sale-invoices.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        })

    }

    return (
        <div className='bg-[#eee] pt-8 pb-14 px-8'>
            <h2 className="text-[#28084B] text-2xl font-bold pb-8">Consultar Facturas de Ventas</h2>
            <div className="flex pb-6 justify-between items-center">
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
                        <button onClick={handleFilter} className="px-4 cursor-pointer py-2 rounded-lg bg-[#733CFF] border border-[#733CFF] hover:border-[#733CFF] text-[#fff] hover:text-[#733CFF] hover:bg-[#fff]" disabled={(selectedDate1 === null) ? true : false}>
                            {
                                searchStatus ? 'Clear' : 'Filter'
                            }
                        </button>

                    </div>
                </div>
                <div>
                    <button onClick={handleExportFile} className="px-4 cursor-pointer py-2 rounded-lg bg-[#733CFF] border border-[#733CFF] hover:border-[#733CFF] text-[#fff] hover:text-[#733CFF] hover:bg-[#fff]">
                        Export
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
                                filterInvoices.map((invoice) =>
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
