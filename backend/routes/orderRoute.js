import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  confirmPayment,
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

//PROTECTED ROUTES
orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/confirm", authMiddleware, confirmPayment);

// PUBLIC ROUTES
orderRouter.get("/", getOrders);
orderRouter.get("/user", authMiddleware, getUserOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
