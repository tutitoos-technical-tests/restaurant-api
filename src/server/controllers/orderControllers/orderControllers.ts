import type { NextFunction, Request, Response } from "express";
import { mockOrderItems, mockOrders, mockPizzas, mockSalesmen } from "../../../mocks/mockOrder.js";
import CustomError from "../../../CustomError/CustomError.js";
import Logger from "../../../utils/Logger.js";
import { Order } from "../../../types/types.js";
import generateId from "../../../utils/generateId.js";

const logger = new Logger();

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderIds = mockOrders.map((order) => order.id);

    return res.status(200).json(orderIds);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error al mostrar las ids de los pedidos",
      (error as CustomError).statusCode ?? 500
    );

    next(customError);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: orderId } = req.params;

    if (!orderId) {
      throw new CustomError("The id provided is not valid", "The id provided is not valid", 404);
    }

    const order = mockOrders.find((orderData) => orderData.id === orderId);
    if (!order) {
      throw new CustomError(`The id (${orderId}) provided is not valid`, "The id provided is not valid", 404);
    }

    const salesman = mockSalesmen.find((salesmanData) => salesmanData.id === order.salesman_id);
    const items = mockOrderItems.filter((orderItemData) => orderItemData.order_id === orderId);
    const orderDetails = items.map((item) => {
      const pizza = mockPizzas.find((pizzaData) => pizzaData.id === item.pizza_id);

      return {
        item_id: item.id,
        pizza_name: pizza ? pizza.name : "Desconocida",
        quantity: item.quantity,
      };
    });

    return res.status(200).json({
      order_id: order.id,
      salesman_name: salesman ? salesman.name : "Desconocido",
      details: orderDetails,
    });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error al mostrar el pedido",
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

    logger.info(`New order created with ID: ${orderId}`);

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
