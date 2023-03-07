import CustomError from "./CustomError.js";

describe("Given a CustomError class", () => {
  describe("When is instanced with the message: 'Endpoint not found', the status code: 404, and the public message: 'Endpoint not found'", () => {
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

    test("Then it should have the property 'message' with 'Endpoint not found' text", () => {
      expect(customError).toHaveProperty("message", expectedError.message);
    });

    test("Then it should have the property 'statusCode' with '404' status code", () => {
      expect(customError).toHaveProperty(
        "statusCode",
        expectedError.statusCode
      );
    });

    test("Then it should have the property 'publicMessage' with 'Endpoint not fount'text", () => {
      expect(customError).toHaveProperty(
        "publicMessage",
        expectedError.publicMessage
      );
    });
  });
});
