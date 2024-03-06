import { useEffect, useState } from "react";
import CompanyView from "../CompanyView/CompanyView";

const CompanyList = () => {

    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        fetch(`https://account-ser.vercel.app/user-list`)
            .then(res => res.json())
            .then(data => setInvoices(data));
    }, [])

    console.log(invoices);

    

    return (
        <div>
            <h2 className="text-center font-bold text-2xl">Company List</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Company Name</th>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            invoices.map((invoice, index) => <CompanyView
                            key={invoice._id}
                            invoice={invoice}
                            index={index}
                            ></CompanyView>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CompanyList;