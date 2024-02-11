import { useState } from "react";

const PurchaseAdd = () => {

    const [count, setCount] = useState(1);
    console.log(count);

    const handleAddProduct = (e) => {
        e.preventDefault();
        /*const form = e.target;
        const productName = form.productName.value;
        const brandName = form.brandName.value;
        const type = form.productType.value;
        const price = form.price.value;
        //const photo = form.photo.value;
        const rating = form.rating.value;
        const details = form.details.value;

        const product = { productName, brandName, type, price, rating, details };

        console.log(product);

        fetch('https://tech-server-seven.vercel.app/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => {
                res.json()
                //toast("Product Add Succsessfull.");
                setTimeout(() => {
                    //navigate(`/${brandName}`);
                }, 1600);
            })
            .then(data => {
                console.log(data);
            })*/

    }


    return (
        <div>

            <div className="bg-[#F7F8F9] pt-8 pb-14 px-8">
                <form onSubmit={handleAddProduct}>
                    <h2 className="text-[#28084B] text-2xl font-bold pb-8">New Purchase Invoice</h2>
                    <div className="grid grid-cols-3 gap-4 bg-[#fff] p-4 pb-6 rounded-lg">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Invoice Number</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="productName" className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Customer Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="brandName" placeholder="" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Invoice Date</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="productType" className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Due Date</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="price" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Status</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="price" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Reference No</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="price" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>

                    <div className="bg-[#fff] p-4 pb-6 rounded-lg mt-8">
                        <h2 className="text-[#28084B] text-2xl font-medium pb-8">Invoice Details</h2>
                        <div className="overflow-x-auto bg-[#fff] p-2 rounded-lg">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Product/Service</th>
                                        <th>Tax</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {Array.from({ length: count }).map((_, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <input type="text" name="productName" placeholder="Product Name" className="input input-bordered w-full" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <input type="text" name="productName" placeholder="Product Name" className="input input-bordered w-full" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <input type="text" name="productName" placeholder="Product Name" className="input input-bordered w-full" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <input type="text" name="productName" placeholder="Product Name" className="input input-bordered w-full" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-control">
                                                    <button onClick={() => setCount((count) => count - 1)} className="bg-red-700 rounded-lg px-1 py-2 text-[#fff] font-bold">X</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={() => setCount((count) => count + 1)} className="px-4 cursor-pointer py-2 rounded-lg bg-[#733CFF] border border-[#733CFF] hover:border-[#733CFF] text-[#fff] mt-6 hover:text-[#733CFF] hover:bg-[#fff]">Add</button>

                        </div>
                    </div>


                    <input type="submit" value="Save" className="px-4 cursor-pointer py-2 rounded-lg bg-[#157347] text-[#fff] mt-6" />

                </form>

            </div>
        </div>
    );
};

export default PurchaseAdd;