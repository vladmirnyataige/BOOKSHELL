// import React, { useState } from "react";
// import { styles } from "../assets/dummyStyles";
// import axios from "axios";
// import { BookPlus, Star } from "lucide-react";

// const initialFormData = {
//   title: "",
//   author: "",
//   price: "",
//   image: null,
//   rating: 4,
//   category: "Fiction",
//   description: "",
//   preview: "",
// };

// const categories = [
//   "Fiction",
//   "Non-Fiction",
//   "Mystery",
//   "Sci-Fi",
//   "Biography",
//   "Self-Help",
//   "Thriller",
// ];
// const API_BASE = "http://localhost:4000"; // ✅ removed trailing slash

// const Addbook = () => {
//   const [formData, setformData] = useState(initialFormData);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: null, text: null });

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // ✅ fixed comma
//     setLoading(true);
//     setMessage({ type: null, text: null });

//     const payload = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key !== "preview" && value !== null) payload.append(key, value);
//     });

//     try {
//       await axios.post(`${API_BASE}/api/book`, payload); // ✅ no double slash
//       setMessage({ type: "success", text: "Book added successfully" });
//       setformData(initialFormData);
//     } catch (err) {
//       console.error("Addbook error respond:", err.response?.data, err);
//       setMessage({
//         type: "error",
//         text: err.response?.data?.message || "failed to add book",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData((prev) => ({ ...prev, [name]: value }));
//   };

//   // IMAGE HANDLING
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setformData((prev) => ({
//       ...prev,
//       image: file,
//       preview: URL.createObjectURL(file),
//     }));
//   };

//   // STARS RATING HANDLER
//   const handleStarClick = (rating) => {
//     setformData((prev) => ({ ...prev, rating }));
//   };

//   return (
//     <div className={styles.addBooksPage}>
//       <div className={styles.addBooksContainer}>
//         <div className={styles.headerContainer}>
//           <div>
//             <h1 className={styles.headerTitle}>Add New Books</h1>
//             <p className={styles.headerSubtitle}>
//               Fill in the details to Add a new book to your store.
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* FORM   */}
//       <form onSubmit={handleSubmit} className={styles.formContainer}>
//         <div className={styles.formGrid}>
//           {/* Book Title */}
//           <div className={styles.formItem}>
//             <label className={styles.formLabel}>Book Title</label>
//             <input
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className={styles.formInput}
//               placeholder="Enter book Title"
//               required
//             />
//           </div>

//           {/* Author */}
//           <div className={styles.formItem}>
//             <label className={styles.formLabel}>Author</label>
//             <input
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               className={styles.formInput}
//               placeholder="Enter Author Name"
//               required
//             />
//           </div>

//           {/* Price */}
//           <div className={styles.formItem}>
//             <label className={styles.formLabel}>Price (KES)</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className={styles.formInput}
//               placeholder="Enter price"
//               required
//             />
//           </div>

//           {/* Rating */}
//           <div className={styles.formItem}>
//             <label className={styles.formLabel}>Rating</label>
//             <div className={styles.ratingContainer}>
//               <div className={styles.starsContainer}>
//                 {[1, 2, 3, 4, 5].map((starValue) => (
//                   <button
//                     key={starValue}
//                     type="button"
//                     onClick={() => handleStarClick(starValue)}
//                     onMouseEnter={() => setHoverRating(starValue)}
//                     onMouseLeave={() => setHoverRating(0)}
//                     aria-label={`Rate ${starValue} star${
//                       starValue !== 1 ? "s" : ""
//                     }`}
//                   >
//                     <Star
//                       className={`w-5 h-5 ${
//                         (hoverRating || formData.rating) >= starValue
//                           ? styles.starFilled
//                           : styles.starEmpty
//                       }`}
//                     />
//                   </button>
//                 ))}
//               </div>
//               <p className={styles.ratingText}>
//                 {formData.rating} star{formData.rating !== 1 ? "s" : ""}
//               </p>
//             </div>
//           </div>

//           {/* Category */}
//           <div className={styles.formItem}>
//             <label className={styles.formLabel}>Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className={styles.formInput}
//             >
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Cover Image */}
//           <div className={styles.formItem}>
//             <label className={styles.formLabel}>Cover Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className={styles.formInput}
//             />
//           </div>

//           {/* Description */}
//           <div className={`${styles.formItem} md:col-span-2`}>
//             <label className={styles.formLabel}>Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="4"
//               className={styles.formTextarea}
//               placeholder="Enter book Description"
//             ></textarea>
//           </div>
//         </div>

//         {/* Image Preview */}
//         {formData.preview && (
//           <div className={styles.previewContainer}>
//             <h3 className={styles.previewTitle}>Cover Preview</h3>
//             <div className={styles.previewImage}>
//               <img
//                 src={formData.preview}
//                 alt="image"
//                 className={styles.previewImg}
//               />
//             </div>
//           </div>
//         )}

//         {/* ✅ Fixed Tailwind dynamic class */}
//         {message.text && (
//           <p
//             className={`mt-2 text-center ${
//               message.type === "success" ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {message.text}
//           </p>
//         )}

//         {/* Submit */}
//         <div className={styles.submitContainer}>
//           <button
//             disabled={loading}
//             type="submit"
//             className={styles.submitButton}
//           >
//             <BookPlus className="h-5 w-5" />
//             <span>{loading ? "Adding Book..." : "Add Book to Collection"}</span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Addbook;
import React, { useState } from "react";
import { styles } from "../assets/dummyStyles";
import axios from "axios";
import { BookPlus, Star } from "lucide-react";

const initialFormData = {
  title: "",
  author: "",
  price: "",
  image: null,
  rating: 4,
  category: "Fiction",
  description: "",
  preview: "",
};

const categories = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Sci-Fi",
  "Biography",
  "Self-Help",
  "Thriller",
];
const API_BASE = "https://admin-bookshell.vercel.app"; // ✅ removed trailing slash

