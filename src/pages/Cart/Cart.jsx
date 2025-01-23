import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const Cart = () => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            fetch(`https://cure-medix-server.vercel.app/carts?email=${user.email}`)
                .then(res => res.json())
                .then(data => setCartItems(data));
        }
    }, [user?.email]);

    const increaseQuantity = (item) => {
        setCartItems(cartItems.map(cartItem =>
            cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ));
        updateCartItem(item._id, { ...item, quantity: item.quantity + 1 });
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            setCartItems(cartItems.map(cartItem =>
                cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            ));
            updateCartItem(item._id, { ...item, quantity: item.quantity - 1 });
        }
    };

    // const removeItem = (item) => {
    //     fetch(`https://cure-medix-server.vercel.app/carts/${item._id}`, {
    //         method: 'DELETE',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.deletedCount > 0) {
    //                 setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
    //                 Swal.fire({
    //                     position: "center",
    //                     icon: "success",
    //                     title: 'item removed from your Cart',
    //                     showConfirmButton: false,
    //                     timer: 2000
    //                 });
    //             }
    //         })
    //         .catch(error => console.error('Error:', error));
    // };

    // const clearCart = () => {
    //     cartItems.forEach(item => removeItem(item));
    // };

    // const calculateTotal = () => {
    //     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    // };

    const updateCartItem = (id, updatedItem) => {
        fetch(`https://cure-medix-server.vercel.app/carts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        })
            .catch(error => console.error('Error:', error));
    };

    const handleViewDetails = (item) => {
        Swal.fire({
            title: item.name,
            text: `${item.description}`,
            imageUrl: item.image,
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: item.name,
            html: `
                        <div class="text-left ml-10">
                            <p><strong>Category:</strong> ${item.category}</p>
                            <p><strong>Type:</strong> ${item.type}</p>
                            <p><strong>Price:</strong> $${item.price}</p>
                            <p><strong>Stock:</strong> ${item.stock}</p>
                            <p><strong>Stock:</strong> ${item.email}</p>
                            <p><strong>Discount:</strong> ${item.discount ? item.discountPercentage : "NA"}</p>
                        </div>
                    `,
            showCloseButton: true,
            // draggable: true
        });
    };

    const handleDelete = id => {
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

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your order has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="px-6 pt-4 max-w-screen-xl mx-auto">
            {/* <h1 className="text-3xl font-bold mb-6">All({cartItems.length})</h1> */}
            <div className="flex justify-evenly mb-8">
                <h2 className="text-4xl">Ordered Medicine: {cart.length}</h2>
                <h2 className="text-4xl">Total Price: {totalPrice}</h2>
                {cart.length ? <Link to="/dashboard/payment">
                    <button className="btn btn-primary">Pay</button>
                </Link> :
                    <button disabled className="btn btn-primary">Pay</button>
                }

            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-emerald-600 text-white">
                            <th>
                                No.
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>${item.price}</td>
                                <td className="py-3 px-4">
                                    <button
                                        className="mr-5 mt-2"
                                    >
                                        <div className="text-xl text-emerald-950 mr-2"
                                            onClick={() => handleViewDetails(item)}
                                        >
                                            <FaEye />
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>



            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <div className="mb-4">
                        <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button>
                    </div>
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex justify-between items-center border-b pb-4 mb-4">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded mr-4" />
                                <div>
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p>{item.company}</p>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="btn btn-secondary btn-sm mr-2" onClick={() => decreaseQuantity(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="btn btn-secondary btn-sm ml-2" onClick={() => increaseQuantity(item)}>+</button>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(item)}>Remove</button>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-100 p-4 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="mb-2">
                        <p>Subtotal: ${calculateTotal().toFixed(2)}</p>
                    </div>
                    <div className="mb-4">
                        <p>Shipping Fee: $0.00</p>
                    </div>
                    <div className="font-bold text-lg mb-4">
                        <p>Total: ${calculateTotal().toFixed(2)}</p>
                    </div>
                    <button className="btn btn-primary w-full">Proceed to Checkout</button>
                </div>
            </div> */}
        </div>
    );
};

export default Cart;
