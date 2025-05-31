import { body } from "express-validator";

const validateSignupBody = [
  body("name").trim().notEmpty().withMessage("Name is required").bail(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail(),

  body("password").trim().notEmpty().withMessage("Password is required").bail(),

  body("age")
    .trim()
    .notEmpty()
    .withMessage("Age is required")
    .bail()
    .isFloat({
      min: 18,
    })
    .withMessage("You must be at least 18 years old to sign up"),

  body("gender").trim().notEmpty().withMessage("Gender is required").bail(),

  body("genderPreference")
    .trim()
    .notEmpty()
    .withMessage("Gender preferenceis required")
    .bail(),
];

export default validateSignupBody;
