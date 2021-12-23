import { Router } from 'express';
import wordsController from '../controllers/wordsController';
import jwtAuth from '../middlewares/auth';
import { catchAsync } from '../middlewares/errors';
import getFilters from '../middlewares/filters/words';

export default () => {
    const api = Router();

    // GET /words/:slug
    api.get('/:slug', catchAsync(wordsController.findOne));

    // GET /words
    api.get('/', getFilters, catchAsync(wordsController.findAll));

    // POST /words
    api.post('/', jwtAuth, catchAsync(wordsController.create));

    // PUT /words/:slug
    api.put('/:slug', jwtAuth, catchAsync(wordsController.update));

    // DELETE /words/:slug
    api.delete('/:slug', jwtAuth, catchAsync(wordsController.remove));

    return api;
};
