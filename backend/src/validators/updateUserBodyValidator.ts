import { body } from 'express-validator'

const validateUpdateUserBody = [
  body('image').optional(),
  body('name').optional(),
  body('email').optional(),
  body('age')
    .optional()
    .isFloat({ min: 18 })
    .withMessage('You must be at least 18 years old to update your profile'),
  body('gender').optional(),
  body('bio').optional(),
]

export default validateUpdateUserBody
