import { Outlet } from "react-router-dom";
import LeftSideMenu from "../Menu/LeftSidemenu";
import Header from "../Header/Header";


const Root = () => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-5">
                <div className="">
                    <LeftSideMenu></LeftSideMenu>
                </div>
                <div className=" col-span-4">
                    <Header></Header>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Root;