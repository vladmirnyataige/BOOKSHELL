// import mongoose from "mongoose";

// export const connectDB = async () => {
//   await mongoose
//     .connect(
//       "mongodb+srv://vladmirnyataige_db_user:zOrnCeCu3HspSg9a@cluster0.xfwgb0d.mongodb.net/Bookseller"
//     )
//     .then(() => console.log("DB CONNECTED"));
// };
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vladmirnyataige_db_user:zOrnCeCu3HspSg9a@cluster0.xfwgb0d.mongodb.net/Bookseller"
    );
    console.log("DB CONNECTED");
  } catch (error) {
    // ⬅️ BUG FIX: Added error handling to prevent silent crash
    console.error("DB CONNECTION FAILED:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};
