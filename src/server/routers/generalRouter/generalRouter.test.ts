import request from "supertest";
import app from "../../app.js";
import routes from "../routes.js";

const { ping } = routes.general;

describe("Given a GET request to '/' endpoint", () => {
  describe("When it receives the message 'Pong 🏓'", () => {
    test("Then it should respond with a status code 200 and the message 'Pong 🏓'", async () => {
      const expectedBody = {
        message: "Pong 🏓",
      };
      const expectedStatus = 200;

      const response = await request(app).get(ping).expect(expectedStatus);

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(expectedBody);
    });
  });
});
