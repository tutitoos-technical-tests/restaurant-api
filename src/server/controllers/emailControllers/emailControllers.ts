import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import nodemailer from "../../../nodemailer/connect.js";
import loadEnvironments from "../../../loadEnvironments.js";

const {
  nodemailer: { username },
} = loadEnvironments;

export const postThankYou = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { to, subject, text } = req.body as {
      to: string;
      subject: string;
      text: string;
    };

    if (!to) {
      throw new CustomError("Recipient email not provided", "Recipient email is required", 400);
    }

    await nodemailer.sendMail({
      from: username,
      to,
      subject: subject ?? "Thank You for Your Order",
      text: text ?? "Thank you for your order! We appreciate your preference.",
    });

    return res.status(200).json({ message: "Thank you email sent" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error sending the thank you email",
      (error as CustomError).statusCode ?? 500
    );

    next(customError);
  }
};
