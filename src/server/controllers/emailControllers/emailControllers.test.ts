import CustomError from "../../../CustomError/CustomError";
import nodemailer from "../../../nodemailer/connect";
import loadEnvironments from "../../../loadEnvironments";
import { postThankYou } from "./emailControllers";
import { type Request, type Response, type NextFunction } from "express";

jest.mock("../../../nodemailer/connect");

const {
  nodemailer: { username },
} = loadEnvironments;

describe("Given the postThankYou function", () => {
  describe("When it receives a request with valid data", () => {
    test("Then it should send a thank you email and respond with a status code 200 and a success message", async () => {
      const expectedStatus = 200;
      const expectedBody = { message: "Thank you email sent" };
      const expectedEmail = {
        to: "recipient@example.com",
        subject: "Thank You for Your Order",
        text: "Thank you for your order! We appreciate your preference.",
      };
      const expectedMailerOptions = {
        ...expectedEmail,
        from: username,
      };

      const req: Partial<Request> = {
        body: expectedEmail,
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: Partial<NextFunction> = jest.fn();

      await postThankYou(req as Request, res as Response, next as NextFunction);

      expect(nodemailer.sendMail).toHaveBeenCalledWith(expectedMailerOptions);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it receives a request with missing recipient email", () => {
    test("Then it should throw a CustomError with status code 400 and an error message", async () => {
      const expectedError = new CustomError("Recipient email not provided", "Recipient email is required", 400);

      const req: Partial<Request> = {
        body: {},
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: Partial<NextFunction> = jest.fn();

      await postThankYou(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it encounters an unknown error", () => {
    test("Then it should throw a CustomError with status code 500 and a default error message", async () => {
      const expectedEmail = {
        to: "recipient@example.com",
        subject: "Thank You for Your Order",
        text: "Thank you for your order! We appreciate your preference.",
      };
      const expectedError = new CustomError("Error sending the thank you email", "Error sending the thank you email", 500);

      const req: Partial<Request> = {
        body: expectedEmail,
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: Partial<NextFunction> = jest.fn();

      nodemailer.sendMail = jest.fn().mockRejectedValue(new Error(expectedError.message));

      await postThankYou(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
