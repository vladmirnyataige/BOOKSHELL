import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import bookRouter from "./routes/bookRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// ROUTES
app.use("/api/user", userRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/book", bookRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
