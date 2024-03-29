import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import CompanyList from "../CompanyList/CompanyList";
import Dashboard from "../Dashboard/Dashboard";
import VerifyMessage from "../VerifyMessage/VerifyMessage";

const RoleSelect = () => {

    const { user } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/user-list/${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [user.email])

    console.log(users)

    return (
        <div>
            {
                (users.role === ("Super Admin")) && <CompanyList></CompanyList>
            }
            {
                (users.role === ("User")) && (users.verify?<Dashboard></Dashboard>:<VerifyMessage></VerifyMessage>)
            }
        </div>
    );
};

export default RoleSelect;