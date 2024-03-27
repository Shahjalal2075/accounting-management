import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../Providers/AuthProvider';

const CompanyAdd = () => {

    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const company = e.target.company.value;
        const email = e.target.email.value;
        const role = e.target.role.value;
        const verify = false;
        const password = e.target.password.value;
        const user = { company, email, role, verify };

        const salesReportData = [
            {
                "mail": `${email}`,
                "sl": 1,
                "name": "Jan",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2400,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 2,
                "name": "Feb",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2210,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 3,
                "name": "Mar",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2290,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 4,
                "name": "Abr",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2000,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 5,
                "name": "May",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2181,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 6,
                "name": "Jun",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2500,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 7,
                "name": "Jul",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2100,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 8,
                "name": "Ago",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2100,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 9,
                "name": "Sep",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2100,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 10,
                "name": "Oct",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2000,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 11,
                "name": "Nov",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2100,
                "PTax": 0,
                "STax": 0
            },
            {
                "mail": `${email}`,
                "sl": 12,
                "name": "Dic",
                "Compra": 0,
                "Ventas": 0,
                "amt": 2100,
                "PTax": 0,
                "STax": 0
            }
        ];
        const conceptoReportData = [
            { "mail": `${email}`, "sl": 1, "name": "01 - GASTOS DE PERSONAL", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 3, "name": "03 - ARRENDAMIENTOS", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 8, "name": "08 - GASTOS EXTRAORDINARIOS", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 9, "name": "09 - COMPRAS Y GASTOS QUE FORMARAN PARTE DEL COSTO DE VENTA", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 10, "name": "10 - ADQUISICIONES DE ACTIVOS", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 5, "name": "05 - GASTOS DE REPRESENTACIÓN", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 7, "name": "07 - GASTOS FINANCIEROS", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 11, "name": "11 - GASTOS DE SEGUROS", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 2, "name": "02 - GASTOS POR TRABAJOS, SUMINISTROS Y SERVICIOS", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 4, "name": "04 - GASTOS DE ACTIVOS FIJO", "record": 1, "value": 1 },
            { "mail": `${email}`, "sl": 6, "name": "06 - OTRAS DEDUCCIONES ADMITIDAS", "record": 1, "value": 1 }
        ];


        createUser(email, password)
            .then(result => {
                console.log(result.user);

                toast("User Create Succsessfully.");

                fetch('http://localhost:5000/user-list', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

                if (role === "User") {
                    for (let i = 0; i < salesReportData.length; i++) {
                        fetch('http://localhost:5000/sales-report', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(salesReportData[i])
                        })
                    }
                    for (let i = 0; i < conceptoReportData.length; i++) {
                        fetch('http://localhost:5000/concepto-report', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(conceptoReportData[i])
                        })
                    }
                }

                updateProfile(result.user, {
                    displayName: company,
                })
                    .then()
                    .catch()

                setTimeout(() => {
                    navigate("/");
                }, 1600);
            })
            .catch(error => {
                console.error(error);
                toast(error.message);
            })
    }

    return (
        <div className="grid lg:grid-cols-5 grid-cols-2">

            <div className=" col-span-2 flex flex-col items-center justify-center">

                <h2 className="text-4xl font-bold">Add Company</h2>
                <p className="text-base font-medium mt-12">Please Enter Your Details</p>

                <div className="flex gap-4 items-center">
                    <hr className="w-20" />
                    <p>or</p>
                    <hr className="w-20" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <form onSubmit={handleRegister} className="flex flex-col justify-center items-center" action="">
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Company Name" type="text" name="company" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Email" type="email" name="email" required />
                        <select name="role" id="role" className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80">
                            <option value="Super Admin">Super Admin</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Password" type="password" name="password" required />
                        <input className="cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-4 text-white px-2 py-1 font-semibold mb-4 w-80" type="submit" value={"Add"} />
                    </form>
                </div>
                <ToastContainer />

            </div>
            <div className="flex justify-center items-center col-span-3">
                <img className="w-3/4" src="https://i.ibb.co/hczH6xT/hotelentry.png" alt="" />
            </div>
        </div>
    );
};

export default CompanyAdd;