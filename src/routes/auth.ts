import express from 'express';
import { createUser, login, renew } from '../controllers/auth';
import { check } from 'express-validator';
import { fieldsValidator } from '../middlewares/fields-validator';
import { validateJWT } from '../middlewares/validate-jwt';

/**
 * Rutas que tienen que ver con la autenticacion de los usuarios
 */
const authRouter = express.Router();

authRouter.get('/', validateJWT, renew);

authRouter.post('/', [
    check('email', 'Email is required').notEmpty(),
    check('password', 'Password is required ').notEmpty(),
    fieldsValidator
], login);

authRouter.post('/create', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required and it must be valid').notEmpty().isEmail(),
    check('password', 'Password is required and must have 6 or more characters').notEmpty().isLength({min: 6}),
    fieldsValidator
] , createUser);

export default authRouter;