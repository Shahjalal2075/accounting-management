import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root/Root";
import Home from "../Layouts/Home/Home";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import PurchaseAdd from "../Layouts/PurchaseAdd/PurchaseAdd";
import PurchaseList from "../Layouts/PurchaseList/PurchaseList";
import SaleAdd from "../Layouts/Dashboard/SaleAdd/SaleAdd";
import SaleList from "../Layouts/Dashboard/SaleList/SaleList";
import Login from "../Layouts/Login/Login";
import InvoiceEdit from "../Layouts/InvoiceEdit/InvoiceEdit";
import UserAdd from "../Layouts/UserAdd/UserAdd";
import PrivateRoute from "./PrivateRoute";
import CompanyList from "../Layouts/CompanyList/CompanyList";
import InvoiceEditS from "../Layouts/InvoiceEdit/InvoiceEditS";
import Test from "../Layouts/Test/Test";
import Dashboard2 from "../Layouts/Dashboard/Dashboard2";


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home></Home></PrivateRoute>,
                children: [
                    {
                        path: "/",
                        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
                    },
                    {
                        path: "/dashboard",
                        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
                    },
                    {
                        path: "/purchase-add",
                        element: <PrivateRoute><PurchaseAdd></PurchaseAdd></PrivateRoute>
                    },
                    {
                        path: "/purchase-list",
                        element: <PrivateRoute><PurchaseList></PurchaseList></PrivateRoute>
                    },
                    {
                        path: "/sale-add",
                        element: <PrivateRoute><SaleAdd></SaleAdd></PrivateRoute>
                    },
                    {
                        path: "/sale-list",
                        element: <PrivateRoute><SaleList></SaleList></PrivateRoute>
                    },
                    {
                        path: "/purchase-invoice/:id",
                        element: <PrivateRoute><InvoiceEdit></InvoiceEdit></PrivateRoute>,
                        loader: ({ params }) => fetch(`https://account-ser.vercel.app/purchase-invoice/${params.id}`)
                    },
                    {
                        path: "/sale-invoice/:id",
                        element: <PrivateRoute><InvoiceEditS></InvoiceEditS></PrivateRoute>,
                        loader: ({ params }) => fetch(`https://account-ser.vercel.app/sale-invoice/${params.id}`)
                    },
                    {
                        path: "/company-list",
                        element: <PrivateRoute><CompanyList></CompanyList></PrivateRoute>
                    },
                    {
                        path: "/dashboard2",
                        element: <PrivateRoute><Dashboard2></Dashboard2></PrivateRoute>
                    }
                ]
            },
            {
                path: "/add-user",
                element: <UserAdd></UserAdd>
            },
            {
                path: "/login",
                element: <Login></Login>
            }
        ]
    }
]);

export default Routes;