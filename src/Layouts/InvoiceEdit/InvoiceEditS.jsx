import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceEditS = () => {

    const invoiceData = useLoaderData();
    const navigate = useNavigate();
    const { nfc, id, rnc, fecha, fechDePago, formaDePago, modificado } = invoiceData;

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const nfc = form.nfc.value;
        const id = form.id.value;
        const rnc = form.rnc.value;
        const fecha = form.fecha.value;
        const fechDePago = form.fechDePago.value;
        const formaDePago = form.formaDePago.value;
        const modificado = form.modificado.value;

        const invoice = { nfc, id, rnc, fecha, fechDePago, formaDePago, modificado };

        console.log(invoice);

        fetch(`https://account-ser.vercel.app/sale-invoice/${invoiceData._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(invoice)
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
                    <h2 className="text-[#28084B] text-2xl font-bold pb-8">Invoice Edit</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#fff] p-4 pb-6 rounded-lg">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-tex
                                t font-medium">NFC</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={nfc} name="nfc" className="input bg-[#fff] input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">ID</span>
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
                                <span className="label-text font-medium">RNC</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={rnc} name="rnc" placeholder="" className="input bg-[#fff] input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Fecha</span>
                            </label>
                            <label className="input-group">
                                <input type="date" defaultValue={fecha} name="fecha" className="input bg-[#fff] input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Fecha de pago</span>
                            </label>
                            <label className="input-group">
                                <input type="date" defaultValue={fechDePago} name="fechDePago" className="input bg-[#fff] input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Forma de pago</span>
                            </label>
                            <label className="input-group">
                                <select defaultValue={formaDePago} name="formaDePago" id="status" className="input bg-[#fff] input-bordered w-full">
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
                                <input type="text" defaultValue={modificado} name="modificado" className="input bg-[#fff] input-bordered w-full" />
                            </label>
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