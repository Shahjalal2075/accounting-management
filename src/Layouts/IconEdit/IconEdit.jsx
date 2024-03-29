
const IconEdit = () => {

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const logo = form.logo.value;
        const favicon = form.favicon.value;
        const icon = {logo,favicon};
        console.log('ok',icon);
    }

    return (
        <div>
            <div className="bg-[#fff] m-4 p-8 rounded-lg">
                <div className="">
                    <form onSubmit={handleAddProduct}>
                        <h2 className="text-[#28084B] text-2xl font-bold pb-8">Site Logo Change</h2>
                        <div className="grid grid-cols-1 gap-4 bg-[#fff] pb-6 rounded-lg">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-tex
                                t font-medium">Logo Url:</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="logo" required className="input bg-[#fff] input-bordered w-full" defaultValue="https://" />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Favicon Url:</span>
                                </label>
                                <label className="input-group">
                                <input type="text" name="favicon" required className="input bg-[#fff] input-bordered w-full" defaultValue="https://" />
                                </label>
                            </div>
                        </div>



                        <input type="submit" value="Guardar" className="px-4 cursor-pointer py-2 rounded-lg bg-[#157347] text-[#fff] mt-6" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default IconEdit;