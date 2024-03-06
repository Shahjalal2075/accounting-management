import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Link} from 'react-router-dom';

const CompanyView = ({ invoice, index }) => {



    const verifyUser = () => {
        fetch(`https://account-ser.vercel.app/user-list/${invoice.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ verify: !isVerify, role: invoice.role })
        })

        setIsVerify(!isVerify);
    }
    const [isVerify, setIsVerify] = useState(invoice.verify);


   




    return (
        <tr>
            <th>{index + 1}</th>
            <td>{invoice.company}</td>
            <td>{invoice.email}</td>
            <td><button onClick={verifyUser}>{isVerify ? <img className="w-8" src="https://i.ibb.co/dJqs5tT/check.png" alt="" /> : <img className="w-8" src="https://i.ibb.co/1G71M4K/cross.png" alt="" />}</button></td>
            <td>{invoice.role}</td>
        </tr>
    );
};

export default CompanyView;

CompanyView.propTypes = {
    employee: PropTypes.object,
    index: PropTypes.number
}