import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function OrdersList() {

  const [orders, setOrders] = useState([]); // ✅ array default
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const res = await api.get('/order-list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(res.data.data);
      console.log(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);



  return (
    <div className="container mt-4">
  <div className="row justify-content-center">
    <div className="col-lg-9">

      {/* Header */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h3 className="fw-bold mb-1">My Orders</h3>
          {/* <p className="text-muted mb-0">Track, return or buy things again</p> */}
        </div>
      </div>

      {/* Orders */}
      {orders.map((order) => (
        <div key={order.order_id} className="card mb-4 border-0 shadow-sm rounded-3">

          {/* Top bar */}
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">ORDER ID</small><br />
              <strong>{order.order_id}</strong>
            </div>

            <div>
              <small className="text-muted">DATE</small><br />
              <strong>{order.date}</strong>
            </div>

            <div>
              <small className="text-muted">TOTAL</small><br />
              <strong>₹ {order.total}</strong>
            </div>

            <div>
              <span className={`badge px-3 py-2 ${
                order.status === 'Delivered' ? 'bg-success' :
                order.status === 'Processing' ? 'bg-warning text-dark' :
                'bg-secondary'
              }`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="card-body">

            {/* Items */}
            <div className="mb-3">
              <strong>Items:</strong>
              <div className="text-muted mt-1">
                {order.items.join(', ')}
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-between align-items-center">

              <div>
                <button className="btn btn-primary btn-sm">
                  View Details
                </button>

                <button style={{ marginTop:"5px" }} className="btn btn-outline-secondary btn-sm ">
                  Track Order
                </button>
              </div>

              <div>
                <button className="btn btn-link text-decoration-none">
                  Buy Again
                </button>
              </div>

            </div>

          </div>

        </div>
      ))}

    </div>
  </div>
</div>  
  );
}
