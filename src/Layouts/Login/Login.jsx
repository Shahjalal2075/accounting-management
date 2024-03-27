import { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);

                toast("Login Succsessfull.");
                setTimeout(() => {
                    navigate("/");
                }, 1600);
            })
            .catch(error => {
                console.error(error);
                if (error.code === 'auth/user-not-found') {
                    toast('Email does not match.');
                } else if (error.code === 'auth/wrong-password') {
                    toast('Password does not match.');
                } else {
                    toast('Login failed: ' + error.message);
                }
                navigate("/login");
            })
    }

    return (
        <div className="">
            <div className="grid lg:grid-cols-5 grid-cols-2">

                <div className=" col-span-2 flex flex-col items-center justify-center">

                    <h2 className="text-4xl font-bold mt-8">Bienvenido</h2>
                    <p className="text-base font-medium mt-6 mb-4">Por favor coloca los credenciales</p>

                    <div className="flex flex-col justify-center items-center">
                        <form onSubmit={handleLogin} className="flex flex-col justify-center items-center" action="">
                            <input className="bg-[#fff] border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Email" type="email" name="email" required />
                            <input className="bg-[#fff] border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Password" type="password" name="password" required />
                            <input className=" cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-4 text-white px-2 py-1 font-semibold mb-4 w-80" type="submit" value={"Login"} />
                        </form>
                    </div>

                </div>
                <div className="flex justify-center items-center col-span-3 py-10">
                    <img className="w-3/4" src="https://i.ibb.co/mcbZpgw/3992746.png" alt="" />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;