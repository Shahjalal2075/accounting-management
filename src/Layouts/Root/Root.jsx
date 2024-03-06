import { Outlet } from "react-router-dom";


const Root = () => {
    return (
        <div className=" bg-[#eee]">
            <div className="container mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;