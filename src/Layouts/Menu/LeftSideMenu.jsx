import logo from '../../assets/img/logo.png'
import { NavLink } from 'react-router-dom';
import './LeftSideMenu.css';

const LeftSideMenu = () => {


    return (
        <div className="bg-[#FFF] pt-4">
            <div className="">
                <a href="/">
                    <img className='w-32' src={logo} alt="" />
                </a>
            </div>
            <div className="pt-8">
                <div className="text-lg text-[#868686] font-medium flex flex-col">
                    <NavLink to={'/dashboard'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2' activeclassname='active' >Dashboard</NavLink>
                    <NavLink to={'/purchase-add'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Purchase Invoice Add</NavLink>
                    <NavLink to={'/purchase-list'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Purchase Invoice List</NavLink>
                    <NavLink to={'/sale-add'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Sale Invoice Add</NavLink>
                    <NavLink to={'/sale-list'} className='hover:bg-[#733CFF] hover:text-[#fff] px-2 rounded-lg w-full py-2'>Sale Invoice List</NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftSideMenu;