
const Header = () => {
    return (
        <div className="py-3 bg-[#fff] px-8 pb-6 shadow-[0_0_13px_0px_rgba(82,63,105,0.05)]">
            <div className="flex justify-between">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered h-10 w-24 md:w-60 rounded-lg bg-white " />
                    <img className=" ml-40 -mt-9 w-6" src="images/Frame.png" alt="" />

                </div>
                <div className="flex gap-4 items-center">
                    <img className="mask mask-circle w-10" src="https://i.ibb.co/0rcvLrD/users.png" />
                    <p>Admin</p>
                </div>
            </div>
        </div>
    );
};

export default Header;