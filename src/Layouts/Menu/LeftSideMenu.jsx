import logo from '../../assets/img/logo.png'
import { NavLink } from 'react-router-dom';
import './LeftSideMenu.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const LeftSideMenu = () => {

    const { user } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/user-list/${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [user.email])


    return (
        <div className="">
            <div className="hidden lg:flex justify-center">
                <div className="bg-[#4A70BA] pt-4 px-4  pb-[500px] shadow-xl shadow-indigo-500/40 rounded-lg ">
                    <div className="">
                        <a href="/">
                            <img className='w-32' src={logo} alt="" />
                        </a>
                    </div>
                    <div className="pt-8">
                        {
                            users.role === "Super Admin"
                            &&
                            <div className="text-lg text-[#fff] font-medium flex flex-col">
                                <NavLink to={'/company-list'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2' activeclassname='active' >Company List</NavLink>
                                <NavLink to={'/company-add'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2' activeclassname='active' >Add User</NavLink>
                                {/* <NavLink to={'/icon-edit'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2' activeclassname='active' >Icon Edit</NavLink>
                             */}
                            </div>
                        }
                        {
                            users.role === "User"
                            &&
                            <div className="text-lg text-[#fff] font-medium flex flex-col">
                                <NavLink to={'/dashboard'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2' activeclassname='active' >Dashboard</NavLink>
                                <NavLink to={'/purchase-add'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Registrar Factura de Compra</NavLink>
                                <NavLink to={'/purchase-list'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Consultar Facturas de Compras</NavLink>
                                <NavLink to={'/sale-add'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Registrar Factura de Venta</NavLink>
                                <NavLink to={'/sale-list'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Consultar Facturas de Ventas</NavLink>
                            </div>
                        }

                    </div>
                </div>
            </div>

            <div className="flex lg:hidden">
                <div className="navbar py-8 px-2">

                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex="0" role="button" className="">
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6" fill="none"
                                    viewBox="0 0 24 24" stroke="#111">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>
                            {
                                users.role === "Super Admin"
                                &&
                                <ul tabIndex="0"
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-[#fff] rounded-box w-48 ">
                                    <li><NavLink to={'/company-list'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2' activeclassname='active' >Company List</NavLink></li>
                                    <li><NavLink to={'/company-add'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2' activeclassname='active' >Add User</NavLink></li>
                                </ul>
                            }
                            {
                                users.role === "User"
                                &&
                                <ul tabIndex="0"
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-[#fff] rounded-box w-48 ">
                                    <li><NavLink to={'/dashboard'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2' activeclassname='active' >Dashboard</NavLink></li>
                                    <li><NavLink to={'/purchase-add'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Registrar Factura de Compra</NavLink></li>
                                    <li><NavLink to={'/purchase-list'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Consultar Facturas de Compras</NavLink></li>
                                    <li><NavLink to={'/sale-add'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Registrar Factura de Venta</NavLink></li>
                                    <li><NavLink to={'/sale-list'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Consultar Facturas de Ventas</NavLink></li>
                                </ul>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideMenu;