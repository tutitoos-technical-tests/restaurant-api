import { Router } from "express";
import { getOrders, getOrderById, createOrder } from "../../controllers/orderControllers/orderControllers.js";
import routes from "../routes.js";

const orderRouter = Router();
const { list, item, newItem } = routes.order;

orderRouter.get(list, getOrders);
orderRouter.get(item, getOrderById);
orderRouter.put(newItem, createOrder);

export default orderRouter;
