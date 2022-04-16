import { Router } from 'express';
import config from '../config/config';
import wordsController from '../controllers/wordsController';
import jwtAuth, { noAuth } from '../middlewares/auth';
import { catchAsync } from '../middlewares/errors';
import getFilters from '../middlewares/filters/words';

export default () => {
    const api = Router();

    // GET /words/:slug
    api.get('/:slug', catchAsync(wordsController.findOne));

    // GET /words
    api.get('/', getFilters, catchAsync(wordsController.findAll));

    // POST /words
    api.post(
        '/',
        config.env === 'production' ? jwtAuth : noAuth,
        catchAsync(wordsController.create)
    );

    // GET /alphabet
    api.get('/alphabet', catchAsync(wordsController.alphabet));

    // PUT /words/:slug
    api.put(
        '/:slug',
        config.env === 'production' ? jwtAuth : noAuth,
        catchAsync(wordsController.update)
    );

    // DELETE /words/:slug
    api.delete(
        '/:slug',
        config.env === 'production' ? jwtAuth : noAuth,
        catchAsync(wordsController.remove)
    );

    return api;
};
