import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({children}) => {

    const {user,loading} = useContext(AuthContext);

    if(loading)
    {
        return <span className="loading loading-spinner text-neutral"></span>
    }

    if(user)
    return children;

    return <Navigate to={"/login"}></Navigate>
};

export default PrivateRoute;