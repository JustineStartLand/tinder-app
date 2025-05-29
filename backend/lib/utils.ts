import { Result, ValidationError } from "express-validator";
import { ErrorResponse } from "./classes/error-response.class";

export const createErrorClass = (
  message: string,
  statusCode: number
): ErrorResponse => {
  return new ErrorResponse(message, statusCode);
};

export const createValidationErrorMessage = (
  errors: Result<ValidationError>
): string => {
  let errorMessage = "";
  const errorsArray = errors.array();
  errorsArray.forEach((error, index) => {
    if (error.type === "field") {
      errorMessage += `${error.msg}${
        index === errorsArray.length - 1 ? "." : " | "
      }`;
    }
  });
  return errorMessage;
};
