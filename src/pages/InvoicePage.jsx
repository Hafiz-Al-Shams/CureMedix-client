import { Helmet } from "react-helmet-async";
import { useReactToPrint } from "react-to-print";
import useAuth from "../hooks/useAuth";
import logo from '../../src/assets/logo.png';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const InvoicePage = () => {
    const invoiceRef = useRef();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })


    const handlePrint = () => {
        // content: () => invoiceRef.current,
        // documentTitle: "Invoice",
        Swal.fire({
            title: 'Opps!!!',
            text: 'useReactToPrint not working!!',
            icon: 'error',
            confirmButtonText: 'ok'
        });
        navigate('/dashboard/paymentHistory');
    }

    if (!payments.length || !user) {
        return (
            <div className="flex justify-center items-center h-screen text-4xl">
                <Helmet>
                    <title>CureMedix | Invoice</title>
                </Helmet>
                Loading...</div>
        );
    }

    return (
        <>
            <Helmet>
                <title>CureMedix | Invoice</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 pt-4 pb-20">

                <h2 className="text-4xl font-bold my-3">Invoice</h2>
                {payments.map((payment) => <div ref={invoiceRef} key={payment._id}

                    className="bg-white shadow-xl rounded-lg w-full max-w-3xl p-8"
                >
                    {/* <h2 className="text-4xl font-bold mt-8 mb-5">Invoice</h2> */}
                    {/* Header with logo */}
                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                        <img
                            src={logo}
                            alt="Website Logo"
                            className="h-16"
                        />
                        <div className="text-right">
                            <p className="text-sm text-gray-500">#{payment.transactionId}</p>
                        </div>
                    </div>

                    {/* User Information */}
                    <div className="mb-6 flex items-center space-x-4">
                        <img
                            src={user.photoURL} // User's photo displayed here
                            alt={`${user.displayName}'s profile`}
                            className="w-16 h-16 rounded-full border"
                        />
                        {/* User Details */}
                        <div>
                            <h3 className="text-lg font-semibold">Customer Information</h3>
                            <p className="text-sm text-gray-600">Name: {user.displayName}</p>
                            <p className="text-sm text-gray-600">Email: {user.email}</p>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Purchase Details</h3>
                        <p className="text-sm text-gray-600">
                            Transaction Date:{new Date(payment.date).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">Total Price: ${payment.price}</p>
                        <p className="text-sm text-gray-600">
                            Status:{" "}
                            <span
                                className={`font-bold ${payment.status === "pending"
                                    ? "text-red-600"
                                    : "text-green-600"
                                    }`}
                            >
                                {payment.status}
                            </span>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="text-center border-t pt-4 mt-6 text-sm text-gray-800">
                        <p>Thank you for your purchase!</p>
                        <p>CureMedix Company Limited | www.curemedix-company.com</p>
                    </div>
                    <div className="divider divider-secondary"></div>
                </div>)}

                {/* Print Button */}
                <button
                    onClick={handlePrint}
                    className="mt-6 btn btn-primary"
                >
                    Print Invoice
                </button>
            </div>
        </>
    );
};

export default InvoicePage;