// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const VerifyPayment = () => {
//   const [statusMsg, setStatusMsg] = useState("Veryfying Payement...");
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const session_id = searchParams.get("session_id");
//   const token = localStorage.getItem("authToken");
//   const apiBase = "http://localhost:4000";

//   useEffect(() => {
//     if (!session_id) {
//       setStatusMsg("session id is Missing.");
//       return;
//     }
//     axios
//       .get(`${apiBase}/api/order/confirm`, {
//         params: { session_id },
//         headers: token ? { Authorization: `Bearer ${token}` } : "",
//       })
//       .then(() => {
//         setStatusMsg("Payment Confirmed Redirecting to your orders...");
//         setTimeout(() => navigate("/orders", { replace: true }), timeout), 2000;
//       })
//       .catch((err) => {
//         console.error("Confirmation error:", err);
//         setStatusMsg(
//           err.response?.data?.message ||
//             "Error Confirming payment. Please Contact Support"
//         );
//       });
//   }, [session_id, apiBase, navigate, token]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//       <p className="text-lg">{statusMsg}</p>
//     </div>
//   );
// };

// export default VerifyPayment;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyPayment = () => {
  const [statusMsg, setStatusMsg] = useState("Verifying Payment...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const session_id = searchParams.get("session_id");
  const token = localStorage.getItem("authToken");
  const apiBase = "http://localhost:4000";

  //   useEffect(() => {
  //     if (!session_id) {
  //       setStatusMsg("Session ID is missing.");
  //       return;
  //     }

  //     const confirmPayment = async () => {
  //       try {
  //         const headers = token ? { Authorization: `Bearer ${token}` } : {};
  //         await axios.get(`${apiBase}/api/order/confirm`, {
  //           params: { session_id },
  //           headers,
  //         });

  //         setStatusMsg("Payment confirmed! Redirecting to your orders...");
  //         setTimeout(() => navigate("/orders", { replace: true }), 2000);
  //       } catch (err) {
  //         console.error("Confirmation error:", err);
  //         setStatusMsg(
  //           err.response?.data?.message ||
  //             "Error confirming payment. Please contact support."
  //         );
  //       }
  //     };

  //     confirmPayment();
  //   }, [session_id, apiBase, navigate, token]);
  useEffect(() => {
    if (!session_id) {
      setStatusMsg("Session ID is missing.");
      return;
    }

    axios
      .get(`${apiBase}/api/order/confirm`, {
        params: { session_id },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then(() => {
        // Payment confirmed, redirect immediately
        navigate("/orders", { replace: true });
      })
      .catch((err) => {
        console.error("Confirmation error:", err);
        setStatusMsg(
          err.response?.data?.message ||
            "Error confirming payment. Please contact support."
        );
      });
  }, [session_id, apiBase, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p className="text-lg">{statusMsg}</p>
    </div>
  );
};

export default VerifyPayment;
