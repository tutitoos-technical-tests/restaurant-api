import request from "supertest";
import app from "../../app";
import routes from "../routes";
import loadEnvironments from "../../../loadEnvironments";

const {
  nodemailer: { emailToTest },
} = loadEnvironments;
const { thanks } = routes.email;

describe("Given a POST request to /thank-you endpoint", () => {
  describe("When sending a thank you email", () => {
    test("Then it should respond with a status code 200 and a success message when all data is provided", async () => {
      const expectedStatus = 200;
      const expectedBody = {
        message: "Thank you email sent",
      };
      const emailData = {
        to: emailToTest,
        subject: "Custom Subject",
        text: "Custom Text",
      };

      const response = await request(app).post(thanks).send(emailData);

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(expectedBody);
    });

    test("Then it should respond with a status code 200 and a success message when 'to' field is provided but 'subject' and 'text' fields are missing", async () => {
      const expectedStatus = 200;
      const expectedBody = {
        message: "Thank you email sent",
      };
      const emailData = {
        to: emailToTest,
      };

      const response = await request(app).post(thanks).send(emailData);

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(expectedBody);
    });

    test("Then it should respond with a status code 400 and an error message when no data is provided", async () => {
      const expectedStatus = 400;
      const expectedBody = {
        message: "Recipient email is required",
      };

      const response = await request(app).post(thanks).send();

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(expectedBody);
    });
  });
});
