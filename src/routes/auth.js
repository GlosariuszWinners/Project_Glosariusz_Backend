import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController';
import { catchAsync } from '../middlewares/errors';

export default () => {
    const api = Router();

    // POST /auth/register
    api.post('/register', catchAsync(AuthController.register));

    // POST /auth/login
    api.post(
        '/login',
        passport.authenticate('local', { session: false }),
        catchAsync(AuthController.login)
    );

    return api;
};
