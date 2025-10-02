import React, { useState, useMemo, useEffect } from "react";
import { ShoppingBag, Plus, Minus, Star, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { booksPageStyles as styles } from "../assets/dummystyles";

import { useCart } from "../CartContext/CartContext";
import axios from "axios";

const API_BASE = "https://bookshell-6mg7.onrender.com";

const Books = () => {
  const { cart, addToCart, updateCartItem } = useCart();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchFromURL = queryParams.get("search") || "";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(searchFromURL);
  const [sortBy, setSortBy] = useState("title");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/book`);
        const data = res.data;
        const list = Array.isArray(data) ? data : data.books || [];
        setBooks(list);
      } catch (err) {
        console.error("Error Loading Books", err);
        setError(err.message || "Failed to Load Books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const isInCart = (id) => cart.items?.some((item) => item.id === id);
  const getCartQuantity = (id) =>
    cart.items?.find((item) => item.id === id)?.quantity || 0;

  const handleAddToCart = (book) => {
    addToCart({
      id: book._id,
      title: book.title,
      price: book.price,
      quantity: 1,
    });
  };

  const handleIncrement = (id) =>
    updateCartItem({ id, quantity: getCartQuantity(id) + 1 });
  const handleDecrement = (id) =>
    updateCartItem({ id, quantity: getCartQuantity(id) - 1 });

  const categories = [
    "all",
    ...new Set(books.map((b) => b.category).filter(Boolean)),
  ];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchCategory =
        filterCategory === "all" || book.category === filterCategory;
      const lowerSearch = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        book.title.toLowerCase().includes(lowerSearch) ||
        book.author.toLowerCase().includes(lowerSearch);
      return matchCategory && matchSearch;
    });
  }, [books, searchTerm, filterCategory]);

  const sortedBooks = useMemo(() => {
    return [...filteredBooks].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.title.localeCompare(b.title, undefined, {
            sensitivity: "base",
            numeric: true,
          });
      }
    });
  }, [filteredBooks, sortBy]);

  if (loading)
    return <div className={styles.loading}>Loading Best Sellers...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.headerTitle}>Literary Universe</h1>
          <p className={styles.headerSubtitle}>
            Explore Our curated collection spanning genres and perspectives
          </p>
        </div>

        {/* Search & Filters */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchInputWrapper}>
            <div className={styles.searchIconWrapper}>
              <Search className="h-5 w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-[#43c6ac]" />
            </div>
            <input
              type="text"
              placeholder="Search Titles, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterRow}>
            <div className={styles.selectGroup}>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={styles.selectBox}
              >
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category === "all" ? "All Genres" : category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.selectBox}
              >
                <option value="title">Sort by Title</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className={styles.resultText}>
              Showing {sortedBooks.length} results
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className={styles.booksGrid}>
          {sortedBooks.map((book) => {
            const inCart = isInCart(book._id);
            const qty = getCartQuantity(book._id);

            return (
              <div key={book._id} className={styles.bookCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={
                      book.image?.startsWith("http")
                        ? book.image
                        : `${API_BASE}/${book.image}`
                    }
                    alt={`${book.title} by ${book.author}`}
                    className={styles.imageStyle}
                  />
                </div>

                <h3 className={styles.title}>{book.title}</h3>
                <p className={styles.author}>by {book.author}</p>

                {/* Ratings */}
                <div className={styles.ratingWrapper}>
                  {[
                    ...Array(
                      Number.isFinite(book.rating) ? Math.floor(book.rating) : 0
                    ),
                  ].map((_, index) => (
                    <Star
                      className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                      key={index}
                    />
                  ))}
                  <span>
                    (
                    {Number.isFinite(book.rating)
                      ? book.rating.toFixed(1)
                      : "N/A"}
                    )
                  </span>
                </div>

                <p className={styles.description}>{book.description}</p>

                {/* Price & Cart */}
                <div className={styles.priceCartWrapper}>
                  <span className={styles.price}>
                    Ksh.{book.price.toFixed(2)}
                  </span>
                  <div className={styles.cartButtons}>
                    {!inCart ? (
                      <button onClick={() => handleAddToCart(book)}>
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDecrement(book._id)}>
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span>{qty}</span>
                        <button onClick={() => handleIncrement(book._id)}>
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Books;
