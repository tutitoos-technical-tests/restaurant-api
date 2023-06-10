import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import nodemailer from "../../../nodemailer/connect.js";

export const postThankYou = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body as {
      email: string;
    };

    if (!email) {
      throw new CustomError("Correo electrónico no proporcionado", "Correo electrónico no proporcionado", 400);
    }

    await nodemailer.sendMail({
      from: "¡tutitoosdev@gmail.com",
      to: email,
      subject: "Gracias por tu pedido",
      text: "¡Gracias por tu pedido! Apreciamos tu preferencia.",
    });

    return res.status(200).json({ message: "Correo electrónico de agradecimiento enviado" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error al enviar el correo electrónico de agradecimiento",
      (error as CustomError).statusCode ?? 500
    );

    next(customError);
  }
};
