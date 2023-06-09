import { OrderItemModel, OrderModel, PizzaModel, SalesmanModel } from "../../../database/models";
import { NextFunction, Request, Response } from "express";
import { createOrder, getOrderById, getOrders } from "./orderControllers";
import CustomError from "../../../CustomError/CustomError";
import { mockOrder, mockOrderItems, mockOrders, mockPizzas, mockSalesmen } from "../../../mocks/mockOrder";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("mocked-uuid"),
}));

describe("Given the getOrders function", () => {
  describe("When it successfully retrieves the orders", () => {
    test("Then it should respond with a status code 200 and an array of order IDs", async () => {
      const expectedBody = mockOrders.map((order) => order.id);
      const expectedStatus = 200;

      OrderModel.findAll = jest.fn().mockResolvedValue(mockOrders.map((order) => ({ dataValues: order })));

      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await getOrders(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("When it encounters an error while retrieving the orders", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const errorMessage = "Database connection error";
      const expectedStatus = 500;
      const expectedError = new CustomError(errorMessage, "Error displaying order IDs", expectedStatus);

      OrderModel.findAll = jest.fn().mockRejectedValue(new Error(errorMessage));

      const req: Partial<Request> = {};
      const res: Partial<Response> = {};
      const next = jest.fn();

      await getOrders(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the getOrderById function", () => {
  describe("When it receives a request with a valid order ID", () => {
    test("Then it should respond with a status code 200 and the order details", async () => {
      const orderId = mockOrder.order_id;
      const expectedBody = {
        order_id: mockOrder.order_id,
        salesman_name: mockOrder.salesman_name,
        details: mockOrder.details,
      };
      const expectedStatus = 200;

      const req: Partial<Request> = {
        params: {
          id: orderId,
        },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      OrderModel.findOne = jest.fn().mockResolvedValue({
        dataValues: mockOrders[0],
      });

      SalesmanModel.findOne = jest.fn().mockResolvedValue({
        dataValues: mockSalesmen[0],
      });

      OrderItemModel.findAll = jest.fn().mockResolvedValue(
        mockOrderItems
          .filter((orderItem) => orderItem.order_id === orderId)
          .map((orderItem) => ({
            dataValues: orderItem,
          }))
      );

      PizzaModel.findOne = jest.fn().mockResolvedValue({
        dataValues: mockPizzas[0],
      });

      await getOrderById(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
      expect(next).not.toHaveBeenCalled();
    });

    test("Then it should throw an error if the order is not found", async () => {
      const orderId = "nonexistent_order_id";
      const expectedStatus = 404;
      const expectedError = new CustomError(
        `The provided ID (${orderId}) is not valid`,
        "The provided ID is not valid",
        expectedStatus
      );

      const req: Partial<Request> = {
        params: {
          id: orderId,
        },
      };
      const res: Partial<Response> = {};
      const next = jest.fn();

      OrderModel.findOne = jest.fn().mockResolvedValue(null);

      await getOrderById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an invalid order ID", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const orderId = "";
      const expectedStatus = 404;
      const expectedError = new CustomError("The provided ID is not valid", "The provided ID is not valid", expectedStatus);

      const req: Partial<Request> = {
        params: {
          id: orderId,
        },
      };
      const res: Partial<Response> = {};
      const next = jest.fn();

      await getOrderById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it encounters an error while retrieving the order details", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const orderId = 1;
      const errorMessage = "Database connection error";
      const expectedStatus = 500;
      const expectedError = new CustomError(errorMessage, "Error displaying order", expectedStatus);

      const req: Partial<Request> = {
        params: {
          id: orderId.toString(),
        },
      };
      const res: Partial<Response> = {};
      const next = jest.fn();

      OrderModel.findOne = jest.fn().mockRejectedValue(new Error(errorMessage));

      await getOrderById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it encounters an unknown salesman or pizza", () => {
    test("Then it should assign 'Unknown' as the name for salesman and pizza", async () => {
      const orderId = mockOrder.order_id;
      const expectedBody = {
        ...mockOrder,
        details: mockOrder.details.map((detail) => ({
          ...detail,
          pizza_name: "Unknown",
        })),
        salesman_name: "Unknown",
      };
      const expectedStatus = 200;

      const req: Partial<Request> = {
        params: {
          id: orderId,
        },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      OrderModel.findOne = jest.fn().mockResolvedValue({
        dataValues: mockOrders[0],
      });

      SalesmanModel.findOne = jest.fn().mockResolvedValue(null);

      OrderItemModel.findAll = jest.fn().mockResolvedValue(
        mockOrderItems
          .filter((orderItem) => orderItem.order_id === orderId)
          .map((orderItem) => ({
            dataValues: orderItem,
          }))
      );

      PizzaModel.findOne = jest.fn().mockResolvedValue(null);

      await getOrderById(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
      expect(next).not.toHaveBeenCalled();
    });
  });
});

describe("Given the createOrder function", () => {
  describe("When it receives a request with valid pizzas", () => {
    test("Then it should respond with a status code 201 and the order ID", async () => {
      const pizzas = mockPizzas.map((pizza) => pizza.id);
      const expectedStatus = 201;
      const expectedBody = {
        message: "Order created successfully",
        order_id: expect.any(String),
      };

      const req: Partial<Request> = {
        body: { pizzas },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const selectedSalesman = mockSalesmen.find((salesman) => salesman.round_robin_index === 1);
      const orderId = uuidv4();
      const orderItems = [
        { id: "item1", pizza_id: "pizza1", order_id: orderId, quantity: 1 },
        { id: "item2", pizza_id: "pizza2", order_id: orderId, quantity: 1 },
        { id: "item3", pizza_id: "pizza3", order_id: orderId, quantity: 1 },
      ];

      mockSalesmen.forEach((salesman) => {
        if (salesman.id === selectedSalesman.id) {
          salesman.round_robin_index++;
        } else {
          salesman.round_robin_index = (salesman.round_robin_index % mockSalesmen.length) + 1;
        }
      });

      mockOrders.push({ id: orderId, salesman_id: selectedSalesman.id });
      mockOrderItems.push(...orderItems);

      await createOrder(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("When it receives a request without pizzas", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const expectedStatus = 400;
      const expectedError = new CustomError("Invalid pizzas provided", "Invalid pizzas provided", expectedStatus);

      const req: Partial<Request> = {
        body: {},
      };
      const res: Partial<Response> = {};
      const next = jest.fn();

      await createOrder(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an empty pizzas array", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const expectedStatus = 400;
      const expectedError = new CustomError("Invalid pizzas provided", "Invalid pizzas provided", expectedStatus);

      const req: Partial<Request> = {
        body: { pizzas: [] },
      };
      const res: Partial<Response> = {};
      const next = jest.fn();

      await createOrder(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an invalid pizza ID", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const pizzaId = "invalidPizzaId";
      const expectedStatus = 404;
      const expectedError = new CustomError(`Pizza with ID ${pizzaId} not found`, "Pizza not found", expectedStatus);

      mockPizzas.find = jest.fn().mockReturnValue(undefined);

      const req: Partial<Request> = {
        body: { pizzas: [pizzaId] },
      };
      const res: Partial<Response> = {};
      const next = jest.fn();

      await createOrder(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When an error occurs during order creation", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const expectedStatus = 500;
      const expectedError = new CustomError("Error creating order", "Error creating order", expectedStatus);

      const req: Partial<Request> = {
        body: { pizzas: ["pizza1", "pizza2"] },
      };
      const res: Partial<Response> = {};
      const next = jest.fn();

      jest.spyOn(mockPizzas, "find").mockImplementation(() => {
        throw new Error("Error creating order");
      });

      await createOrder(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);

      jest.spyOn(mockPizzas, "find").mockRestore();
    });
  });
});
