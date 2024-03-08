import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SaleAdd = () => {
    const navigate = useNavigate();

    const [count, setCount] = useState(1);
    /*  console.log(count); */
    const [ammount, setAmmount] = useState(0);
    const [taxs, setTax] = useState([]);
    const [taxAmmount, setTaxAmmount] = useState([]);

    const [selectedDate1, setSelectedDate1] = useState(null);

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

    //console.log(taxs)

    const handleAmmount = (e) => {
        const form = e.target;
        setAmmount(form.value);
        console.log(form.value);
    }

    /* const handleTax = (event) => {
        const selectedOption = event.target.value;
        if (event.target.selected) {
            setSelectedOptions([...selectedOptions, selectedOption]);
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== selectedOption));
        }
    }; */



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
                console.log('hit')
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
        }
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
        let company = "";
        for (let i = 0; i <= rid.length; i++) {
            if(rid[i].CompanyRNC===rnc)
            {
                company=rid[i].CompanyName;
                console.log(company);
                break;
            }
        }

        const impuesto = taxs;
        const monto = ammount;
        const subTotal = parseInt(ammount);
        const total = parseInt(ammount) + (taxAmmount[0] ? ((ammount * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? ((ammount * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? ((ammount * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? ((ammount * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? ((ammount * taxAmmount[4]) / 100) : 0);

        const invoice = { nfc, id, rnc, company, fecha, fechDePago, formaDePago, modificado, impuesto, monto, subTotal, total };

        console.log(invoice);

        fetch('https://account-ser.vercel.app/sale-invoice', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(invoice)
        })
            .then(res => {
                res.json()

                setTimeout(() => {
                    navigate(`/sale-list`);
                }, 1600);
            })
            .then(data => {
                console.log(data);
            })

    }


    return (
        <div>

            <div className="bg-[#eee] pt-8 pb-14 px-8">
                <form onSubmit={handleAddProduct}>
                    <h2 className="text-[#28084B] text-2xl font-bold pb-8">New Sale Invoice</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#fff] p-4 pb-6 rounded-lg">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-tex
                                t font-medium">NCF</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="nfc" className="input bg-[#fff] input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">ID</span>
                            </label>
                            <label className="input-group">
                                <select name="id" id="id" className="input bg-[#fff] input-bordered w-full">
                                    <option value="RNC">RNC</option>
                                    <option value="Cedula">Cedula</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                </select>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">RNC</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="rnc" placeholder="" className="input bg-[#fff] input-bordered w-full" />
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
                                <select name="formaDePago" id="status" className="input bg-[#fff] input-bordered w-full">
                                    <option value="">Select</option>
                                    <option value="01 - EFECTIVO">01 - EFECTIVO</option>
                                    <option value="02 - CHEQUES/TRANSFERENCIAS/DEPÓSITO<">02 - CHEQUES/TRANSFERENCIAS/DEPÓSITO</option>
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
                    </div>

                    <div className="bg-[#fff] p-4 pb-6 rounded-lg mt-8">
                        <h2 className="text-[#28084B] text-2xl font-medium pb-8">Invoice Details</h2>
                        <div className="overflow-x-auto bg-[#fff] p-2 rounded-lg">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Impuesto</th>
                                        <th>Monto</th>
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
                                                        <select name="status" id="status" onChange={handleTax} className="input bg-[#fff] input-bordered w-full">
                                                            <option value="Ninguno - (0.00%)">Ninguno - (0.00%)</option>
                                                            <option value="ITBIS - (18.00%)">ITBIS - (18.00%)</option>
                                                            <option value="Propina - (10.00%)">Propina - (10.00%)</option>
                                                            <option value="CDT - (2.00%)">CDT - (2.00%)</option>
                                                            <option value="PROPORCIONALIDAD - (18.00%)">PROPORCIONALIDAD - (18.00%)</option>
                                                        </select>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <input type="number" onChange={handleAmmount} max={'99'} name="productName" placeholder="" className="input bg-[#fff] input-bordered w-full" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <button onClick={() => setCount((count) => count - 1)} className="bg-red-700 rounded-lg px-1 py-2 text-[#fff] font-bold">X</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className=" mt-6">

                                <div className="text-[#111] text-xl font-medium flex flex-col justify-center text-right">
                                    <h2>Sub Total: {(parseInt(ammount)).toFixed(2)}</h2>
                                    {
                                        taxs.map((tax, idx) => tax && <h2 key={idx}>{tax}: {((ammount * taxAmmount[idx]) / 100).toFixed(2)}</h2>)
                                    }
                                    <h2>Total: {(parseInt(ammount) + (taxAmmount[0] ? ((ammount * taxAmmount[0]) / 100) : 0) + (taxAmmount[1] ? ((ammount * taxAmmount[1]) / 100) : 0) + (taxAmmount[2] ? ((ammount * taxAmmount[2]) / 100) : 0) + (taxAmmount[3] ? ((ammount * taxAmmount[3]) / 100) : 0) + (taxAmmount[4] ? ((ammount * taxAmmount[4]) / 100) : 0)).toFixed(2)}</h2>
                                </div>
                            </div>
                        </div>
                    </div>


                    <input type="submit" value="Save" className="px-4 cursor-pointer py-2 rounded-lg bg-[#157347] text-[#fff] mt-6" />

                </form>

            </div>
        </div>
    );
};

export default SaleAdd;