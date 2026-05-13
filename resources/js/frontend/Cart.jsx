// Cart.jsx

import React, { useState,useEffect,useContext } from 'react';
import api from '../services/api';
import { CartContext } from '../services/CartContext';
export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');
  const { cartCount, setCartCount } = useContext(CartContext);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    
    if (token) {
      try {
        const res = await api.get('/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       // console.log(res.data);
        setCartItems(res.data.cart);
      } catch (error) {
        console.log(error);
      }
    }else {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(cart);
    }
  };

  const increaseQty = (id) => {
    if(token){
      api.post('/update-cart',
         { product_id: id, action: 'increment' },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
    }else{
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      cart = cart.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(cart));
    }
      alert('QTY increased');
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    if(token){
      api.post('/update-cart',
         { product_id: id, action: 'decrement' },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
    }else{
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      cart = cart.map(item =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    alert('QTY decreased');
    setCartItems(cartItems.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = async (id) => {

  const token = localStorage.getItem('token');

  if (token) {
    try {
      await api.post('/remove-cart',
        { product_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
        alert('Item removed from cart');
      setCartItems(cartItems.filter(item => item.id !== id));

    } catch (error) {
      console.log(error);
    }

  } else {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item removed from cart');
    setCartItems(cart);
  }
};

  const total = Array.isArray(cartItems)
 ? cartItems?.reduce((sum,item)=>sum + item.price * item.qty,0)
 : 0;

 const handleCheckout = () => {
  if(cartItems.length === 0){
    alert('Your cart is empty');
    return;
  }
  if(token){
    window.location.href = '/checkout';
  }else{
    alert('Please login to proceed to checkout');
    window.location.href = '/signup';
  }
}

  return (
    
    <section>
      <div style={{ margin: "20px 20px" }} className="row">
        
        {/* Left Side */}
        <div
          className="col-md-7 box-sz"
          style={{
            padding: "20px 30px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            marginRight: "20px",
            marginLeft: "35px",
            width: "58%",
          }}
        >
          <h3
            className="mid1-sz"
            style={{ fontWeight: 450, padding: "0px" }}
          >
            Shopping Cart
          </h3>
{cartItems?.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (cartItems?.length > 0 && cartItems.map(item => (
          <div
            className="box1-sz"
            style={{
              marginTop: "15px",
              padding: "15px 0px",
              borderTop: "1.5px solid #E2E5DE",
            }}
          >
            <div className="row">
              
              {/* Image */}
              <div
                className="col-md-4"
                style={{ width: "33%" }}
              >
                <img
                  className="img-sz"
                  style={{ height: "200px" }}
                  src={item.image_url} alt={item.name}
                />
              </div>

              {/* Product Details */}
              <div
                className="col-md-6"
                style={{
                  padding: "10px 0px",
                  width: "50%",
                }}
              >
                <h5
                  className="mid2-sz"
                  style={{ fontWeight: 500, margin: 0 }}
                >
                  {item.name}
                </h5>
                <p
                  className="mid3-sz"
                  style={{ color: "#058552", margin: 0 }}
                >
                  In Stock
                </p>
                 <p
                  className="mid3-sz"
                  style={{ color: "grey", margin: 0 }}
                >
                  Eligible for Free Shipping
                </p>

                <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    {/* Minus */}
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>

                    {/* Qty */}
                    <span>{item.qty}</span>

                    {/* Plus */}
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>

                    {/* Remove */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
              </div>

              {/* Price */}
              <div
                className="col-md-2"
                style={{
                  padding: "10px 0px",
                  width: "17%",
                }}
              >
                <h5
                  className="mid2-sz"
                  style={{
                    fontWeight: 500,
                    margin: 0,
                    float: "right",
                  }}
                >
                  <i className="fa fa-inr" aria-hidden="true"></i>
                  <span> {item.price}</span>
                </h5>
              </div>
              

            </div>
          </div>
          ))
          )}
        </div>

        {/* Right Side */}
        <div
          className="col-md-4"
          style={{ width: "36%" }}
        >
          <div
            className="box-sz"
            style={{
              padding: "20px 30px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <h3
              className="mid1-sz"
              style={{ fontWeight: 450, padding: 0 }}
            >
              Total Amount
            </h3>

            <div
              className="box1-sz"
              style={{
                marginTop: "15px",
                padding: "15px 0px",
                borderTop: "1.5px solid #E2E5DE",
              }}
            >
              <p
                className="mid3-sz"
                style={{ color: "#058552" }}
              >
                <i
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>{" "}
                Your order is eligible for FREE Delivery.
              </p>

              {/* Item Total */}
              <div>
                <h5
                  className="mid2-sz"
                  style={{
                    fontWeight: 500,
                    margin: 0,
                    float: "left",
                  }}
                >
                  Item Total:
                </h5>

                <h5
                  className="mid2-sz"
                  style={{
                    fontWeight: 400,
                    margin: 0,
                    float: "right",
                  }}
                >
                  <i className="fa fa-inr" aria-hidden="true"></i>
                  <span id="total">{total}</span>
                </h5>
              </div>

              <br />

              {/* Taxes */}
              <div
                className="df-sz"
                style={{ marginTop: "15px" }}
              >
                <h5
                  className="mid2-sz"
                  style={{
                    fontWeight: 500,
                    margin: 0,
                    float: "left",
                  }}
                >
                  Taxes & Charges:
                </h5>

                <h5
                  className="mid2-sz"
                  style={{
                    fontWeight: 400,
                    margin: 0,
                    float: "right",
                  }}
                >
                  <i className="fa fa-inr" aria-hidden="true"></i>
                  <span> 0</span>
                </h5>
              </div>

              <br />

              {/* To Pay */}
              <div
                className="box1-sz"
                style={{
                  marginTop: "15px",
                  padding: "15px 0px",
                  borderTop: "1.5px solid #E2E5DE",
                }}
              >
                <h5
                  className="mid2-sz"
                  style={{
                    fontWeight: 500,
                    margin: 0,
                    float: "left",
                  }}
                >
                  To Pay:
                </h5>

                <h5
                  className="mid2-sz"
                  style={{
                    fontWeight: 400,
                    margin: 0,
                    float: "right",
                  }}
                >
                  <i className="fa fa-inr" aria-hidden="true"></i>
                  <span id="totaltopay">{total}</span>
                </h5>
              </div>

              <br />

              {/* Button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={handleCheckout}
                  role="button"
                >
                  Proceed to Checkout
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
 
  );
}