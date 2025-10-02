// import mongoose from "mongoose";

// const bookSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     image: {
//       type: String,
//       required: false,
//     },
//     rating: {
//       type: Number,
//       default: 4,
//       min: 1,
//       max: 5,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Book = mongoose.model("Book", bookSchema);

// export default Book;
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String, // Cloudinary URL (secure URL for frontend)
      required: false,
    },
    imagePublicId: {
      type: String, // Cloudinary public_id (used for deleting from Cloudinary)
      required: false,
    },
    rating: {
      type: Number,
      default: 4,
      min: 1,
      max: 5,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
