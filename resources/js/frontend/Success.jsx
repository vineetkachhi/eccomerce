import { useNavigate,useLocation,useSearchParams  } from "react-router-dom";
import React,{useEffect,setState} from "react";

export default function Success() {
const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
 const navigate = useNavigate();
 

  return (
     <section style={{marginTop:"10px",marginLeft:"33%"}}>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          
        <div className="card text-center shadow p-4" style={{ maxWidth: "400px", borderRadius: "15px", width: "100%" }}>
          
          <div style={{ fontSize: "60px", color: "green" }}>
            ✓
          </div>

          <h2 className="mt-3 text-success">Payment Successful</h2>

          <p className="text-muted">
            Your payment has been processed successfully. Order ID: <strong>{orderId}</strong>
            <br />
            Thank you for your purchase!
          </p>

          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={() => navigate("/user/dashboard")}>
              Go to Dashboard
            </button>

            <button style={{marginTop:"10px"}} className="btn btn-outline-secondary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>

        </div>
      </div>
      </section>
   
  );
};

