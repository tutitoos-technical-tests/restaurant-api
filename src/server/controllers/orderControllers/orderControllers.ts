import type { NextFunction, Request, Response } from "express";
import { mockOrderItems, mockOrders, mockPizzas, mockSalesmen } from "../../../mocks/mockOrder.js";
import CustomError from "../../../CustomError/CustomError.js";
import { Order } from "../../../types/types.js";
import generateId from "../../../utils/generateId.js";
import { OrderItemModel, OrderModel, PizzaModel, SalesmanModel } from "../../../database/models/index.js";

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderModel.findAll({
      attributes: ["id"],
    });
    const orderIds = orders.map((order) => order.dataValues.id);

    return res.status(200).json(orderIds);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error displaying order IDs",
      (error as CustomError).statusCode ?? 500
    );

    next(customError);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: orderId } = req.params;

    if (!orderId) {
      throw new CustomError("The provided ID is not valid", "The provided ID is not valid", 404);
    }

    const order = await OrderModel.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      throw new CustomError(`The provided ID (${orderId}) is not valid`, "The provided ID is not valid", 404);
    }

    const salesman = await SalesmanModel.findOne({
      where: {
        id: order.dataValues.salesman_id,
      },
    });
    const items = await OrderItemModel.findAll({
      where: {
        order_id: orderId,
      },
    });

    const orderDetails = [];
    for (const item of items) {
      const pizza = await PizzaModel.findOne({
        where: {
          id: item.dataValues.pizza_id,
        },
      });

      orderDetails.push({
        item_id: item.dataValues.id,
        pizza_name: pizza ? pizza.dataValues.name : "Unknown",
        quantity: item.dataValues.quantity,
      });
    }

    return res.status(200).json({
      order_id: order.dataValues.id,
      salesman_name: salesman ? salesman.dataValues.name : "Unknown",
      details: orderDetails,
    });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error displaying order",
      (error as CustomError).statusCode ?? 500
    );

    next(customError);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pizzas } = req.body as {
      pizzas: string[];
    };

    if (!pizzas || !Array.isArray(pizzas) || pizzas.length === 0) {
      throw new CustomError("Invalid pizzas provided", "Invalid pizzas provided", 400);
    }

    const selectedSalesman = mockSalesmen.find((salesman) => salesman.round_robin_index === 1);
    mockSalesmen.forEach((salesman) => {
      if (salesman.id === selectedSalesman.id) {
        salesman.round_robin_index++;
      } else {
        salesman.round_robin_index = (salesman.round_robin_index % mockSalesmen.length) + 1;
      }
    });

    const orderId = generateId();
    const order: Order = {
      id: orderId,
      salesman_id: selectedSalesman.id,
    };

    const orderItems = pizzas.map((pizzaId: string) => {
      const pizza = mockPizzas.find((pizza) => pizza.id === pizzaId);
      if (!pizza) {
        throw new CustomError(`Pizza with ID ${pizzaId} not found`, "Pizza not found", 404);
      }

      return {
        id: generateId(),
        pizza_id: pizza.id,
        order_id: orderId,
        quantity: 1,
      };
    });

    mockOrders.push(order);
    mockOrderItems.push(...orderItems);

    return res.status(201).json({
      message: "Order created successfully",
      order_id: order.id,
    });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error creating order",
      (error as CustomError).statusCode ?? 500
    );

    next(customError);
  }
};
