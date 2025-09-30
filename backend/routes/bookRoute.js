import express from "express";
import multer from "multer";
import {
  createBook,
  deleteBook,
  getBooks,
} from "../controllers/bookController.js";

const bookRouter = express.Router();

//MULTER SETUP
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

bookRouter.post("/", upload.single("image"), createBook);
bookRouter.get("/", getBooks);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
