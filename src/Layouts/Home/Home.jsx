import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import LeftSideMenu from "../Menu/LeftSideMenu";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import VerifyMessage from "../VerifyMessage/VerifyMessage";

const Home = () => {

    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/user-list/${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [user.email])

    return (
        <div className="lg:grid grid-cols-5">
            <div className="bg-[#eee] lg:bg-[#4A70BA] rounded-lg">
                <LeftSideMenu></LeftSideMenu>
            </div>
            <div className="col-span-4">
                <Header></Header>
                <div className="">
                    {
                        users.verify&&<Outlet></Outlet>
                    }
                    {
                        (users.verify===false)&&<VerifyMessage></VerifyMessage>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;