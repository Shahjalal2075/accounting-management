import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Providers/AuthProvider";


const InvoiceEditS = () => {
    const { user} = useContext(AuthContext);

    const invoiceData = useLoaderData();
    const navigate = useNavigate();
    const { nfc, id, rnc, company, fecha, fechDePago, formaDePago, tipoDeIngreso, modificado } = invoiceData;

    const [selectedDate1, setSelectedDate1] = useState(null);
    const [count, setCount] = useState(1);
    const [ammount, setAmmount] = useState(invoiceData.subTotals);
    const [ammountDisscount, setAmmountDisscount] = useState(invoiceData.ammountDisscount);
    const [taxs, setTax] = useState(invoiceData.taxs);
    const [taxAmmount, setTaxAmmount] = useState(invoiceData.taxAmmount);
    const [discounts, setDiscount] = useState(invoiceData.discounts);
    const [discountAmmount, setDiscountAmmount] = useState(invoiceData.discountAmmount);
    const [totalDis, setTotalDis] = useState(invoiceData.totalDis);

    const [isChecked, setIsChecked] = useState(invoiceData.mark);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const [salesReport, setSalesReport] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/sales-report/${user.email}`)
            .then(res => res.json())
            .then(data => setSalesReport(data));
    }, [user.email])
    const handleAmmount = (e) => {
        const form = e.target;
        setAmmount(form.value);
        console.log(form.value);
    }
    const handleAmmountDisscount = (e) => {
        const form = e.target;
        setAmmountDisscount(form.value);
        console.log(form.value);
    }
    const handleDiscount = (e) => {
        const form = e.target;

        let f = 0;
        for (let i = 0; i <= discounts.length; i++) {
            if (discounts[i] === form.value) {
                let newDis = [];
                let newDisAmm = [];
                for (let i = 0; i <= discounts.length; i++) {
                    if (discounts[i] !== form.value) {
                        newDis = [...newDis, discounts[i]];
                        newDisAmm = [...newDisAmm, discountAmmount[i]];
                    }
                }
                setTotalDis(totalDis - discountAmmount[i]);
                setDiscount(newDis);
                setDiscountAmmount(newDisAmm);
                f = 1;
                break;
            }
        }
        if (f === 0) {
            if (form.value === "None") {
                const newAmm = [];
                setDiscountAmmount(newAmm);
                const newDis = [];
                setDiscount(newDis);
                setTotalDis(0);
            }
            if (form.value === "ITBIS Retenido - 30%") {
                const newAmm = [...discountAmmount, 30.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 30)
            }
            if (form.value === "ITBIS Retenido - 75%") {
                const newAmm = [...discountAmmount, 75.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 75)
            }
            if (form.value === "ITBIS Retenido - 100%") {
                const newAmm = [...discountAmmount, 100.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 100)
            }
            if (form.value === "01 - ALQUILERES - 10%") {
                const newAmm = [...discountAmmount, 10.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 10)
            }
            if (form.value === "02 - HONORARIOS POR SERVICIOS - 10%") {
                const newAmm = [...discountAmmount, 10.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 10)
            }
            if (form.value === "03 - OTRAS RENTAS - 10%") {
                const newAmm = [...discountAmmount, 10.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 10)
            }
            if (form.value === "04 - OTRAS RENTAS (Rentas Presuntas) - 2%") {
                const newAmm = [...discountAmmount, 2.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 2)
            }
            if (form.value === "05 - INTERESES PAGADOS A PERSONAS JURIDICAS RESIDENTES -10%") {
                const newAmm = [...discountAmmount, 10.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 10)
            }
            if (form.value === "06 - INTERESES PAGADOS A PERSONAS FISICAS RESIDENTES - 10%") {
                const newAmm = [...discountAmmount, 10.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 10)
            }
            if (form.value === "07 - RETENCION POR PROVEEDORES DEL ESTADO - 5%") {
                const newAmm = [...discountAmmount, 5.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 5)
            }
            if (form.value === "08 - JUEGOS TELEFONICOS - 5%") {
                const newAmm = [...discountAmmount, 5.00];
                setDiscountAmmount(newAmm);
                const newDis = [...discounts, form.value];
                setDiscount(newDis);
                setTotalDis(totalDis + 5)
            }
        }
    }
    const handleTax = (e) => {
        const form = e.target;

        let f = 0;
        for (let i = 0; i <= taxs.length; i++) {
            if (taxs[i] === form.value) {
                let newTaxs = [];
                let newTaxsAmm = [];
                for (let i = 0; i <= taxs.length; i++) {
                    if (taxs[i] !== form.value) {
                        newTaxs = [...newTaxs, taxs[i]];
                        newTaxsAmm = [...newTaxsAmm, taxAmmount[i]];
                    }
                }
                setTax(newTaxs);
                setTaxAmmount(newTaxsAmm);
                f = 1;
                break;
            }
        }
        if (f === 0) {
            if (form.value === "Ninguno - (0.00%)") {
                const newAmm = [];
                setTaxAmmount(newAmm);
                const newTax = [];
                setTax(newTax);

            }
            if (form.value === "ITBIS - (18.00%)") {
                const newAmm = [...taxAmmount, 18.00];
                setTaxAmmount(newAmm);
                const newTax = [...taxs, form.value];
                setTax(newTax);
            }
            if (form.value === "Propina - (10.00%)") {
                const newAmm = [...taxAmmount, 10.00];
                setTaxAmmount(newAmm);
                const newTax = [...taxs, form.value];
                setTax(newTax);
            }
            if (form.value === "CDT - (2.00%)") {
                const newAmm = [...taxAmmount, 2.00];
                setTaxAmmount(newAmm);
                const newTax = [...taxs, form.value];
                setTax(newTax);
            }
            if (form.value === "PROPORCIONALIDAD - (18.00%)") {
                const newAmm = [...taxAmmount, 18.00];
                setTaxAmmount(newAmm);
                const newTax = [...taxs, form.value];
                setTax(newTax);
            }
            if (form.value === "ISC - (2.00%)") {
                const newAmm = [...taxAmmount, 2.00];
                setTaxAmmount(newAmm);
                const newTax = [...taxs, form.value];
                setTax(newTax);
            }
            if (form.value === "ISC - (16.00%)") {
                const newAmm = [...taxAmmount, 16.00];
                setTaxAmmount(newAmm);
                const newTax = [...taxs, form.value];
                setTax(newTax);
            }
            if (form.value === "ISR RETENIDO - (10.00%)") {
                const newAmm = [...taxAmmount, 10.00];
                setTaxAmmount(newAmm);
                const newTax = [...taxs, form.value];
                setTax(newTax);
            }
        }
    }

    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };

    const startDate = selectedDate1
        ? `${selectedDate1.getDate()}-${selectedDate1.getMonth() + 1}-${selectedDate1.getFullYear()}`
        : fecha;

    const [selectedDate2, setSelectedDate2] = useState(null);

    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };

    const dueDate = selectedDate2
        ? `${selectedDate2.getDate()}-${selectedDate2.getMonth() + 1}-${selectedDate2.getFullYear()}`
        : fechDePago;

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const nfc = form.nfc.value;
        const id = form.id.value;
        const rnc = form.rnc.value;
        const fecha = startDate;
        const fechDePago = dueDate;
        const tipoDeIngreso = form.tipoDeIngreso.value;
        const formaDePago = form.formaDePago.value;
        const modificado = form.modificado.value;
        const mark = isChecked;

        if (mark === false && nfc.length !== 11 && nfc.length !== 13) {
            toast('Llene el NCF correcto. ' + nfc.length);
            return;
        }

        const monto = ammount;

        const subTotals = parseFloat(parseFloat(ammount).toFixed(2));

        const totals = parseFloat((parseFloat(ammount ? ammount : '0') + (taxAmmount[0] ? ((ammount * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? ((ammount * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? ((ammount * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? ((ammount * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? ((ammount * taxAmmount[4]) / 100) : 0)).toFixed(2));

        const totalToPagars = parseFloat((((parseFloat(ammount ? ammount : '0') + (taxAmmount[0] ? ((ammount * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? ((ammount * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? ((ammount * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? ((ammount * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? ((ammount * taxAmmount[4]) / 100) : 0)) - (ammountDisscount))).toFixed(2));

        const invoice = { nfc, id, rnc, company, fecha, fechDePago, tipoDeIngreso, formaDePago, modificado, monto, subTotals, totals, totalToPagars, taxs, taxAmmount, discounts, ammountDisscount, discountAmmount, totalDis, mark };
        console.log(invoice);

        const dateString = fecha;
        const parts = dateString.split('-');
        const month = parseInt(parts[1]);
        const monthName = monthNames[month - 1];
        let srl ;
        if (salesReport && salesReport.length > 0) {
            for(let i=0;i<salesReport.length;i++){
                if(monthName===salesReport[i].name){
                    srl=i;
                    break;
                }
            }
        }
        const Compra = (salesReport[srl].Compra);
        const Ventas = (salesReport[srl].Ventas) - invoiceData.totalToPagars + totalToPagars;
        const STax = (salesReport[srl].STax) - (invoiceData.totals - invoiceData.subTotals) + ((taxAmmount[0] ? ((ammount * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? ((ammount * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? ((ammount * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? ((ammount * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? ((ammount * taxAmmount[4]) / 100) : 0));
        const PTax = (salesReport[srl].PTax);
        const report = { Compra, Ventas, PTax, STax };
        console.log(report)

        fetch(`https://account-ser.vercel.app/sale-invoice/${user.email}/${invoiceData._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(invoice)
        })
        fetch(`https://account-ser.vercel.app/sales-report/${user.email}/${monthName}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(report)
        })
            .then(res => {
                res.json()
                toast("Invoice Update Succsessfull.");
                setTimeout(() => {
                    navigate(`/sale-list`);
                }, 1600);
            })
            .then(data => {
                console.log(data);
            })

    }

    return (
        <div className="">
            <div className="bg-[#eee] pt-8 pb-14 px-8">
                <form onSubmit={handleAddProduct}>
                    <h2 className="text-[#28084B] text-2xl font-bold pb-8">Editar Factura</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#fff] p-4 pb-6 rounded-lg">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-tex
                                t font-medium">NCF</span>
                            </label>
                            <label className="input-group">
                                <input type="text" maxLength={"13"} defaultValue={nfc} name="nfc" className="input bg-[#fff] input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Tipo de ID</span>
                            </label>
                            <label className="input-group">
                                <select name="id" defaultValue={id} id="id" className="input bg-[#fff] input-bordered w-full">
                                    <option value="RNC">RNC</option>
                                    <option value="Cedula">Cedula</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                </select>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">ID</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={rnc} name="rnc" placeholder="" className="input bg-[#fff] input-bordered w-full" readOnly />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Fecha</span>
                            </label>
                            <label className="input-group">
                                <div className="input bg-[#fff] input-bordered w-full flex items-center">
                                    <DatePicker
                                        selected={selectedDate1}
                                        onChange={handleDateChange1}
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText={fecha}
                                    />
                                </div>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Fecha de pago</span>
                            </label>
                            <label className="input-group">
                                <div className="input bg-[#fff] input-bordered w-full flex items-center">
                                    <DatePicker
                                        selected={selectedDate2}
                                        onChange={handleDateChange2}
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText={fechDePago}
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Tipo de Ingreso</span>
                            </label>
                            <label className="input-group">
                                <select defaultValue={tipoDeIngreso} name="tipoDeIngreso" id="tipoDeIngreso" className="input bg-[#fff] input-bordered w-full">
                                    <option value="none">Select</option>
                                    <option value="01 - Ingresos por Operaciones (No Financieros)">01 - Ingresos por Operaciones (No Financieros)</option>
                                    <option value="02 - Ingresos Financieros">02 - Ingresos Financieros</option>
                                    <option value="03 - Ingresos Extraordinarios">03 - Ingresos Extraordinarios</option>
                                    <option value="04 - Ingresos por Arrendamientos">04 - Ingresos por Arrendamientos</option>
                                    <option value="05 - Ingresos por Venta de Activo Depreciable ">05 - Ingresos por Venta de Activo Depreciable </option>
                                    <option value="06 - Otros IngresosO">06 - Otros Ingresos</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Forma de pago</span>
                            </label>
                            <label className="input-group">
                                <select defaultValue={formaDePago} name="formaDePago" id="status" className="input bg-[#fff] input-bordered w-full">
                                    <option value="">Select</option>
                                    <option value="EFECTIVO">EFECTIVO</option>
                                    <option value="CHEQUES/TRANSFERENCIAS/DEPÓSITO">CHEQUES/TRANSFERENCIAS/DEPÓSITO</option>
                                    <option value="TARJETA CRÉDITO/DÉBITO">TARJETA CRÉDITO/DÉBITO</option>
                                    <option value="COMPRA A CREDITO">COMPRA A CREDITO</option>
                                    <option value="PERMUTA">PERMUTA</option>
                                    <option value="NOTA DE CREDITO">NOTA DE CREDITO</option>
                                    <option value="MIXTO">MIXTO</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">NCF Modificado</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={modificado} name="modificado" className="input bg-[#fff] input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control flex justify-center items-center">
                            {/* <label className="label">
                                <span className="label-text font-medium"></span>
                            </label> */}
                            <label className="input-group mt-10">
                                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="checkbox" />
                            </label>
                        </div>
                    </div>

                    <div className="bg-[#fff] p-4 pb-6 rounded-lg mt-8">
                        <h2 className="text-[#28084B] text-2xl font-medium pb-8">Detalle de factura</h2>
                        <div className="overflow-x-auto bg-[#fff] p-2 rounded-lg">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Impuesto</th>
                                        <th>Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {Array.from({ length: count }).map((_, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <select defaultValue={taxs[0]} name="status" id="status" onChange={handleTax} className="input bg-[#fff] input-bordered w-full">
                                                            <option value="Ninguno - (0.00%)">Ninguno - (0.00%)</option>
                                                            <option value="ITBIS - (18.00%)">ITBIS - (18.00%)</option>
                                                            <option value="Propina - (10.00%)">Propina - (10.00%)</option>
                                                            <option value="CDT - (2.00%)">CDT - (2.00%)</option>
                                                            <option value="PROPORCIONALIDAD - (18.00%)">PROPORCIONALIDAD - (18.00%)</option>
                                                            <option value="ISC - (2.00%)">ISC - (2.00%)</option>
                                                            <option value="ISC - (16.00%)">ISC - (16.00%)</option>
                                                            <option value="ISR RETENIDO - (10.00%)">ISR RETENIDO - (10.00%)</option>

                                                        </select>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <input type="number" defaultValue={invoiceData.subTotals} required onChange={handleAmmount} name="ammount" placeholder="" className="input bg-[#fff] input-bordered w-full" step="any" pattern="^\d*\.?\d*$" />
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className=" mt-6">
                                <div className="grid grid-cols-10 gap-3 mx-4">
                                    <div className="col-span-3">
                                        <p className="text-sm font-medium pb-2">Retenciones:</p>
                                        <div className="form-control">
                                            <label className="input-group">
                                                <select defaultValue={discounts[0] ? discounts[0] : 'None'} name="status" id="status" onChange={handleDiscount} className="input bg-[#fff] input-bordered w-full">
                                                    <option value="None">None</option>
                                                    <option value="ITBIS Retenido - 30%">ITBIS Retenido - 30%</option>
                                                    <option value="ITBIS Retenido - 75%">ITBIS Retenido - 75%</option>
                                                    <option value="ITBIS Retenido - 100%">ITBIS Retenido - 100%</option>
                                                    <option value="01 - ALQUILERES - 10%">01 - ALQUILERES - 10%</option>
                                                    <option value="02 - HONORARIOS POR SERVICIOS - 10%">02 - HONORARIOS POR SERVICIOS - 10%</option>
                                                    <option value="03 - OTRAS RENTAS - 10%">03 - OTRAS RENTAS - 10%</option>
                                                    <option value="04 - OTRAS RENTAS (Rentas Presuntas) - 2%">04 - OTRAS RENTAS (Rentas Presuntas) - 2%</option>
                                                    <option value="05 - INTERESES PAGADOS A PERSONAS JURIDICAS RESIDENTES -10%">05 - INTERESES PAGADOS A PERSONAS JURIDICAS RESIDENTES -10%</option>
                                                    <option value="06 - INTERESES PAGADOS A PERSONAS FISICAS RESIDENTES - 10%">06 - INTERESES PAGADOS A PERSONAS FISICAS RESIDENTES - 10%</option>
                                                    <option value="07 - RETENCION POR PROVEEDORES DEL ESTADO - 5%">07 - RETENCION POR PROVEEDORES DEL ESTADO - 5%</option>
                                                    <option value="08 - JUEGOS TELEFONICOS - 5%">08 - JUEGOS TELEFONICOS - 5%</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <p className="text-sm font-medium pb-2">Valor:</p>
                                        <div className="form-control">
                                            <label className="input-group">
                                                <input type="number" defaultValue={ammountDisscount} onChange={handleAmmountDisscount} name="ammount" placeholder="" className="input bg-[#fff] input-bordered w-full" step="any" pattern="^\d*\.?\d*$" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-4 text-[#111] text-xl font-medium flex flex-col justify-center text-right">
                                        <h2>Sub Total: {(parseFloat(ammount ? ammount : '0')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                                        {
                                            taxs.map((tax, idx) => tax && <h2 key={idx}>{tax}: {((ammount * taxAmmount[idx]) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>)
                                        }
                                        <h2>Total: {(parseFloat(ammount ? ammount : '0') + (taxAmmount[0] ? ((ammount * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? ((ammount * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? ((ammount * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? ((ammount * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? ((ammount * taxAmmount[4]) / 100) : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                                        <h2>- Retenciones: {(parseFloat(ammountDisscount)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                                        <h2>Total a pagar: {(((parseFloat(ammount ? ammount : '0') + (taxAmmount[0] ? ((ammount * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? ((ammount * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? ((ammount * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? ((ammount * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? ((ammount * taxAmmount[4]) / 100) : 0)) - (parseFloat(ammountDisscount)))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="submit" value="Guardar" className="px-4 cursor-pointer py-2 rounded-lg bg-[#157347] text-[#fff] mt-6" />

                </form>

            </div>

            <ToastContainer />
        </div>
    );
};

export default InvoiceEditS;