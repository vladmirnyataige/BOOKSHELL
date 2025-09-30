// import React, { useEffect } from "react";
// import { styles } from "../assets/dummystyles";
// import {
//   ArrowRight,
//   BookOpen,
//   Minus,
//   Plus,
//   ShoppingBag,
//   Trash,
// } from "lucide-react";
// import { useCart } from "../CartContext/CartContext";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const { cart, dispatch } = useCart();
//   const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const getImageSource = (item) => {
//     if (typeof item.image === "string") return item.image;
//     return item.image?.default;
//   };

//   //INCREASING DECREASING AND REMOVE

//   const inc = (item) =>
//     dispatch({
//       type: "INCREMENT",
//       payload: { id: item.id, source: item.source },
//     });

//   const dec = (item) =>
//     dispatch({
//       type: "DECREMENT",
//       payload: { id: item.id, source: item.source },
//     });

//   const remove = (item) =>
//     dispatch({
//       type: "REMOVE_ITEM",
//       payload: { id: item.id, source: item.source },
//     });

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <div className={styles.header}>
//           <h1 className={styles.title}>
//             <ShoppingBag className={styles.titleIcon} />
//             shopping Cart
//           </h1>
//           <p className={styles.subtitle}>
//             {cart.items.length} item {cart.items.length !== 1 && "s"} in your
//             cart
//           </p>
//         </div>
//         {cart.items.length === 0 ? (
//           <div className={styles.emptyCard}>
//             <div className={styles.emptyIconWrapper}>
//               <ShoppingBag className={styles.emptyIcon} />
//             </div>
//             <h2 className={styles.emptyTitle}>Your Cart Feels Empty</h2>
//             <p className={styles.emptyDescription}>
//               Discover our collection of premium books and start ypur reading
//               journey.
//             </p>
//             <Link to="/books" className={styles.browseBtn}>
//               <BookOpen className={styles.browseIcon} />
//               Browse Collections
//             </Link>
//           </div>
//         ) : (
//           <div className={styles.cartGrid}>
//             <div className={styles.cartItems}>
//               {cart.items.map((item) => (
//                 <div
//                   key={`${item.source}-${item.id}`}
//                   className={styles.cartItemCard}
//                 >
//                   <div className={styles.cartItemContent}>
//                     <img
//                       src={getImageSource(item)}
//                       alt={item.title}
//                       className={styles.cartItemImage}
//                     />
//                     <div className="flex-1">
//                       <div className={styles.cartItemTop}>
//                         <div>
//                           <h3 className={styles.itemTitle}>{item.title}</h3>
//                           <p className={styles.itemAuthor}>{item.author}</p>
//                         </div>
//                         <button
//                           onClick={() => remove(item)}
//                           className={styles.removeBtn}
//                         >
//                           <Trash className={styles.removeIcon} />
//                         </button>
//                       </div>

//                       <div className={styles.quantityPriceWrapper}>
//                         <div className={styles.quantityControls}>
//                           <div className={styles.quantityBox}>
//                             <button
//                               onClick={() => dec(item)}
//                               className={styles.qBtn}
//                             >
//                               <Minus className={styles.qIcon} />
//                             </button>
//                             <span className={styles.quantityValue}>
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() => inc(item)}
//                               className={styles.qBtn}
//                             >
//                               <Plus className={styles.qIcon} />
//                             </button>
//                           </div>
//                           <span className={styles.itemTotal}>
//                             Ksh. {(item.price * item.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                         <span className={styles.pricePerItem}>
//                           Ksh.{item.price.toFixed(2)} each
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className={styles.summaryCard}>
//               <h2 className={styles.summaryTitle}>Order Summary</h2>
//               <div className={styles.summaryBreakdown}>
//                 <div className={styles.summaryRow}>
//                   <span className={styles.summaryLabel}>
//                     Subtotal({cart.items.length} items)
//                   </span>
//                   <span className={styles.summaryValue}>
//                     Ksh.{total.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className={styles.summaryRow}>
//                   <span className={styles.summaryLabel}>Shipping</span>
//                   <span className={styles.summaryShipping}>Free</span>
//                 </div>

