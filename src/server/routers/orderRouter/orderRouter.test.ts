import request from "supertest";
import app from "../../app.js";
import routes from "../routes.js";
import { mockOrder, mockOrderItems, mockOrders, mockPizzas, mockSalesmen } from "../../../mocks/mockOrder.js";
import { OrderItemModel, OrderModel, PizzaModel, SalesmanModel } from "../../../database/models/index.js";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("mocked-uuid"),
}));

const { list, item, newItem } = routes.order;

describe("Given a GET request to /orders endpoint", () => {
  describe("When retrieving the list of orders", () => {
    test("Then it should respond with a status code 200 and the list of orders", async () => {
      const orderIds = mockOrders.map((order) => order.id);
      const expectedStatus = 200;

      OrderModel.findAll = jest.fn().mockReturnValue(
        mockOrders.map((order) => ({
          dataValues: order,
        }))
      );

      const response = await request(app).get(list);

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(orderIds);
    });
  });
});

describe("Given a GET request to /orders/:id endpoint", () => {
  describe("When retrieving an order by ID", () => {
    test("Then it should respond with a status code 200 and the order details", async () => {
      const order = mockOrders[0];
      const orderId = order.id;
      const expectedStatus = 200;

      OrderModel.findOne = jest.fn().mockReturnValue({ dataValues: order });
      SalesmanModel.findOne = jest.fn().mockReturnValue({ dataValues: mockSalesmen[0] });
      OrderItemModel.findAll = jest.fn().mockReturnValue(
        mockOrderItems.map((item) => ({
          dataValues: item,
        }))
      );
      PizzaModel.findOne = jest.fn().mockReturnValue({ dataValues: mockPizzas[0] });

      const response = await request(app).get(item.replace(":id", orderId));

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(mockOrder);
    });
  });
});

describe("Given a PUT request to /orders/new endpoint", () => {
  describe("When creating a new order", () => {
    test("Then it should respond with a status code 201 and the newly created order ID", async () => {
      const orderId = uuidv4();
      const expectedStatus = 201;
      const requestBody = {
        pizzas: mockPizzas.map((pizza) => pizza.id),
      };
      const expectedBody = {
        message: "Order created successfully",
        order_id: orderId,
      };

      const response = await request(app).put(newItem).send(requestBody);

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(expectedBody);
    });
  });
});
