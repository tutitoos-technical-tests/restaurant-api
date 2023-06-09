import CustomError from "./CustomError";

describe("Given a CustomError instance", () => {
  describe("When accessing its properties", () => {
    test("Then it should have the correct properties and message", () => {
      const errorMessage = "Error message";
      const publicErrorMessage = "Public error message";
      const statusCode = 400;

      const customError = new CustomError(errorMessage, publicErrorMessage, statusCode);

      expect(customError.message).toBe(errorMessage);
      expect(customError.publicMessage).toBe(publicErrorMessage);
      expect(customError.statusCode).toBe(statusCode);
    });
  });
});
