import CustomError from "../../CustomError/CustomError";
import { generalError, notFoundEndpoint } from "./errors";
import type { NextFunction, Request, Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

const next = jest.fn().mockReturnThis();

describe("Given the generalError middleware", () => {
  describe("When it receives a request and a customError with a status code 500 and message 'General error'", () => {
    test("Then it should set the response status to 500 and send the error message in the response body", () => {
      const errorMessage = "General error";
      const expectedStatus = 500;
      const expectedResponseBody = {
        message: errorMessage,
      };

      const error = new Error("This is a test error");

      generalError(error as CustomError, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });
});

describe("Given the notFoundEndpoint middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the received next function with a CustomError representing a 404 'Endpoint not found' error", () => {
      const endpoint = "/";
      const errorMessage = `Endpoint not found (${endpoint})`;
      const expectedStatus = 404;

      const req: Partial<Request> = {
        url: endpoint,
      };

      const expectedCustomError = new CustomError(errorMessage, errorMessage, expectedStatus);

      notFoundEndpoint(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
