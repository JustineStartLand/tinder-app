import { NextFunction, Request, Response } from "express";

import { ErrorResponse } from "../lib/classes/error-response.class";
import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} from "../lib/constants/statusCodes";

// Main App Error handler
export const appErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Initially, err is set to unknown and we need to validate it first
  console.error(err);
  if (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    err.name === "CastError"
  ) {
    // If it's CastError from Mongo DB, most likely the client provided the wrong ID Format
    const castErr = err as Record<string, any>;
    // Return Resource not found to be more broad
    res.status(NOT_FOUND_ERROR_CODE).json({
      success: false,
      message: `Resource not found with id ${castErr.value}`,
    });
  }

  // Server Error Response

  if (err instanceof ErrorResponse) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message || "Internal server error occurred",
    });
  }
};
