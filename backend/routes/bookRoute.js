import express from "express";
import {
  createBook,
  deleteBook,
  getBooks,
} from "../controllers/bookController.js";
import upload from "../middleware/upload.js";

const bookRouter = express.Router();

// Upload directly to Cloudinary
bookRouter.post("/", upload.single("image"), createBook);
bookRouter.get("/", getBooks);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
