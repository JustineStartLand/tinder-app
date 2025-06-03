import { body } from 'express-validator'

const validateUpdateUserBody = [
  body('image').optional(),

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Updated name cannot be empty')
    .bail(),

  body('age')
    .optional()
    .isFloat({ min: 18 })
    .withMessage('You must be at least 18 years old to update your profile'),

  body('gender')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Updated gender cannot be empty')
    .bail(),

  body('genderPreference')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Updated gender preference cannot be empty')
    .bail(),

  body('bio').optional(),
]

export default validateUpdateUserBody
