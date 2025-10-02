// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/userRoute.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import bookRouter from "./routes/bookRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// const app = express();
// const port = 4000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // MIDDLEWARE

// // app.use(
// //   cors({
// //     origin: (origin, callback) => {
// //       const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
// //       if (!origin || allowedOrigins.includes(origin)) {
// //         callback(null, true);
// //       } else {
// //         callback(new Error("Not allowed by CORS"));
// //       }
// //     },
// //     credentials: true,
// //   })
// // );
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://bookshell-jade.vercel.app,  /\.vercel\.app$/  "];
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // DB
// connectDB();

// // ROUTES
// app.use("/api/user", userRouter);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/book", bookRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// app.get("/", (req, res) => {
//   res.send("API WORKING");
// });

// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);

import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import bookRouter from "./routes/bookRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS MIDDLEWARE
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bookshell-jade.vercel.app",
  /\.vercel\.app$/, // allow any Vercel preview URLs
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      // allow if origin is in allowedOrigins or matches regex
      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.some((o) => o instanceof RegExp && o.test(origin))
      ) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// ROUTES
app.use("/api/user", userRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/book", bookRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// });
