import { body } from 'express-validator';

export const validatorEORegister = [
  body(['name', 'email', 'password'])
    .notEmpty()
    .withMessage('Data Must Completed!'),
  body('email').isString().isEmail().withMessage('Email Must Valid!'),
  body('password')
    .isString()
    .isLength({ min: 5, max: 15 })
    .withMessage(
      'Password Have Minimum Lengh 5 Characters and Maximum Length 15 Characters',
    ),
];
