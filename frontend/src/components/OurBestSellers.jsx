import React, { useEffect, useRef, useState } from "react";
import { ourBestSellersStyles as styles } from "../assets/dummystyles";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { bgColors, obsbooks } from "../assets/dummydata";
import { useCart } from "../CartContext/CartContext";
import axios from "axios";

const API_BASE = "http://localhost:4000";

const OurBestSellers = () => {
  const scrollRef = useRef(null);
  const { cart, addToCart, updateCartItem } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inCart = (id) => cart?.items.some((item) => item.id === id);
  const getQty = (id) =>
    cart?.items.find((item) => item.id === id)?.quantity || 0;

  // FETCH BOOKS FROM SERVER

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/book`);
        setBooks(Array.isArray(res.data) ? res.data : res.data.books || []);
      } catch (err) {
        console.error("Error fetching best books", err);
        setError(err.message || "Failed to fetch Books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleAdd = (book) => {
    addToCart({
      id: book._id,
      title: book.title,
      price: book.price,
      quantity: 1,
    });
  };

  const handleInc = (id) => updateCartItem({ id, quantity: getQty(id) + 1 });
  const handleDec = (id) => updateCartItem({ id, quantity: getQty(id) - 1 });

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

  if (loading)
    return <div className={styles.loading}>Loading Best Sellers...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerWrapper}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              <span className={styles.gradientText}>Curated Excellence</span>
            </h1>
            <p className={styles.subtitle}>Top Rated by Our Readers</p>
          </div>
          {/* BTN FOR MOVING LEFT TO RIGHT */}
          <div className={styles.navWrapper}>
            <div className={styles.navLine} />
            <div className={styles.navButtons}>
              <button onClick={scrollLeft} className={styles.navBtn}>
                <ChevronLeft className={styles.navIcon} size={20} />
              </button>
              <button onClick={scrollRight} className={styles.navBtn}>
                <ChevronRight className={styles.navIcon} size={20} />
              </button>
            </div>
          </div>
        </div>
        {/* BOOKS SECTIONS */}
        <div className={styles.scrollContainer} ref={scrollRef}>
          {books.map((book, index) => (
            <div
              className={styles.card(bgColors[index % bgColors.length])}
              key={book._id}
            >
              <div className={styles.cardInner}>
                <div className="space-y-3 md:space-y-4">
                  <div className={styles.stars}>
                    {[
                      [...Array(Math.floor(book.rating || 0))].map((_, i) => (
                        <Star
                          className="h-4 w-4 md:h-5 md:w-5 text-amber-400
                        fill-amber-400"
                          key={i}
                        />
                      )),
                    ]}
                  </div>
                  <div className={styles.bookInfo}>
                    <h2 className={styles.bookTitle}>{book.title}</h2>
                    <p className={styles.bookAuthor}>{book.author}</p>
                  </div>
                  <p className={styles.bookDesc}>{book.description}</p>
                </div>
                {/* ADD CONTROLS LIKE ADDTOCART */}
                <div className={styles.cartControls}>
                  <div className={styles.priceQtyWrapper}>
                    <span className={styles.price}>
                      Ksh.{book.price.toFixed(2)}
                    </span>
                    {inCart(book._id) ? (
                      <div className={styles.qtyWrapper}>
                        <button
                          onClick={() => handleDec(book._id)}
                          className={styles.qtyBtn}
                        >
                          <Minus size={18} />
                        </button>
                        <span className={styles.qtyText}>
                          {getQty(book._id)}
                        </span>
                        <button
                          onClick={() => handleInc(book._id)}
                          className={styles.qtyBtn}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(book)}
                        className={styles.addButton}
                      >
                        <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                        <span>Add to Collection</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <img
                src={
                  book.image?.startsWith("http")
                    ? book.image
                    : `${API_BASE}/${book.image}`
                }
                alt={book.title}
                className={styles.bookImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBestSellers;
