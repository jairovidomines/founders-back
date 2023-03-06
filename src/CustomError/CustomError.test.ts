import CustomError from "./CustomError";

describe("Given a CustomError class", () => {
  describe("When is instanced with the message: 'Endpoint not found', the status code: 404, and the public message: 'Endpoint not found'", () => {
    test("Then it should have the properties with the message, statusCode and publicMessage", () => {
      const expectedError = {
        message: "Endpoint not found",
        statusCode: 404,
        publicMessage: "Endpoint not found",
      };

      const customError = new CustomError(
        expectedError.message,
        expectedError.statusCode,
        expectedError.publicMessage
      );

      expect(customError).toHaveProperty("message", expectedError.message);
      expect(customError).toHaveProperty(
        "statusCode",
        expectedError.statusCode
      );
      expect(customError).toHaveProperty(
        "publicMessage",
        expectedError.publicMessage
      );
    });
  });
});
