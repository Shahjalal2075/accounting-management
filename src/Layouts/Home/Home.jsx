import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import LeftSideMenu from "../Menu/LeftSideMenu";

const Home = () => {
    return (
        <div className="lg:grid grid-cols-5">
            <div className="bg-[#eee] lg:bg-[#4A70BA] rounded-lg">
                <LeftSideMenu></LeftSideMenu>
            </div>
            <div className="col-span-4">
                <Header></Header>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Home;