import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root/Root";
import Home from "../Layouts/Home/Home";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import PurchaseAdd from "../Layouts/PurchaseAdd/PurchaseAdd";
import PurchaseList from "../Layouts/PurchaseList/PurchaseList";
import SaleAdd from "../Layouts/Dashboard/SaleAdd/SaleAdd";
import SaleList from "../Layouts/Dashboard/SaleList/SaleList";


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/purchase-add",
element: <PurchaseAdd></PurchaseAdd>
            },
            {
                path: "/purchase-list",
                element: <PurchaseList></PurchaseList>
            },
            {
                path: "/sale-add",
                element: <SaleAdd></SaleAdd>
            },
            {
                path: "/sale-list",
                element: <SaleList></SaleList>
            }
        ]
    }
]);

export default Routes;