const Addbook = () => {
  const [formData, setformData] = useState(initialFormData);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null, text: null });

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "preview" && value !== null) payload.append(key, value);
    });

    try {
      await axios.post(`${API_BASE}/api/book`, payload);
      setMessage({ type: "success", text: "Book added successfully" });
      setformData(initialFormData); // ✅ clears inputs + preview
    } catch (err) {
      console.error("Addbook error respond:", err.response?.data, err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "failed to add book",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE HANDLING
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setformData((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  // STARS RATING HANDLER
  const handleStarClick = (rating) => {
    setformData((prev) => ({ ...prev, rating }));
  };

  return (
    <div className={styles.addBooksPage}>
      <div className={styles.addBooksContainer}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <div>
            <h1 className={styles.headerTitle}>Add New Book</h1>
            <p className={styles.headerSubtitle}>
              Fill in the details to add a new book to your store.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGrid}>
            {/* Book Title */}
            <div className={styles.formItem}>
              <label className={styles.formLabel}>Book Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Enter book title"
                required
              />
            </div>

            {/* Author */}
            <div className={styles.formItem}>
              <label className={styles.formLabel}>Author</label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Enter author name"
                required
              />
            </div>

            {/* Price */}
            <div className={styles.formItem}>
              <label className={styles.formLabel}>Price (KES)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Enter price"
                required
              />
            </div>

            {/* Rating */}
            <div className={styles.formItem}>
              <label className={styles.formLabel}>Rating</label>
              <div className={styles.ratingContainer}>
                <div className={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => handleStarClick(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${starValue} star${
                        starValue !== 1 ? "s" : ""
                      }`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (hoverRating || formData.rating) >= starValue
                            ? styles.starFilled
                            : styles.starEmpty
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p>
                  {formData.rating} Star{formData.rating !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className={styles.formItem}>
              <label className={styles.formLabel}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.formInput}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover Image */}
            <div className={styles.formItem}>
              <label className={styles.formLabel}>Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.formInput}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={styles.formLabel}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={styles.formTextarea}
                placeholder="Enter book description"
              />
            </div>
            {/* ✅ Preview Below Description */}
            {formData.preview && (
              <div className="md:col-span-2 mt-4">
                <img
                  src={formData.preview}
                  alt="Cover Preview"
                  className="w-32 h-44 object-cover rounded-lg shadow"
                />
              </div>
            )}
          </div>

          {/* Success / Error Message */}
          {message.text && (
            <p
              className={`mt-4 text-center ${
                message.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}

          {/* Submit */}
          <div className={styles.submitContainer}>
            <button
              disabled={loading}
              type="submit"
              className={styles.submitButton}
            >
              <BookPlus className="h-5 w-5" />
              <span>
                {loading ? "Adding Book..." : "Add Book to Collection"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addbook;
