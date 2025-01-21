import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";

const Cart = () => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/carts?email=${user.email}`)
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

    const removeItem = (item) => {
        fetch(`http://localhost:5000/carts/${item._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'item removed from your Cart',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const clearCart = () => {
        cartItems.forEach(item => removeItem(item));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const updateCartItem = (id, updatedItem) => {
        fetch(`http://localhost:5000/carts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">All({cartItems.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
        </div>
    );
};

export default Cart;
