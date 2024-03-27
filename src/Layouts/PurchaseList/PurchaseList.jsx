import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExcelJS from 'exceljs';
import { AuthContext } from '../../Providers/AuthProvider';

const PurchaseList = () => {
    const { user } = useContext(AuthContext);

    const [invoices, setInvoices] = useState([]);
    const [filterInvoices, setFilterInvoices] = useState([]);

    const [selectedDate1, setSelectedDate1] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);

    const [searchStatus, setSearchStatus] = useState(false);

    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const [conceptoReport, setConceptoReport] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/concepto-report/${user.email}`)
            .then(res => res.json())
            .then(data => setConceptoReport(data));
    }, [user.email])

    const [salesReport, setSalesReport] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/sales-report/${user.email}`)
            .then(res => res.json())
            .then(data => setSalesReport(data));
    }, [user.email])

    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };
    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };



    useEffect(() => {
        fetch(`https://account-ser.vercel.app/purchase-invoice/${user.email}`)
            .then(res => res.json())
            .then(data => setInvoices(data));
    }, [user.email]);

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
                    let conceptoValueNew;

                    for (let i = 0; i < invoices.length; i++) {
                        if (invoices[i]._id === id) {
                            dateString = invoices[i].fecha;
                            ammt = invoices[i].totalToPagars;
                            conceptoValueNew = invoices[i].conceptoValue;
                        }
                    }

                    const parts = dateString.split('-');
                    const month = parseInt(parts[1]);
                    const monthName = monthNames[month - 1];
                    let srl;
                    if (salesReport && salesReport.length > 0) {
                        for (let i = 0; i < salesReport.length; i++) {
                            if (monthName === salesReport[i].name) {
                                srl = i;
                                break;
                            }
                        }
                    }
                    const Purchase = (salesReport[srl].Purchase) - ammt;
                    const Sale = (salesReport[srl].Sale);
                    const PTax = (salesReport[srl].PTax);
                    const STax = (salesReport[srl].STax);

                    const report = { Purchase, Sale, PTax, STax };
                    console.log(report);

                    const conceptIdx = parseInt(conceptoValueNew) - 1;
                    const record = conceptoReport[conceptIdx].record - 1;
                    const value = conceptoReport[conceptIdx].value - ammt;
                    const conceptoAdd = { record, value }

                    fetch(`https://account-ser.vercel.app/sales-report/${user.email}/${monthName}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(report)
                    })

                    fetch(`https://account-ser.vercel.app/concepto-report/${user.email}/${conceptoValueNew}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(conceptoAdd)
                    })

                    fetch(`https://account-ser.vercel.app/purchase-invoice/${id}`, {
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


        if (invoices && invoices.length > 0) {
            let newInvoice = [];
            for (let i = 0; i < invoices.length; i++) {

                let searchDate = invoices[i].fecha;
                let partsSearch = searchDate.split('-');
                let daySearch = parseInt(partsSearch[0]);
                let monthSearch = parseInt(partsSearch[1]);
                let yearSearch = parseInt(partsSearch[2]);

                if (year1 === year2) {
                    if (month1 === month2) {
                        if (day1 <= daySearch && daySearch <= day2) {
                            newInvoice = [...newInvoice, invoices[i]];
                        }
                    }
                    else {
                        if (month1 <= monthSearch && monthSearch <= month2) {
                            if (month1 === monthSearch && day1 <= daySearch) {
                                newInvoice = [...newInvoice, invoices[i]];
                            }
                            if (month2 === monthSearch && daySearch <= day2) {
                                newInvoice = [...newInvoice, invoices[i]];
                            }
                            if (month1 !== monthSearch && month2 !== monthSearch) {
                                newInvoice = [...newInvoice, invoices[i]];
                            }
                        }
                    }
                }
                else {
                    if (year1 <= yearSearch && yearSearch <= year2) {
                        if (year1 === yearSearch && month1 <= monthSearch) {
                            if (month1 === monthSearch && day1 <= daySearch) {
                                newInvoice = [...newInvoice, invoices[i]];
                            }
                            if (month1 !== monthSearch) {
                                newInvoice = [...newInvoice, invoices[i]];
                            }
                        }
                        if (year2 === yearSearch && monthSearch <= month2) {
                            if (month2 === monthSearch && daySearch <= day2) {
                                newInvoice = [...newInvoice, invoices[i]];
                            }
                            if (month2 !== monthSearch) {
                                newInvoice = [...newInvoice, invoices[i]];
                            }
                        }
                        if (year1 !== yearSearch && year2 !== yearSearch) {
                            newInvoice = [...newInvoice, invoices[i]];
                        }
                    }
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
                header: "No",
                key: "no",
                width: 5,
                alignment: { horizontal: 'center' }
            },
            {
                header: "RNC",
                key: "rnc",
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
                header: "Concepto",
                key: "concepto",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "NCF",
                key: "ncf",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "NCF Modificado",
                key: "modificado",
                width: 30,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Fecha Comprobante",
                key: "fecha1",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Fecha Comprobante",
                key: "fecha2",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Fecha De Pago",
                key: "fechaDePago1",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Fecha De Pago",
                key: "fechaDePago2",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Servicios",
                key: "bien",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Bienes",
                key: "servicio",
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
                header: "Total Tax",
                key: "totalTax",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "ITBIS Retenido",
                key: "itbisRetendio",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Proporcionalidad",
                key: "proporcionalidadTax",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "ITBIS llevado al Costo",
                key: "b1",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "ITBIS por adelantar",
                key: "itbisTax",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "ITBIS percibido en compras",
                key: "b2",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Tipo de Retención en ISR",
                key: "b4",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Monto Retención Renta",
                key: "othersRetenciones",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "ISR Percibido en compras",
                key: "b3",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Impuesto Selectivo al Consumo",
                key: "iscTax",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Otros Impuesto/Tasas",
                key: "cdtTax",
                width: 20,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Monto Propina Legal",
                key: "propinaTax",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "EFECTIVO",
                key: "type1",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "CHEQUES/TRANSFERENCIAS/DEPÓSITO",
                key: "type2",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "TARJETA CRÉDITO/DÉBITO",
                key: "type3",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "COMPRA A CREDITO",
                key: "type4",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "PERMUTA",
                key: "type5",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "NOTA DE CREDITO",
                key: "type6",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "MIXTO",
                key: "type7",
                width: 15,
                alignment: { horizontal: 'center' }
            },
            {
                header: "Special",
                key: "mark",
                width: 15,
                alignment: { horizontal: 'center' }
            }

        ];

        invoices?.map((invoice, idx) => {
            let taxAmm = 0;
            for (let i = 0; i < invoice.taxs.length; i++) {
                taxAmm += invoice.taxAmmount[i];
            }


            /*new*/

            let tipoId = 0;
            if (invoice.id === "RNC")
                tipoId = 1;
            if (invoice.id === "Cedula")
                tipoId = 2;

            let isc = 0;
            let cdt = 0;
            let propina = 0;
            let proporcionalidad = 0;
            let itbis = 0;
            for (let i = 0; i < invoice.taxs.length; i++) {
                if (invoice.taxs[i] === "ISC - (2.00%)") {
                    isc = isc + ((invoice.taxAmmount[i] * invoice.subTotals) / 100);
                }
                if (invoice.taxs[i] === "ISC - (16.00%)") {
                    isc = isc + ((invoice.taxAmmount[i] * invoice.subTotals) / 100);
                }
                if (invoice.taxs[i] === "CDT - (2.00%)") {
                    cdt = cdt + ((invoice.taxAmmount[i] * invoice.subTotals) / 100);
                }
                if (invoice.taxs[i] === "Propina - (10.00%)") {
                    propina = propina + ((invoice.taxAmmount[i] * invoice.subTotals) / 100);
                }
                if (invoice.taxs[i] === "PROPORCIONALIDAD - (18.00%)") {
                    proporcionalidad = proporcionalidad + ((invoice.taxAmmount[i] * invoice.subTotals) / 100);
                }
                if (invoice.taxs[i] === "ITBIS - (18.00%)") {
                    itbis = itbis + ((invoice.taxAmmount[i] * invoice.subTotals) / 100);
                }
            }
            let itbisDis = 0;
            let allDis = 0;
            for (let i = 0; i < invoice.discounts.length; i++) {
                if (invoice.discounts[i] === "ITBIS Retenido - 30%" || invoice.discounts[i] === "ITBIS Retenido - 75%" || invoice.discounts[i] === "ITBIS Retenido - 100%") {
                    itbisDis = invoice.ammountDisscount;
                }
                else {
                    allDis = invoice.ammountDisscount;
                }
            }
            let bienAmm = 0;
            let servicioAmm = 0;
            for (let i = 0; i < invoice.tipoList.length; i++) {
                if (invoice.tipoList[i] === "Goods") {
                    bienAmm = bienAmm + (parseFloat(invoice.montoList[i]));
                }
                if (invoice.tipoList[i] === "Service") {
                    servicioAmm = servicioAmm + (parseFloat(invoice.montoList[i]));
                }
            }
            if (invoice.tipoCk === "Goods") {
                bienAmm = bienAmm + (parseFloat(invoice.ammount));
            }
            if (invoice.tipoCk === "Service") {
                servicioAmm = servicioAmm + (parseFloat(invoice.ammount));
            }
            const fecha = invoice?.fecha.split('-');
            if (parseInt(fecha[1]) < 10) {
                fecha[1] = '0' + fecha[1];
            }
            const fechaDePago = invoice?.fechDePago.split('-');
            if (parseInt(fechaDePago[1]) < 10) {
                fechaDePago[1] = '0' + fechaDePago[1];
            }

            sheet.addRow({
                no: idx + 1,
                rnc: invoice?.rnc,
                tipoDeId: tipoId,
                concepto: invoice?.conceptoValue,
                ncf: invoice?.nfc,
                modificado: invoice?.modificado,
                fecha1: fecha[2] + fecha[1],
                fecha2: fecha[0],
                fechaDePago1: fechaDePago[2] + fechaDePago[1],
                fechaDePago2: fechaDePago[0],
                bien: bienAmm,
                servicio: servicioAmm,
                subTotal: invoice?.subTotals,
                totalTax: ((invoice?.subTotals * taxAmm) / 100),
                itbisRetendio: itbisDis,
                proporcionalidadTax: proporcionalidad,
                b1: "",
                itbisTax: itbis,
                b2: "",
                othersRetenciones: allDis,
                b4: "",
                b3: "",
                iscTax: isc,
                cdtTax: cdt,
                propinaTax: propina,
                type1: (invoice?.formaDePago === "EFECTIVO") ? invoice?.totals : 0,
                type2: (invoice?.formaDePago === "CHEQUES/TRANSFERENCIAS/DEPÓSITO") ? invoice?.totals : 0,
                type3: (invoice?.formaDePago === "TARJETA CRÉDITO/DÉBITO") ? invoice?.totals : 0,
                type4: (invoice?.formaDePago === "COMPRA A CREDITO") ? invoice?.totals : 0,
                type5: (invoice?.formaDePago === "PERMUTA") ? invoice?.totals : 0,
                type6: (invoice?.formaDePago === "NOTA DE CREDITO") ? invoice?.totals : 0,
                type7: (invoice?.formaDePago === "MIXTO") ? invoice?.totals : 0,
                mark: invoice?.mark
            })
        })

        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
            })
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'purchase-invoices.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        })

    }

    return (
        <div className='bg-[#eee] pt-8 pb-14 px-8'>
            <h2 className="text-[#28084B] text-2xl font-bold pb-8">Consultar Facturas de Compras</h2>
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
                <div>
                    <button onClick={handleExportFile} className="px-4 cursor-pointer py-2 rounded-lg bg-[#733CFF] border border-[#733CFF] hover:border-[#733CFF] text-[#fff] hover:text-[#733CFF] hover:bg-[#fff]">
                        Exportar
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
                                            <Link to={`/purchase-invoice/${user.email}/${invoice._id}`} className=' text-[green] font-bold flex justify-center items-center'>
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
                                            <Link to={`/purchase-invoice/${user.email}/${invoice._id}`} className=' text-[green] font-bold flex justify-center items-center'>
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

export default PurchaseList;
