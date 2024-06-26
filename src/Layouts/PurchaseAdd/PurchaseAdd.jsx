import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Providers/AuthProvider";

const PurchaseAdd = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [count, setCount] = useState(1);
    const [ammount, setAmmount] = useState(0);
    const [ammountDisscount, setAmmountDisscount] = useState(0);
    const [taxs, setTax] = useState([]);
    const [taxAmmount, setTaxAmmount] = useState([]);
    const [conceptoValue, setConceptoValue] = useState("00");
    const [subTotal, setSubTotal] = useState(0);
    const [enable, setEnable] = useState([]);
    const [discounts, setDiscount] = useState([]);
    const [discountAmmount, setDiscountAmmount] = useState([]);
    const [totalDis, setTotalDis] = useState(0);
    const [tipoCk, setTipoCk] = useState("none");

    const [montoList, setMontoList] = useState([]);
    const [tipoList, setTipoList] = useState([]);
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const [conceptoReport, setConceptoReport] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/concepto-report/${user.email}`)
            .then(res => res.json())
            .then(data => {
                const top12Data = data.slice(0, 11);
                const sortedData = top12Data.sort((a, b) => a.sl - b.sl);
                setConceptoReport(sortedData)
            });
    }, [user.email])

    const [salesReport, setSalesReport] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/sales-report/${user.email}`)
            .then(res => res.json())
            .then(data => setSalesReport(data));
    }, [user.email])

    const [selectedDate1, setSelectedDate1] = useState(null);

    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/purchase-invoice/${user.email}`)
            .then(res => res.json())
            .then(data => setInvoices(data));
    }, [user.email]);

    const [rid, setRid] = useState([]);

    useEffect(() => {
        fetch('DGII_RNC.json')
            .then(res => res.json())
            .then(data => setRid(data));
    }, [])


    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };

    const startDate = selectedDate1
        ? `${selectedDate1.getDate()}-${selectedDate1.getMonth() + 1}-${selectedDate1.getFullYear()}`
        : 'No date selected';

    const [selectedDate2, setSelectedDate2] = useState(null);

    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };

    const dueDate = selectedDate2
        ? `${selectedDate2.getDate()}-${selectedDate2.getMonth() + 1}-${selectedDate2.getFullYear()}`
        : 'No date selected';

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

    const handleConcepto = (e) => {
        const form = e.target;
        setConceptoValue(form.value);
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

    const handleTipo = (e) => {
        const form = e.target;
        setTipoCk(form.value);
    }

    const handleNewRow = () => {
        if (conceptoValue === "00") {
            toast('Seleccione Concepto.');
            return;
        }
        if (ammount === 0) {
            toast('Ingrese el monto.');
            return;
        }
        if (tipoCk === "none") {
            toast('Seleccione Tipo.');
            return;
        }
        setCount(count + 1);
        const newT = [...enable, true];
        setSubTotal(subTotal + parseFloat(ammount))
        setEnable(newT);
        setMontoList([...montoList, ammount]);
        setTipoList([...tipoList, tipoCk]);
        setAmmount(0);
        setTipoCk("none");
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const nfc = form.nfc.value;
        const id = form.id.value;
        const rnc = form.rnc.value;
        const fecha = startDate;
        const fechDePago = dueDate;
        const formaDePago = form.formaDePago.value;
        const modificado = form.modificado.value;
        const mark = isChecked;
        let company = "";
        const mail = user.email;
        console.log('m', mail);

        setMontoList([...montoList, ammount]);
        setTipoList([...tipoList, tipoCk]);

        if (mark === false && nfc.length !== 11 && nfc.length !== 13) {
            toast('Llene el NCF correcto. ' + nfc.length);
            return;
        }
        if (fecha === 'No date selected') {
            toast('Seleccione fecha.');
            return;
        }
        if (fechDePago === 'No date selected') {
            toast('Seleccione fecha de pago.');
            return;
        }
        if (formaDePago === 'none') {
            toast('Seleccione forma de pago.');
            return;
        }
        if (conceptoValue === "00") {
            toast('Seleccione Concepto.');
            return;
        }
        if (tipoCk === "none") {
            toast('Seleccione Tipo.');
            return;
        }

        if (invoices && invoices.length > 0) {
            for (let i = 0; i < invoices.length; i++) {
                if (invoices[i].nfc === nfc) {
                    toast('NCF existe para ese RNC.');
                    return;
                }
            }
        }

        if (mark === false && rid && rid.length > 0) {
            for (let i = 0; i < rid.length; i++) {
                if (rid[i].CompanyRNC === rnc) {
                    company = rid[i].CompanyName;
                    console.log(company);
                    break;
                }
                else {
                    company = "empty";
                }
            }
        } else {
            console.error("RID data is undefined or empty.");
        }
        if (company === "empty") {
            toast('No se encontraron datos registrados de este contribuyente.');
            return;
        }

        const monto = ammount;

        const subTotals = parseFloat((subTotal + parseFloat(ammount ? ammount : '0')).toFixed(2));

        const totals = parseFloat(((subTotal + parseFloat(ammount ? ammount : '0')) + (taxAmmount[0] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[4]) / 100) : 0)).toFixed(2));

        const totalToPagars = parseFloat((((subTotal + parseFloat(ammount ? ammount : '0')) + (taxAmmount[0] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[4]) / 100) : 0)) - (parseFloat(ammountDisscount))).toFixed(2));

        const invoice = { mail, nfc, id, rnc, company, fecha, fechDePago, formaDePago, modificado, monto, subTotals, totals, totalToPagars, count, taxs, taxAmmount, conceptoValue, enable, discounts, discountAmmount, ammountDisscount, totalDis, montoList, tipoList, tipoCk, ammount, mark };

        console.log(invoice);

        const dateString = fecha;
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
        console.log(salesReport[srl])
        const Compra = (salesReport[srl].Compra) + totalToPagars;
        const Ventas = (salesReport[srl].Ventas);
        const PTax = (salesReport[srl].PTax) + ((taxAmmount[0] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[4]) / 100) : 0));
        const STax = (salesReport[srl].STax);

        const report = { Compra, Ventas, PTax, STax };
        console.log(report)

        const conceptIdx = parseInt(conceptoValue) - 1;
        console.log(conceptoReport)
        const record = conceptoReport[conceptIdx].record + 1;
        const value = conceptoReport[conceptIdx].value + totalToPagars;
        const conceptoAdd = { record, value }

        console.log(conceptoAdd)


        setIsButtonDisabled(true);
        fetch('https://account-ser.vercel.app/purchase-invoice', {
            method: 'POST',
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
        fetch(`https://account-ser.vercel.app/concepto-report/${user.email}/${conceptoValue}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(conceptoAdd)
        })
            .then(res => {
                res.json()

                setTimeout(() => {
                    navigate(`/purchase-list`);
                }, 1600);
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            })
    }


    return (
        <div>

            <div className="bg-[#eee] pt-8 pb-14 px-8">
                <form onSubmit={handleAddProduct}>
                    <h2 className="text-[#28084B] text-2xl font-bold pb-8">Nueva Factura de Compra</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#fff] p-4 pb-6 rounded-lg">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-tex
                                t font-medium">NCF</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="nfc" maxLength={"13"} required className="input bg-[#fff] input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Tipo de ID</span>
                            </label>
                            <label className="input-group">
                                <select name="id" id="id" className="input bg-[#fff] input-bordered w-full">
                                    <option value="RNC">RNC</option>
                                    <option value="Cedula">Cedula</option>
                                </select>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">ID</span>
                            </label>
                            <label className="input-group">
                                <input type="number" name="rnc" required placeholder="" className="input bg-[#fff] input-bordered w-full" />
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
                                        placeholderText="dd-mm-yyyy"
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
                                        placeholderText="dd-mm-yyyy"
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Forma de pago</span>
                            </label>
                            <label className="input-group">
                                <select name="formaDePago" id="formaDePago" className="input bg-[#fff] input-bordered w-full">
                                    <option value="none">Select</option>
                                    <option value="01 - EFECTIVO">01 - EFECTIVO</option>
                                    <option value="02 - CHEQUES/TRANSFERENCIAS/DEPÓSITO">02 - CHEQUES/TRANSFERENCIAS/DEPÓSITO</option>
                                    <option value="03 - TARJETA CRÉDITO/DÉBITO">03 - TARJETA CRÉDITO/DÉBITO</option>
                                    <option value="04 - COMPRA A CREDITO">04 - COMPRA A CREDITO</option>
                                    <option value="05 - PERMUTA">05 - PERMUTA</option>
                                    <option value="06 - NOTA DE CREDITO">06 - NOTA DE CREDITO</option>
                                    <option value="07 - MIXTO">07 - MIXTO</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">NCF Modificado</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="modificado" className="input bg-[#fff] input-bordered w-full" />
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
                                        <th>Concepto</th>
                                        <th>Impuesto</th>
                                        <th>Monto</th>
                                        <th>Tipo</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {Array.from({ length: count }).map((_, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <select defaultValue={conceptoValue} onChange={handleConcepto} name={'product' + idx} id={'product' + idx} className="input bg-[#fff] input-bordered w-full">

                                                            <option disabled={(count > 1) ? true : false} value="00">Select</option>
                                                            <option disabled={(count > 1) ? true : false} value="01 - GASTOS DE PERSONAL">01 - GASTOS DE PERSONAL</option>
                                                            <option disabled={(count > 1) ? true : false} value="02 - GASTOS POR TRABAJOS, SUMINISTROS Y SERVICIOS">02 - GASTOS POR TRABAJOS, SUMINISTROS Y SERVICIOS</option>
                                                            <option disabled={(count > 1) ? true : false} value="03 - ARRENDAMIENTOS">03 - ARRENDAMIENTOS</option>
                                                            <option disabled={(count > 1) ? true : false} value="04 - GASTOS DE ACTIVOS FIJO">04 - GASTOS DE ACTIVOS FIJO</option>
                                                            <option disabled={(count > 1) ? true : false} value="05 - GASTOS DE REPRESENTACIÓN" >05 - GASTOS DE REPRESENTACIÓN</option>
                                                            <option disabled={(count > 1) ? true : false} value="06 - OTRAS DEDUCCIONES ADMITIDAS">06 - OTRAS DEDUCCIONES ADMITIDAS</option>
                                                            <option disabled={(count > 1) ? true : false} value="07 - GASTOS FINANCIEROS">07 - GASTOS FINANCIEROS</option>
                                                            <option disabled={(count > 1) ? true : false} value="08 - GASTOS EXTRAORDINARIOS">08 - GASTOS EXTRAORDINARIOS</option>
                                                            <option disabled={(count > 1) ? true : false} value="09 - COMPRAS Y GASTOS QUE FORMARAN PARTE DEL COSTO DE VENTA">09 - COMPRAS Y GASTOS QUE FORMARAN PARTE DEL COSTO DE VENTA</option>
                                                            <option disabled={(count > 1) ? true : false} value="10 - ADQUISICIONES DE ACTIVOS">10 - ADQUISICIONES DE ACTIVOS</option>
                                                            <option disabled={(count > 1) ? true : false} value="11 - GASTOS DE SEGUROS">11 - GASTOS DE SEGUROS</option>

                                                        </select>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <select name="statu" defaultValue={taxs[0] ? taxs[0] : "Ninguno - (0.00%)"} onChange={handleTax} id="statu" className="input bg-[#fff] input-bordered w-full">
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
                                                        <input type="number" readOnly={enable[idx] ? true : false} required onChange={handleAmmount} name="ammount+idx" placeholder="" className="input bg-[#fff] input-bordered w-full" step="any" pattern="^\d*\.?\d*$" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">

                                                        <select onChange={handleTipo} name={'status' + idx} id={'status' + idx} className="input bg-[#fff] input-bordered w-full">
                                                            <option value="none">Seleccionar</option>
                                                            <option value="Goods">Bien</option>
                                                            <option value="Service" >Servicio</option>
                                                        </select>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <button type="button" onClick={() => setCount((count) => count - 1)} className="bg-red-700 rounded-lg px-1 py-2 text-[#fff] font-bold">X</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="grid grid-cols-10 mt-6 mx-4">
                                <div className="col-span-6">
                                    <div className="pb-4">
                                        <button type="button" onClick={handleNewRow} className="px-4 cursor-pointer py-2 rounded-lg bg-[#733CFF] border border-[#733CFF] hover:border-[#733CFF] text-[#fff] hover:text-[#733CFF] hover:bg-[#fff]">Anadir</button>
                                    </div>
                                    <div className=" grid grid-cols-2 gap-3">
                                        <div className="">
                                            <p className="text-sm font-medium pb-2">Retenciones:</p>
                                            <div className="form-control">
                                                <label className="input-group">
                                                    <select name="status" id="status" onChange={handleDiscount} className="input bg-[#fff] input-bordered w-full">
                                                        <option value="None">Ninguno</option>
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
                                        <div className="">
                                            <p className="text-sm font-medium pb-2">Valor:</p>
                                            <div className="form-control">
                                                <label className="input-group">
                                                    <input type="number" defaultValue={0} onChange={handleAmmountDisscount} name="ammount" placeholder="" className="input bg-[#fff] input-bordered w-full" step="any" pattern="^\d*\.?\d*$" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 text-[#111] text-xl font-medium flex flex-col justify-center text-right">
                                    <h2>Sub Total: {(subTotal + parseFloat(ammount ? ammount : '0')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                                    {
                                        taxs.map((tax, idx) => tax && <h2 key={idx}>{tax}: {(((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[idx]) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>)
                                    }
                                    <h2>Total: {((subTotal + parseFloat(ammount ? ammount : '0')) + (taxAmmount[0] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[4]) / 100) : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                                    {/* <h2>- Retenciones: {((((subTotal + parseFloat(ammount ? ammount : '0')) + (taxAmmount[0] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[4]) / 100) : 0)) * totalDis) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </h2> */}
                                    <h2>- Retenciones: {(parseFloat(ammountDisscount)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </h2>
                                    <h2>Total a pagar: {(((subTotal + parseFloat(ammount ? ammount : '0')) + (taxAmmount[0] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? (((subTotal + parseFloat(ammount ? ammount : '0')) * taxAmmount[4]) / 100) : 0)) - (parseFloat(ammountDisscount))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </h2>
                                </div>
                            </div>
                        </div>
                    </div>


                    <input disabled={isButtonDisabled} type="submit" value="Guardar" className="px-4 cursor-pointer py-2 rounded-lg bg-[#157347] text-[#fff] mt-6" />

                </form>

            </div>
            <ToastContainer />
        </div>
    );
};

export default PurchaseAdd;