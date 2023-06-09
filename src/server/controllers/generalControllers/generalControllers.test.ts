import { getPing } from "./generalControllers";
import { Request, Response } from "express";

describe("Given the getPing function", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200 and the message 'Pong 🏓'", async () => {
      const expectedBody = {
        message: "Pong 🏓",
      };
      const expectedStatus = 200;

      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getPing(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
    });
  });
});
