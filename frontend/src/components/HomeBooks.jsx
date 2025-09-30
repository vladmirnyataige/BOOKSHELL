import React, { useEffect, useState } from "react";
import { homeBooksStyles as styles } from "../assets/dummystyles";
import { useCart } from "../CartContext/CartContext";
import { hbbooks } from "../assets/dummydata";
import { ArrowRight, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://bookshell-6mg7.onrender.com";

const HomeBooks = () => {
  const { cart, addToCart, updateCartItem } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inCart = (id) => cart?.items.some((item) => item.id === id);
  const getQty = (id) =>
    cart?.items.find((item) => item.id === id)?.quantity || 0;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/book`);
        const list = Array.isArray(res.data) ? res.data : res.data.books || [];
        setBooks(list);
      } catch (err) {
        setError(err.message || "Failed to load Books ");
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

  if (loading) return <div className={styles.loading}>Loading Books...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className="text-center mb-12">
            <h2 className={styles.heading}>BookSeller Favourites</h2>
            <div className={styles.headingLine} />
          </div>
          <div className={styles.grid}>
            {books.map((book) => {
              const itemInCart = inCart(book._id);
              return (
                <div key={book._id} className={styles.bookCard}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={
                        book.image?.startsWith("http")
                          ? book.image
                          : `${API_BASE}/${book.image}`
                      }
                      alt={book.title}
                      className={styles.image}
                    />
                    <div className={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.rating || 0)
                              ? "text-[#43c6ac] fill-[#43c6ac]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className={styles.title}>{book.title}</h3>
                  <p className={styles.author}>{book.author}</p>
                  <span className={styles.actualPrice}>
                    Ksh.{book.price.toFixed(2)}
                  </span>

                  {itemInCart ? (
                    <div className={styles.qtyBox}>
                      <button
                        onClick={() => handleDec(book._id)}
                        className={styles.qtyBtn}
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="text-gray-700">{getQty(book._id)}</span>
                      <button
                        onClick={() => handleInc(book._id)}
                        className={styles.qtyBtn}
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleAdd(book);
                      }}
                      className={styles.addBtn}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.viewBtnWrapper}>
            <Link to="/books" className={styles.viewBtn}>
              <span>View All Books</span>
              <ArrowRight className={styles.viewIcon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBooks;
