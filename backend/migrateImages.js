import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Book from "./models/bookModel.js";
import cloudinary from "./utils/cloudinary.js"; // your existing Cloudinary setup
import dotenv from "dotenv";
dotenv.config();

// ====== CONFIG ======
const MONGO_URI = process.env.MONGO_URI;
const UPLOADS_DIR = path.join(process.cwd(), "uploads"); // local folder where old images are
// ===================

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const migrateImages = async () => {
  try {
    const books = await Book.find({});

    for (const book of books) {
      if (!book.image) continue; // skip if no image
      if (book.image.startsWith("http")) continue; // skip if already a URL

      const localImagePath = path.join(UPLOADS_DIR, path.basename(book.image));

      if (!fs.existsSync(localImagePath)) {
        console.warn(`File not found: ${localImagePath}`);
        continue;
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(localImagePath, {
        folder: "books",
      });

      // Update book with Cloudinary URL
      book.image = result.secure_url;
      await book.save();

      console.log(`Migrated ${book.title} -> ${result.secure_url}`);
    }

    console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  }
};

connectDB().then(migrateImages);
