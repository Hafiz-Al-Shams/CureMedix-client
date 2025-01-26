import useAuth from "../../hooks/useAuth";



const SellerHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2 className="text-3xl font-semibold">
                <span>Welcome </span>
                {
                    user?.displayName ? `Seller (${user.displayName})` : 'to home'
                }
            </h2>
            <h4 className="text-2xl font-semibold text-center bg-slate-100 mt-10 py-4">total sales revenue of your medicines, Paid total, pending total, coming sooooon......
            </h4>
        </div>
    );
};

export default SellerHome;