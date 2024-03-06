import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    //const [users, setUsers] = useState([]);


    if (loading) {
        return <span className="loading loading-spinner text-neutral"></span>
    }

    /* useEffect(() => {
        fetch(`https://account-ser.vercel.app/user-list/${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])
    console.log('uem', users.verify) */

    if (user) {
        return children;
    }

    return <Navigate to={"/login"}></Navigate>
};

export default PrivateRoute;