import { createContext, useEffect, useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const token = localStorage.getItem("token");
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cartTotal, setCartTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        fetchCartCount();
    }, []);

    const fetchCartCount = async () => {
        try {
            // console.log("TOKEN =>", token);
            if (token) {
                const res = await api.get("/cart-count", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                // console.log(res.data.count);
                setCartCount(res.data.count);
            } else {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                setCartCount(cart.length);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async (product) => {
        // If login user
        if (token) {
            try {
                await api.post(
                    "/add-cart",
                    { product_id: product.id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setCartCount(cartCount + 1);
                toast.success("Added to cart");
            } catch (error) {
                toast.error("Failed to add to cart");
            }
        } else {
            // Guest user localStorage cart
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const exist = cart.find((item) => item.id === product.id);

            if (exist) {
                exist.qty += 1;
            } else {
                cart.push({
                    ...product,
                    qty: 1,
                });
                setCartCount(cartCount + 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            toast.success("Added to cart");
        }
    };

    const handleBuyNow = (product) => {
        if (token) {
            navigate("/checkout", {
                state: {
                    type: "buy_now",
                    product: product,
                    qty: 1,
                },
            });
        } else {
            navigate("/signin");
        }
    };

    const increaseQty = (id) => {
        if (token) {
            api.post(
                "/update-cart",
                { product_id: id, action: "increment" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } else {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart = cart.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item,
            );
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        toast.success("Quantity increased");
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item,
            ),
        );
    };

    const fetchCartItems = async () => {
        setLoading(true);

        try {
            if (token) {
                const res = await api.get("/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCartItems(res.data.cart);
                setCartCount(res.data.cart.length);
                setCartTotal(res.data.total_amount);
            } else {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];

                setCartItems(cart);
                setCartCount(cart.length);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const decreaseQty = (id) => {
        if (token) {
            api.post(
                "/update-cart",
                { product_id: id, action: "decrement" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } else {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart = cart.map((item) =>
                item.id === id && item.qty > 1
                    ? { ...item, qty: item.qty - 1 }
                    : item,
            );
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        toast.success("Quantity decreased");
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.qty > 1
                    ? { ...item, qty: item.qty - 1 }
                    : item,
            ),
        );
    };

    const removeItem = async (id) => {
        if (token) {
            try {
                await api.post(
                    "/remove-cart",
                    { product_id: id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                toast.success("Item removed from cart");
                const updatedCart = cartItems.filter((item) => item.id !== id);

                setCartItems(updatedCart);
                setCartCount(updatedCart.length);
            } catch (error) {
                toast.error("Failed to remove item from cart");
            }
        } else {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart = cart.filter((item) => item.id !== id);

            localStorage.setItem("cart", JSON.stringify(cart));
            toast.success("Item removed from cart");
            setCartItems(cart);
            setCartCount(cart.length);
        }
    };
    return (
        <CartContext.Provider
            value={{
                cartCount,
                setCartCount,
                fetchCartCount,
                addToCart,
                handleBuyNow,
                increaseQty,
                fetchCartItems,
                cartItems,
                decreaseQty,
                removeItem,
                loading,
                setLoading,
                cartTotal,
                setCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
