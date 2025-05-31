import { body } from "express-validator";

const validateLoginBody = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail(),

  body("password").trim().notEmpty().withMessage("Password is required").bail(),
];

export default validateLoginBody;
