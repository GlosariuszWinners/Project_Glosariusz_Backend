import { Router } from 'express';
import AuthController from '../controllers/authController';
import { catchAsync } from '../middlewares/errors';

export default () => {
    const api = Router();

    // POST /auth/register
    api.post('/register', catchAsync(AuthController.register));

    // POST /auth/login
    api.post('/login', catchAsync(AuthController.login));

    // GET /auth/logout
    api.get('/logout', catchAsync(AuthController.logout));

    return api;
};
