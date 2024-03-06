import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../Providers/AuthProvider';

const UserAdd = () => {

    const { createUser, googleUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const company = e.target.company.value;
        const email = e.target.email.value;
        const role = e.target.role.value;
        const verify = false;
        const password = e.target.password.value;
        console.log(company + " " + email + " " + role + " " + password);
        const user = { company,email,role,verify };

        createUser(email, password)
            .then(result => {
                console.log(result.user);

                toast("User Create Succsessfully.");

                fetch('https://account-ser.vercel.app/user-list', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

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

                <h2 className="text-4xl font-bold">Create Account</h2>
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
                        <input className="cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-4 text-white px-2 py-1 font-semibold mb-4 w-80" type="submit" value={"Register"} />
                    </form>
                    <Link to={"/login"} className="text-base font-bold text-black">Allready Have An Account? Login Now</Link>
                </div>
                <ToastContainer />

            </div>
            <div className="flex justify-center items-center col-span-3">
                <img className="w-3/4" src="https://i.ibb.co/hczH6xT/hotelentry.png" alt="" />
            </div>
        </div>
    );
};

export default UserAdd;