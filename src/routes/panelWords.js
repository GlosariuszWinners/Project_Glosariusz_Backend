import { Router } from 'express';
import panelWordsController from '../controllers/panelWordsController';
import jwtAuth from '../middlewares/auth';
import { catchAsync } from '../middlewares/errors';
import getFilters from '../middlewares/filters/words';

export default () => {
    const api = Router();

    // GET /panel/words/:slug
    api.get('/:slug', catchAsync(panelWordsController.findOne));

    // GET /panel/words
    api.get('/', jwtAuth, getFilters, catchAsync(panelWordsController.findAll));

    // POST /panel/words
    api.post('/', jwtAuth, catchAsync(panelWordsController.create));

    // PUT /panel/words/:slug
    api.put('/:slug', jwtAuth, catchAsync(panelWordsController.update));

    // DELETE /panel/words/:slug
    api.delete('/:slug', jwtAuth, catchAsync(panelWordsController.remove));

    return api;
};
