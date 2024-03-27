import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Header = () => {

    const { user, signOutUser, isChecked } = useContext(AuthContext);

    const [isBtn, setIsBtn] = useState(true);

    const handleLogOutToggle = () => {
        setIsBtn(!isBtn);
    }

    const handleLogOut = () => {
        signOutUser()
            .then()
            .catch()
    }

    return (
        <div className="py-3 bg-[#4A70BA] px-8 pb-6 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)] rounded-xl">
            <div className="flex justify-between">
                <div className="form-control">
                    
                </div>
                <div className="flex gap-4 items-center">
                    <button className="ml-4" onClick={handleLogOutToggle}>
                        {
                            <img className="mask mask-circle w-10" src="https://i.ibb.co/0rcvLrD/users.png" />
                        }
                    </button>
                    {
                        isBtn ? <p className="text-[#fff] font-medium">{user.displayName}</p> : <button className="font-bold text-[#fff]" onClick={handleLogOut}>Logout</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;