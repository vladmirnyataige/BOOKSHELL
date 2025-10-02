// import Book from "../models/bookModel.js";
// import fs from "fs";
// import path from "path";
// //CREATE BOOK FUNCTION
// export const createBook = async (req, res, next) => {
//   try {
//     const filename = req.file?.filename ?? null;
//     const imagePath = filename ? `uploads/${filename}` : null;
//     const { title, author, price, rating, category, description } = req.body;
//     const book = new Book({
//       title,
//       author,
//       price,
//       rating,
//       category,
//       description,
//       image: imagePath,
//     });
//     const saved = await book.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     next(err);
//   }
// };

// // GET BOOKS
// export const getBooks = async (req, res, next) => {
//   try {
//     const books = await Book.find().sort({ createdAt: -1 });
//     res.json(books);
//   } catch (err) {
//     next(err);
//   }
// };
// // DELETE A BOOK
// export const deleteBook = async (req, res, next) => {
//   try {
//     const book = await Book.findByIdAndDelete(req.params.id);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found." });
//     }
//     // IMAGE HANDLER
//     if (book.image) {
//       const filePath = path.join(process.cwd(), book.image);
//       fs.unlink(filePath, (err) => {
//         if (err) console.warn("Failed to delete the image.", err);
//       });
//     }
//     res.json({ message: "Book deleted successfully." });
//   } catch (err) {
//     next(err);
//   }
// };
import Book from "../models/bookModel.js";
import { v2 as cloudinary } from "cloudinary";

// CREATE BOOK
export const createBook = async (req, res, next) => {
  try {
    const { title, author, price, rating, category, description } = req.body;

    // Cloudinary URL from multer-storage-cloudinary
    const imageUrl = req.file?.path || null;
    const publicId = req.file?.filename || null; // Cloudinary assigns a public_id (optional to store)

    const book = new Book({
      title,
      author,
      price,
      rating,
      category,
      description,
      image: imageUrl, // ✅ hosted URL
      imagePublicId: publicId, // ✅ save public_id for deletion
    });

    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// GET BOOKS
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
};

// DELETE BOOK
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    // If Cloudinary image exists → delete it
    if (book.imagePublicId) {
      await cloudinary.uploader.destroy(book.imagePublicId);
    }

    res.json({ message: "Book deleted successfully." });
  } catch (err) {
    next(err);
  }
};