//                 <div className={styles.summaryRow}>
//                   <span className={styles.summaryLabel}>Taxes</span>
//                   <span className={styles.summaryValue}>
//                     Calculated at checkout
//                   </span>
//                 </div>
//               </div>

//               <div className={styles.summaryTotalSection}>
//                 <div className={styles.totalRow}>
//                   <span className={styles.summaryLabel}>Total</span>
//                   <span className={styles.totalAmount}>
//                     Ksh.{total.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//               <button className={styles.checkoutBtn}>
//                 Checkout Now
//                 <ArrowRight className={styles.checkoutIcon} />
//               </button>
//               <Link to="/books" className={styles.continueBtn}>
//                 <BookOpen className={styles.continueIcon} />
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;
import { loginStyles } from "../assets/dummystyles";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Mail,
  Minus,
  Pen,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "../CartContext/CartContext";
import { data, Link } from "react-router-dom";
import { styles } from "../assets/dummystyles";
import jsPDF from "jspdf";
import axios from "axios";

const API_BASE = "http://localhost:4000/api";
const IMG_BASE = API_BASE.replace("/api", "/");

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    axios
      .get(`${API_BASE}/book`)
      .then(({ data }) => {
        const map = {};
        data.forEach((book) => {
          map[book._id] = book.image;
        });
        console.log("images keys map:", Object.keys(map));
        setImages(map);
      })
      .catch((err) => console.error("Failed to load books:", err));
  }, []);
  const getImageSrc = (item) => {
    const relPath = images[item.id];
    if (relPath) {
      return `${IMG_BASE}${relPath}`;
    }
  };

  // INCREASING, DECREASING, REMOVE
  const inc = (item) =>
    updateCartItem({
      id: item.id,
      source: item.source,
      quantity: item.quantity + 1,
    });

  const dec = (item) => {
    const newQty = item.quantity - 1;
    if (newQty > 0) {
      updateCartItem({
        id: item.id,
        source: item.source,
        quantity: newQty,
      });
    } else {
      removeFromCart({
        id: item.id,
        source: item.source,
      });
    }
  };

  const remove = (item) => removeFromCart({ id: item.id, source: item.source });

  // WHATSAPP CHECKOUT
  const handleCheckout = () => {
    if (!name || !phone || !address) {
      alert("Please fill in all your details before checkout.");
      return;
    }

    const orderDetails = cart.items
      .map(
        (item, index) =>
          `${index + 1}. ${item.title} (x${item.quantity}) – Ksh.${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const message = `Hello, I'd love to place an order with you.\n\nHere are my details:\n- Name: ${name}\n- Phone: ${phone}\n- Address: ${address}\n\nHere’s what I’d like to get:\n${orderDetails}\n\nTotal: Ksh.${total.toFixed(
      2
    )}\n\nLooking forward to your confirmation. Thank you!`;

    const whatsappURL = `https://wa.me/254743838167?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  // DOWNLOAD PDF
  const downloadPDF = () => {
    if (!name || !phone || !address) {
      alert("Please fill in all your details before downloading the PDF.");
      return;
    }

    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`Bookshell Order`, 105, 15, { align: "center" });

    // Customer Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Order by: ${name}`, 14, 30);
    doc.text(`Phone: ${phone}`, 14, 38);
    doc.text(`Address: ${address}`, 14, 46);

    // Divider
    doc.setLineWidth(0.5);
    doc.line(14, 50, 196, 50);

    // Items
    doc.setFont("helvetica", "bold");
    doc.text("Items Ordered:", 14, 58);
    doc.setFont("helvetica", "normal");
    let y = 65;
    cart.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.title} (x${item.quantity}) – Ksh.${(
          item.price * item.quantity
        ).toFixed(2)}`,
        16,
        y
      );
      y += 7;
    });

    // Divider
    doc.line(14, y, 196, y);
    y += 5;

    // Total
    doc.setFont("helvetica", "bold");
    doc.text(`Total: Ksh.${total.toFixed(2)}`, 14, y);

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Thank you for shopping with Bookshell!", 105, y + 10, {
      align: "center",
    });

    // Save PDF
    doc.save(`Order_by_${name.replace(/ /g, "_")}.pdf`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <ShoppingBag className={styles.titleIcon} />
            Shopping Cart
          </h1>
          <p className={styles.subtitle}>
            {cart.items.length} item{cart.items.length !== 1 && "s"} in your
            cart
          </p>
        </div>

        {cart.items.length === 0 ? (
          <div className={styles.emptyCard}>
            <div className={styles.emptyIconWrapper}>
              <ShoppingBag className={styles.emptyIcon} />
            </div>
            <h2 className={styles.emptyTitle}>Your Cart Feels Empty</h2>
            <p className={styles.emptyDescription}>
              Discover our collection of premium books and start your reading
              journey.
            </p>
            <Link to="/books" className={styles.browseBtn}>
              <BookOpen className={styles.browseIcon} />
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            {/* Cart Items */}
            <div className={styles.cartItems}>
              {cart.items.map((item) => (
                <div
                  key={`${item.source}-${item.id}`}
                  className={styles.cartItemCard}
                >
                  <div className={styles.cartItemContent}>
                    <img
                      src={getImageSrc(item)}
                      alt={item.title}
                      className={styles.cartItemImage}
                    />
                    <div className="flex-1">
                      <div className={styles.cartItemTop}>
                        <div>
                          <h3 className={styles.itemTitle}>{item.title}</h3>
                          <p className={styles.itemAuthor}>{item.author}</p>
                        </div>
                        <button
                          onClick={() => remove(item)}
                          className={styles.removeBtn}
                        >
                          <Trash2 className={styles.removeIcon} />
                        </button>
                      </div>

                      {/* Quantity + Price */}
                      <div className={styles.quantityPriceWrapper}>
                        <div className={styles.quantityControls}>
                          <div className={styles.quantityBox}>
                            <button
                              onClick={() => dec(item)}
                              className={styles.qBtn}
                            >
                              <Minus className={styles.qIcon} />
                            </button>
                            <span className={styles.quantityValue}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => inc(item)}
                              className={styles.qBtn}
                            >
                              <Plus className={styles.qIcon} />
                            </button>
                          </div>
                          <span className={styles.itemTotal}>
                            Ksh. {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <span className={styles.pricePerItem}>
                          Ksh.{item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Checkout */}
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryBreakdown}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>
                    Subtotal ({cart.items.length} items)
                  </span>
                  <span className={styles.summaryValue}>
                    Ksh.{total.toFixed(2)}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Shipping</span>
                  <span className={styles.summaryShipping}>Free</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Taxes</span>
                  <span className={styles.summaryValue}>
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className={styles.summaryTotalSection}>
                <div className={styles.totalRow}>
                  <span className={styles.summaryLabel}>Total</span>
                  <span className={styles.totalAmount}>
                    Ksh.{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              {/* Checkout Form */}
              <div className="mt-4 space-y-3">
                {/* Name Field */}
                <div>
                  <label className={loginStyles.label}>Name</label>
                  <div className={loginStyles.inputWrapper}>
                    <Pen className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={loginStyles.input}
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className={loginStyles.label}>Phone</label>
                  <div className={loginStyles.inputWrapper}>
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={loginStyles.input}
                    />
                  </div>
                </div>

                {/* Email / Address Field */}
                <div>
                  <label className={loginStyles.label}>Email / Address</label>
                  <div className={loginStyles.inputWrapper}>
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={loginStyles.input}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button onClick={handleCheckout} className={styles.checkoutBtn}>
                  Checkout via WhatsApp
                  <ArrowRight className={styles.checkoutIcon} />
                </button>
                <Link to="/checkout" className={styles.checkoutBtn}>
                  Checkout
                  <ArrowRight className={styles.checkoutIcon} />
                </Link>
                <button onClick={downloadPDF} className={styles.continueBtn}>
                  Download Invoice of Order
                  <BookOpen className={styles.continueIcon} />
                </button>
                <Link to="/books" className={styles.continueBtn}>
                  <BookOpen className={styles.continueIcon} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
