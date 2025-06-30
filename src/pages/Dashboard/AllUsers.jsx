import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";



const AllUsers = () => {
    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `You made ${user.name} an Admin!`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
    }

    const handleMakeUser = user => {
        axiosSecure.patch(`/users/makeUser/${user._id}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `You've downgraded ${user.name} into user!!!`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
    }

    const handleMakeSeller = user => {
        axiosSecure.patch(`/users/makeSeller/${user._id}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `You made ${user.name} a Seller!`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                // text: "user has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly mt-2 mb-5 bg-emerald-200 py-3">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-11/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>

                                    {user.role === 'admin' && (
                                        <>
                                            <span
                                                className="bg-emerald-700 p-3 text-white text-xl font-bold rounded-md mr-3.5">
                                                Admin</span>
                                            <button
                                                onClick={() => handleMakeSeller(user)}
                                                className="btn btn-sm bg-orange-400/70 mx-3.5">
                                                Make Seller</button>
                                            <button
                                                onClick={() => handleMakeUser(user)}
                                                className="btn btn-sm btn-warning">
                                                Make User</button>
                                        </>
                                    )}
                                    {user.role === 'seller' && (
                                        <>
                                            <span
                                                className="bg-slate-700 p-3.5 text-white text-xl rounded-md mr-5">
                                                Seller</span>
                                            <button
                                                onClick={() => handleMakeUser(user)}
                                                className="btn btn-sm btn-warning mx-3.5">
                                                Make User</button>
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-sm btn-accent">
                                                Make Admin</button>
                                        </>
                                    )}
                                    {user.role === 'user' && (
                                        <>
                                            <button
                                                className="btn btn-lg bg-red-600 mr-5">
                                                <FaUsers className="text-white 
                                        text-2xl"></FaUsers>
                                            </button>
                                            <button
                                                onClick={() => handleMakeSeller(user)}
                                                className="btn btn-sm bg-orange-400/70 mx-3.5">
                                                Make Seller</button>
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-sm btn-accent">
                                                Make Admin</button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-lg bg-primary/80">
                                        <FaTrashAlt className="text-white"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;